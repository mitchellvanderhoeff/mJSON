'use strict';

function EditorCtrl($scope) {
    $scope.model = null;
    $scope.augmentedModel = augment({"kek": true});

    $scope.idForEditable = function (node) {
        return "editable-" + node.$$hashKey;
    };

    $scope.addSibling = function (node) {
        var newSibling = node.addPrimitiveSibling();
        angular.element("#" + $scope.idForEditable(newSibling)).focus();
    };

    $scope.$watch('augmentedModel', function (newAugmentedModel) {
        $scope.model = strip(newAugmentedModel);
    }, true);
}