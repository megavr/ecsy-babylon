import * as BABYLON from "@babylonjs/core";
import { MaterialComponent, TextureProperties, TextureComponent } from "./types/index";
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
export declare class Material implements TextureComponent, MaterialComponent {
    sceneName?: string;
    object: BABYLON.StandardMaterial;
    /**
     * Default: "#ffffff"
     *
     * https://doc.babylonjs.com/api/classes/babylon.standardmaterial#diffusecolor
     */
    diffuse?: string;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#specularcolor */
    specular?: string;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#emissivecolor */
    emissive?: string;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#ambientcolor */
    ambient?: string;
    texture?: TextureProperties;
}
