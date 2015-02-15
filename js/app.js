/**
* forks Module
*
* Get forks data for a Github repository
*/
(function() {
// Self executing function to ensure that code is not declared
// in the global scope
    var app = angular.module('forks', ['ngResource']);

    // Add factory Forks
    // http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
    app.factory('Forks', ['$resource', function($resource){
        return $resource('https://api.github.com/repos/:user/:repo/forks');
    }]);

    // Implement Fork controller
    app.controller('ForksController', ['$scope', 'Forks', function($scope, Forks){
        $scope.forks = {};  // initialize forks because page will render before
        $scope.error = false;
        $scope.user = "angular";
        $scope.repo = "angular";

        $scope.getForks = function() {
            Forks.query({user: $scope.user, repo: $scope.repo},
                function(data) {  // query expects array data
                    $scope.forks = data;
                    $scope.error = false;
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