/**
*  Services
*
* Queries the Github API
*/
(function(){
    var services = angular.module('forksServices', ['ngResource'])

    // Add factory Forks
    services.factory('Forks', ['$resource', function($resource){
        return $resource('https://api.github.com/repos/:user/:repo/forks?page=:page&per_page=:perPage');
    }]);

    // Add factory Repository
    services.factory('Repository', ['$resource', function($resource){
        return $resource('https://api.github.com/repos/:user/:repo');
    }]);    
})();
