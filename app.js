/**
* forks Module
*
* Get forks data for a Github repository
*/
(function() {
// Self executing function to ensure that code is not declared
// in the global scope
    var app = angular.module('forks', []);

    // Implement Fork controller
    app.controller('ForkController', function($http){
        var fork = this;  // Store this to be accesible in getForks
        fork.search = {};  // initialize search data
        fork.forks = [];  // initialize forks because page will render before

        this.getForks = function() {
            var forksURL = 'https://api.github.com/repos/' + fork.search.user + '/' + fork.search.repo + '/forks';
            $http.get(forksURL).success(function(data) {  // data is automatically parsed from JSON to JS object
                console.log(data);
                fork.forks = data;
            });
            fork.search = {};  // clear form data after submit
        };
    });
})();