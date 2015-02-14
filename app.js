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
    app.controller('ForkController', function(){
        this.search = {};  // initialize search data

        this.getForks = function() {
            console.log("User: " + this.search.user);  // log input search data
            console.log("Repository: " + this.search.repo);
            this.search = {};  // clear form data after submit
        };
    });
})();