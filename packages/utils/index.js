import * as BABYLON from "@babylonjs/core";
export { getAssetManager, getCamera, getScene } from "./gameUtils";
/**
 * Translate degree to radians.
 * @param degree Degree
 * @returns Radians
 */
export function degreeToRadians(degree) {
    return BABYLON.Angle.FromDegrees(degree).radians();
}
/**
 * Translate radians to degree.
 * @param radians Radians
 * @returns Degree
 */
export function radiansToDegree(radians) {
    return BABYLON.Angle.FromRadians(radians).degrees();
}
/**
 * Convert XYZProperties value to Vector3.
 * @param properties XYZProperties value
 * @returns Babylon.js Vector3
 */
export function xyzToVector3(properties) {
    return new BABYLON.Vector3(properties.x, properties.y, properties.z);
}
/**
 * Convert XYZProperties degree value to Vector3 in radians.
 * @param properties XYZProperties value in degrees
 * @returns Babylon.js Vector3
 */
export function xyzToVector3Radians(properties) {
    return new BABYLON.Vector3(degreeToRadians(properties.x), degreeToRadians(properties.y), degreeToRadians(properties.z));
}
/**
 * Convert Vector3 value to XYZProperties.
 * @param vector3 Vector3 value
 * @returns Object matches XYZProperties
 */
export function vector3ToXyz(vector3) {
    let x = vector3.x, y = vector3.y, z = vector3.z;
    return { x, y, z };
}
/**
 * Convert Vector3 value to XYZProperties in degrees.
 * @param vector3 Vector3 degree value
 * @returns Object matches XYZProperties
 */
export function vector3ToXyzDegree(vector3) {
    let x = vector3.x, y = vector3.y, z = vector3.z;
    return { x, y, z };
}
/**
 * Convert hex color value to Color3.
 * @param hexString Text of hex color value(e.g., #123ABC)
 * @returns Babylon.js Color3
 */
export function hexToColor3(hexString) {
    return BABYLON.Color3.FromHexString(hexString);
}
/**
 * Convert hex color value to Color4 (has alpha).
 * @param hexString Text of hex color value(e.g., #123ABCFF)
 * @returns Babylon.js Color4
 */
export function hexToColor4(hexString) {
    return BABYLON.Color4.FromHexString(hexString);
}
/**
 * Create object by XYZ values or create all zero object.
 * @param x value
 * @param y value
 * @param z value
 * @returns Object matches XYZProperties
 */
/** @hidden */
export function xyz(x, y, z) {
    if (x && y && z) {
        return { x: x, y: y, z: z };
    }
    else {
        return { x: 0, y: 0, z: 0 };
    }
}
