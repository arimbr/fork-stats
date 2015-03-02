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
                    // scope has access to the ForkController scope
                    // console.log(scope.forks);

                    // Watch for changes in forks in the ForksController
                    scope.$watch('forks', function(newVal, oldVal) {
                        console.log("Forks have been updated");
                        console.log(newVal);
                        // From here we will render the graph
                    });
                }
            };
        }]);
})();