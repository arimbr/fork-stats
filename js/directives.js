/**
*  Directives
*
* Extend HTML code
*/
(function(){
    angular.module('forksDirectives', [])

        .directive('lineGraph', [function(){
            // Runs during compile
            return {
                restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
                templateUrl: '../partials/linegraph.html',
                link: function(scope, elem, attrs, controller) {
                    
                }
            };
        }]);
})();