/**
 * User: mitch
 * Date: 2013-09-05
 */

function AugmentedPrimitive(data) {
    this.type = "primitive";
    this.value = String(data);
    this.primType = typeof data;
}

AugmentedPrimitive.prototype.setPrimType = function (primType) {
    if (this.primType == primType) return;
    switch (primType) {
        case 'boolean':
            this.value = 'true';
            break;
        case 'number':
            this.value = '0';
            break;
        case 'string':
            this.value = '';
            break;
    }
    this.primType = primType;
};