/**
 * User: mitch
 * Date: 2013-09-02
 */

function augmentObjectChild(key, value, parent) {
    var child = augmentModel(value);
    child.key = key;
    child.remove = function () {
        delete parent.children[this.key];
    };
    child.updateKey = function (newKey) {
        this.remove();
        parent.children[newKey] = child;
        this.key = newKey;
    }
    parent.children[key] = child;
}

function augmentArrayChild(item, index, parent) {
    var child = augmentModel(item);
    child.index = index;
    child.remove = function () {
        parent.children.splice(this.index, 1);
    };
    parent.children.push(child);
}

function createAugmentedObject(data) {
    var augmented = {};
    augmented.type = "array";
    augmented.children = [];
    augmented.addChild = function (child) {
        augmentArrayChild(child, this.children.length, this);
    };
    data.each(function (child, index) {
        augmentArrayChild(child, index, augmented);
    });
    return augmented;
}
function createAugmentedArray(data) {
    var augmented = {};
    augmented.type = "object";
    augmented.children = {};
    augmented.addChild = function (child) {
        augmentObjectChild("", child, this);
    };
    Object.each(data, function (key, value) {
        augmentObjectChild(key, value, augmented);
    });
    return augmented;
}

function createAugmentedPrimitive(data) {
    var augmented = {};
    augmented.type = "primitive";
    augmented.value = data;
    return augmented;
}

function augmentModel(node) {
    if (Object.isArray(node)) {
        return createAugmentedObject(node);
    } else if (Object.isObject(node)) {
        return createAugmentedArray(node);
    } else {
        return createAugmentedPrimitive(node);
    }
}

function strip(augmented) {
    if (augmented == null) return null;
    switch (augmented.type) {
        case "array":
            return augmented.children.map(strip);
        case "object":
            var stripped = {};
            Object.each(augmented.children, function (key, value) {
                stripped[key] = strip(value);
            });
            return stripped;
        case "primitive":
            return augmented.value;
    }
    return null;
}
