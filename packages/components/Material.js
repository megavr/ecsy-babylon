/**
 * Usage:
 * ```
 * entity.addComponent(Material);
 * entity.addComponent(Material, { diffuse: "#E74C3C" });
 * entity.addComponent(Material, { texture: {
 *   diffuse: { url: "PATH_TO_TEXTURE", uScale: 4, vScale: 4 },
 * });
 * ```
 */
export class Material {
    constructor() {
        /**
         * Default: "#ffffff"
         *
         * https://doc.babylonjs.com/api/classes/babylon.standardmaterial#diffusecolor
         */
        this.diffuse = "#ffffff";
    }
}
