import * as BABYLON from "@babylonjs/core";
import { TextureComponent, MaterialColorProperties } from "../components/types/index";
/**
 * @hidden
 * Update texture object to a component for its texture properties.
 * @param component TextureComponent in the entity
 * @param textureProperties Texture properties to be update
 * @param assetManager AssetManager to process textures
 */
export declare function updateTexture<T>(component: TextureComponent<T>, textureProperties: T, assetManager: BABYLON.AssetsManager): void;
/**
 * @hidden
 * Create object of material color values or create a material color object with white diffuse.
 * @param diffuse Diffuse color in hex string. e.g., #123ABC
 * @returns Object matches MaterialColorProperties
 */
export declare function materialColorHex(diffuse?: string): MaterialColorProperties;
/**
 * Convert hex color value to Color3.
 * @param hexString Text of hex color value(e.g., #123ABC)
 */
export declare function hexToColor3(hexString: string): BABYLON.Color3;
/**
 * Convert hex color value to Color4 (has alpha).
 * @param hexString Text of hex color value(e.g., #123ABCFF)
 */
export declare function hexToColor4(hexString: string): BABYLON.Color4;
