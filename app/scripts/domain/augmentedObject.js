
/**
 * User: mitch
 * Date: 2013-09-05
 */

function AugmentedObject(data) {
    this.type = "object";
    this.children = {};

    Object.each(data, function (key, value) {
        this.addChild(value, key);
    }.bind(this));
}

function augmentObjectChild(key, value, parent) {
    var child = augment(value);
    child.key = key;
    child.remove = function () {
        delete parent.children[this.key];
    };
    child.updateKey = function (newKey) {
        if (parent.children.hasOwnProperty(newKey)) {
            return;
        }
        this.remove();
        parent.children[newKey] = this;
        this.key = newKey;
    };
    child.addPrimitiveSibling = function () {
        return parent.addChild("");
    };
    return child;
}

AugmentedObject.prototype.addChild = function (value, key) {
    key = key || "";
    if (this.children.hasOwnProperty(key)) {
        return this.addChild(value, key + "?");
    } else {
        var newChild = augmentObjectChild(key, value, this);
        Object.each(this.children, function (child) {
            delete child.isLastAdded;
        });
        newChild.isLastAdded = true;
        this.children[key] = newChild;
        return newChild;
    }
};

AugmentedObject.prototype.size = function () {
    return Object.keys(this.children).length;
};

AugmentedObject.prototype.addArray = function () {
    this.addChild([]);
};

AugmentedObject.prototype.addObject = function () {
    this.addChild({});
};

AugmentedObject.prototype.addPrimitive = function () {
    this.addChild("");
};