import * as BABYLON from "@babylonjs/core";
import { System, World } from "ecsy";
import { ObjectComponent, ParticleTextureProperties, TextureComponent, TextureProperties, XYZProperties } from "../components/types/index";
/**
 * Translate degree to radians in Babylon.js.
 * @param degree Degree
 */
export declare function degreeToRadians(degree: number): number;
/**
 * Translate radians to degree in Babylon.js.
 * @param degree Radians
 */
export declare function radiansToDegree(radians: number): number;
/**
 * Hack on ecsy 0.1.4 to get World instance from system itself.
 * @param system A registered ecsy System class
 */
export declare function getWorld(system: System): World;
/**
 * Dispose a generated Babylon.js object if existed.
 * @param object Component contains Babylon.js object
 */
export declare function disposeObject(component: ObjectComponent): void;
/**
 * Get active scene from GameSystem.
 * @param system A registered ecsy System class
 * @param sceneName Name to get specific scene in system
 */
export declare function getActiveScene(system: System, sceneName?: string): BABYLON.Scene;
/**
 * Convert XYZ value to Vector3 from a TransformProperties object.
 * @param properties Defined XYZ values
 */
export declare function xyzToVector3(properties: XYZProperties): BABYLON.Vector3;
/**
 * Convert hex color value to Color3.
 * @param hexString Text of hex color value(e.g., #123def)
 */
export declare function hexToColor3(hexString: string): BABYLON.Color3;
/**
 * Convert hex color value to Color4 (has alpha).
 * @param hexString Text of hex color value(e.g., #123def1f)
 */
export declare function hexToColor4(hexString: string): BABYLON.Color4;
/**
 * Update Babylon texture for the texture properties in a TextureComponent.
 * @param component TextureComponent in the entity
 * @param properties Properties to be update
 * @param system A registered ecsy System class
 */
export declare function updateTexture(component: TextureComponent, properties: TextureProperties | ParticleTextureProperties, system: System): void;
