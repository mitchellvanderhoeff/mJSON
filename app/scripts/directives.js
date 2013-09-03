/**
 * User: mitch
 * Date: 2013-08-30
 */

var app = angular.module('mJSONApp');

app
    .directive('ngOnEnter', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                element.bind('keypress', function (event) {
                    if (event.which == 13) {
                        $scope.$apply(attrs.ngOnEnter);
                        event.preventDefault();
                        element.blur();
                    }
                });
            }
        }
    });