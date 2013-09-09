/**
 * User: mitch
 * Date: 2013-08-30
 */

var app = angular.module('mJSONApp');

app
    .directive('ngcOnEnter', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                element.bind('keypress', function (event) {
                    if (event.which == 13) {
                        $scope.$apply(function () {
                            $scope.$eval(attrs.ngOnEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        }
    })
    .directive('ngcFocusOn', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.$watch(attrs['ngcFocusOn'], function (shouldFocus) {
                    if (shouldFocus === true) {
                        element.focus();
                    }
                });
            }
        }
    });