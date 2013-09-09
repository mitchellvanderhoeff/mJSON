/**
 * User: mitch
 * Date: 2013-09-05
 */

function AugmentedArray(data) {
    this.type = "array";
    this.children = [];

    data.each(function (value, index) {
        this.addChild(value, index);
    }.bind(this)); // populate array
}

function augmentArrayChild(item, index, parent) {
    var child = augment(item);
    child.index = index;
    child.remove = function () {
        parent.children.splice(this.index, 1);
    };
    child.addPrimitiveSibling = function () {
        return parent.addChild("", this.index + 1);
    };
    return child;
}

AugmentedArray.prototype.addChild = function (item, index) {
    if (index === undefined) index = this.children.length;
    var newChild = augmentArrayChild(item, index, this);
    this.children.each(function (child) {
        delete child.isLastAdded;
    });
    newChild.isLastAdded = true;
    this.children.insert(newChild, newChild.index);
    return newChild;
};

AugmentedArray.prototype.size = function () {
    return this.children.length;
};

AugmentedArray.prototype.addArray = function () {
    return this.addChild([]);
};

AugmentedArray.prototype.addObject = function () {
    return this.addChild({});
};

AugmentedArray.prototype.addPrimitive = function () {
    return this.addChild("");
};