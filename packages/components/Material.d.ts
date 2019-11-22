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
    diffuse?: string;
    specular?: string;
    emissive?: string;
    ambient?: string;
    texture?: TextureProperties;
}
