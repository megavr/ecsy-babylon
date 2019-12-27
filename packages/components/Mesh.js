export var MeshTypes;
(function (MeshTypes) {
    MeshTypes["Box"] = "Box";
    MeshTypes["Plane"] = "Plane";
    MeshTypes["Sphere"] = "Sphere";
    MeshTypes["Ground"] = "Ground";
})(MeshTypes || (MeshTypes = {}));
/**
 * @example
 * ```
 * entity.addComponent(Mesh);
 * entity.addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 2, height: 2 } });
 * entity.addComponent(Mesh, { type: MeshTypes.Sphere, options: { diameter: 2 } });
 * ```
 */
export class Mesh {
    constructor() {
        /** @default "Box" */
        this.type = MeshTypes.Box;
        /** @default {} */
        this.options = {};
    }
}
