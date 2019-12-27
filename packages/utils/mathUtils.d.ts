import * as BABYLON from "@babylonjs/core";
import { XYZProperties } from "../components/types/index";
/**
 * Translate degree to radians.
 * @param degree Degree
 */
export declare function degreeToRadians(degree: number): number;
/**
 * Convert XYZProperties value to Vector3.
 * @param properties XYZProperties value
 */
export declare function xyzToVector3(properties: XYZProperties): BABYLON.Vector3;
/**
 * Convert XYZProperties degree value to Vector3 in radians.
 * @param properties XYZProperties value in degrees
 */
export declare function xyzToVector3Radians(properties: XYZProperties): BABYLON.Vector3;
/**
 * @hidden
 * Create object by XYZ values or create all zero object.
 * @param x value
 * @param y value
 * @param z value
 * @returns Object matches XYZProperties
 */
export declare function xyz(x?: number, y?: number, z?: number): XYZProperties;
