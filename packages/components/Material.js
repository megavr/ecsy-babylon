import { materialColorHex } from "../utils/materialUtils";
/**
 * @example
 * ```
 * entity.addComponent(Material, {
 *    sceneName: "Scene",
 *    alpha: 0.7,
 *    color: { diffuse: "#E74C3C" }
 * });
 * entity.addComponent(Material, {
 *    texture: {
 *      diffuse: { url: "PATH_TO_TEXTURE", uScale: 4, vScale: 4 }
 *    }
 * });
 * ```
 */
export class Material {
    constructor() {
        /** @default { diffuse: "#ffffff" } */
        this.color = materialColorHex();
    }
}
