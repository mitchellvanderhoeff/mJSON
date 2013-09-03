'use strict';

function EditorCtrl($scope) {
    $scope.model = {};
    $scope.modelString = function () {
        return JSON.stringify($scope.model);
    };

    $scope.augmentedModel = augmentModel({});
    $scope.$watch('augmentedModel', function (newAugmentedModel) {
        $scope.model = strip(newAugmentedModel);
    }, true);
}