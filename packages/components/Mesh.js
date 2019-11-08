export var MeshTypes;
(function (MeshTypes) {
    MeshTypes["Box"] = "Box";
    MeshTypes["Plane"] = "Plane";
    MeshTypes["Sphere"] = "Sphere";
    MeshTypes["Ground"] = "Ground";
})(MeshTypes || (MeshTypes = {}));
export class Mesh {
    constructor() {
        this.type = MeshTypes.Box;
        this.options = {};
    }
}
