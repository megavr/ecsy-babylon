import * as BABYLON from "@babylonjs/core";
import { ColorComponent, TextureComponent, MaterialColorProperties, MaterialTextureProperties } from "./types/index";
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
export declare class Material implements ColorComponent<MaterialColorProperties>, TextureComponent<MaterialTextureProperties> {
    sceneName?: string;
    object: BABYLON.StandardMaterial;
    /** @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial#alpha */
    alpha?: number;
    /** @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial#useparallax */
    useParallax?: boolean;
    /** @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial#useparallaxocclusion */
    useParallaxOcclusion?: boolean;
    /** @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial#parallaxscalebias */
    parallaxScaleBias?: number;
    /** @default { diffuse: "#ffffff" } */
    color?: MaterialColorProperties;
    texture?: MaterialTextureProperties;
}
