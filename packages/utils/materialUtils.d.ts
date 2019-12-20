import * as BABYLON from "@babylonjs/core";
import { TextureComponent, MaterialColorProperties } from "../components/types/index";
/**
 * Update texture object to a component for its texture properties.
 * @param component TextureComponent in the entity
 * @param textureProperties Texture properties to be update
 * @param assetManager AssetManager to process textures
 */
/** @hidden */
export declare function updateTexture<T>(component: TextureComponent<T>, textureProperties: T, assetManager: BABYLON.AssetsManager): void;
/**
 * Create object of material color values or create a material color object with white diffuse.
 * @param diffuse Diffuse color in hex string. e.g., #123ABC
 * @returns Object matches MaterialColorProperties
 */
/** @hidden */
export declare function materialColorHex(diffuse?: string): MaterialColorProperties;
