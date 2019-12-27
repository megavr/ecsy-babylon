import * as BABYLON from "@babylonjs/core";
import { ColorComponent, SceneColorProperties, TextureComponent, SceneTextureProperties } from "./types/index";
/**
 * @example
 * ```
 * entity.addComponent(Scene, { color: { clear: "123ABCFF" } });
 * ```
 */
export declare class Scene implements ColorComponent<SceneColorProperties>, TextureComponent<SceneTextureProperties> {
    object: BABYLON.Scene;
    ambientColor?: String;
    /** @see https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions */
    options: BABYLON.SceneOptions;
    color?: SceneColorProperties;
    texture?: SceneTextureProperties;
}
