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
        return $resource('https://api.github.com/repos/:user/:repo/forks?per_page=:perPage');
    }]);

    // Implement Fork controller
    app.controller('ForksController', ['$scope', 'Forks', function($scope, Forks){
        $scope.forks = {};  // initialize forks because page will render before
        $scope.error = false;
        $scope.noFork = false; // check if repo has no forks
        $scope.user = "angular";
        $scope.repo = "angular";
        $scope.perPage = '30'; // Set default choice to 30 (options: 30, 50, 100)

        $scope.getForks = function() {

            // DONE: Show a chosen number of forks on a repo
            // TODO: Pagination
            Forks.query({user: $scope.user, repo: $scope.repo, perPage : $scope.perPage},
                function(data) {  // query expects array data
                    $scope.forks = data;
                    $scope.error = false;
                    $scope.noFork = false;
                    if (data.length==0) {
                        $scope.noFork = true;
                        console.log($scope.noFork);
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

        $scope.getForks();  // Get forks for Angular
    }]);
})();