import * as BABYLON from "@babylonjs/core";
import { XYZProperties } from "../components/types/index";
export { getAssetManager, getCamera, getScene } from "./gameUtils";
/**
 * Translate degree to radians.
 * @param degree Degree
 * @returns Radians
 */
export declare function degreeToRadians(degree: number): number;
/**
 * Translate radians to degree.
 * @param radians Radians
 * @returns Degree
 */
export declare function radiansToDegree(radians: number): number;
/**
 * Convert XYZProperties value to Vector3.
 * @param properties XYZProperties value
 * @returns Babylon.js Vector3
 */
export declare function xyzToVector3(properties: XYZProperties): BABYLON.Vector3;
/**
 * Convert XYZProperties degree value to Vector3 in radians.
 * @param properties XYZProperties value in degrees
 * @returns Babylon.js Vector3
 */
export declare function xyzToVector3Radians(properties: XYZProperties): BABYLON.Vector3;
/**
 * Convert Vector3 value to XYZProperties.
 * @param vector3 Vector3 value
 * @returns Object matches XYZProperties
 */
export declare function vector3ToXyz(vector3: BABYLON.Vector3): XYZProperties;
/**
 * Convert Vector3 value to XYZProperties in degrees.
 * @param vector3 Vector3 degree value
 * @returns Object matches XYZProperties
 */
export declare function vector3ToXyzDegree(vector3: BABYLON.Vector3): XYZProperties;
/**
 * Convert hex color value to Color3.
 * @param hexString Text of hex color value(e.g., #123ABC)
 * @returns Babylon.js Color3
 */
export declare function hexToColor3(hexString: string): BABYLON.Color3;
/**
 * Convert hex color value to Color4 (has alpha).
 * @param hexString Text of hex color value(e.g., #123ABCFF)
 * @returns Babylon.js Color4
 */
export declare function hexToColor4(hexString: string): BABYLON.Color4;
/**
 * Create object by XYZ values or create all zero object.
 * @param x value
 * @param y value
 * @param z value
 * @returns Object matches XYZProperties
 */
/** @hidden */
export declare function xyz(x?: number, y?: number, z?: number): XYZProperties;
