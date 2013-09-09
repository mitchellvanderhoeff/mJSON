/**
 * User: mitch
 * Date: 2013-09-02
 */

function augment(node) {
    if (Object.isArray(node)) {
        return new AugmentedArray(node);
    } else if (Object.isObject(node)) {
        return new AugmentedObject(node);
    } else {
        return new AugmentedPrimitive(node);
    }
}

function strip(model) {
    if (model == null) return null;
    switch (model.type) {
        case "array":
            return model.children.map(strip);
        case "object":
            return Object.map(model.children, strip);
        case "primitive":
            switch (model.primType) {
                case 'boolean':
                    return !!(model.value == 'true');
                case 'number':
                    var number = parseFloat(model.value);
                    return number ? number : 0;
                case 'string':
                    return String(model.value);
                default:
                    throw new Error("Undefined prim type: " + primType);
            }
    }
    return null;
}
