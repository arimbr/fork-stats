/**
* forks Module
*
* Get forks data for a Github repository
*/
(function() {
// Self executing function to ensure that code is not declared
// in the global scope
var app = angular.module('forks', ['ngResource','ui.bootstrap']);

    // Add factory Forks
    // http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
    app.factory('Forks', ['$resource', function($resource){
        return $resource('https://api.github.com/repos/:user/:repo/forks?page=:page&per_page=:perPage');
    }]);

    // Implement Fork controller
    app.controller('ForksController', ['$scope','$http' ,'Forks', function($scope,$http ,Forks){
        $scope.forks = {};  // initialize forks because page will render before
        $scope.error = false;
        $scope.noFork = false; // check if repo has no forks
        $scope.user = "angular";
        $scope.repo = "angular";

        // Pagination
        $scope.perPage = '30'; // Set default choice to 30 (options: 30, 50, 100)
        $scope.currentPage = 1;

        // How to use Factory to return different GETs ?
        $scope.getForksCount = function() {
            var url = "https://api.github.com/repos/" + $scope.user + "/" + $scope.repo;
            $http.get(url)
            .success(function(data){
                $scope.forksCount = data.forks_count;
            });
        };

        $scope.getForks = function() {
            Forks.query({user: $scope.user, repo: $scope.repo, page: $scope.currentPage, perPage: $scope.perPage},
                    function(data) {  // query expects array data
                        $scope.forks = data;
                        $scope.error = false;
                        $scope.noFork = false;
                        if (data.length==0) {
                            $scope.noFork = true;
                        };
                    },
                    function(response) {
                        if(response.status === 404) {
                            $scope.forks = {};
                            $scope.error = true;
                        }
                    }
            );
        };

        $scope.submit = function() {
            $scope.getForksCount();
            $scope.getForks();
        }

        $scope.submit();  // Get forks for Angular
    }]);
})();