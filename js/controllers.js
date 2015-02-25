/**
*  Controllers
*
* Implement the logic
*/
(function(){
    var controllers = angular.module('forksControllers', ['forksServices'])

    // Implement Fork controller
    controllers.controller('ForksController', ['$scope', 'Repository', 'Forks', function($scope, Repository, Forks){
        // Local variables
        var messages = {"noRepo": "Sorry, repository not found.",
                        "noFork": "Sorry, nobody gave a fork!",
                        "noPermission": "Sorry, you do not have permission. You might have ran out of limit requests."
                    } // To avoid hard code and repetiton

        // Global variables
        $scope.forks = [];  // initialize forks because page will render before
        $scope.noPermission = false;
        $scope.showMessage = false;
        $scope.user = 'angular';
        $scope.repo = 'angular';
        $scope.message = '';

        // Pagination
        $scope.perPage = '30';  // Set default choice to 30 (options: 30, 50, 100)
        $scope.currentPage = 1;
        $scope.maxSize = 5;

        var getForksCount = function() {
            Repository.get({user: $scope.user, repo: $scope.repo},
                function(data){  // get method expects an object data
                    $scope.forksCount = data.forks_count;
                }
            );
        };

        // Resolve the issue of sending 2 requests when changing 'display per page' parameter
        var checkCurrentPage = function() {
            // Math.ceil() returns the smallest integer greater than or equal to a given number
            var numberOfPages = Math.ceil($scope.forksCount / $scope.perPage); 
            if (numberOfPages != 0) {
                if ($scope.currentPage > numberOfPages) {
                    $scope.currentPage = 1; 
                }
            }
        };

        $scope.getForks = function() {
            checkCurrentPage();
            Forks.query({user: $scope.user, repo: $scope.repo, page: $scope.currentPage, perPage: $scope.perPage},
                    function(data) {  // query method expects array data
                        $scope.forks = data;
                        $scope.showMessage = false;
                        if (data.length == 0) {
                            $scope.showMessage = true;
                            $scope.message = messages["noFork"];
                        };
                    },
                    function(response) {
                        if(response.status === 404) {
                            $scope.forks = [];
                            $scope.showMessage = true;
                            $scope.message = messages["noRepo"];
                        }
                        else if (response.status === 403) {
                            $scope.showMessage = true;
                            $scope.message = messages["noPermission"];
                        }
                    }
            );
        };

        $scope.submit = function() {
            $scope.currentPage = 1;  // Set current page to 1 after we search for a new repository
            getForksCount();
            $scope.getForks();
        }

        $scope.submit();  // Get forks for Angular
    }]);
})();