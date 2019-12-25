import * as BABYLON from "@babylonjs/core";
export { getScene, getActiveSceneName, getAssetManager } from "./gameUtils";
/**
 * Translate degree to radians.
 * @param degree Degree
 */
export function degreeToRadians(degree) {
    return BABYLON.Angle.FromDegrees(degree).radians();
}
/**
 * Translate radians to degree.
 * @param radians Radians
 */
export function radiansToDegree(radians) {
    return BABYLON.Angle.FromRadians(radians).degrees();
}
/**
 * Convert XYZProperties value to Vector3.
 * @param properties XYZProperties value
 */
export function xyzToVector3(properties) {
    return new BABYLON.Vector3(properties.x, properties.y, properties.z);
}
/**
 * Convert XYZProperties degree value to Vector3 in radians.
 * @param properties XYZProperties value in degrees
 */
export function xyzToVector3Radians(properties) {
    return new BABYLON.Vector3(degreeToRadians(properties.x), degreeToRadians(properties.y), degreeToRadians(properties.z));
}
/**
 * Convert Vector3 value to XYZProperties.
 * @param vector3 Vector3 value
 */
export function vector3ToXyz(vector3) {
    let x = vector3.x, y = vector3.y, z = vector3.z;
    return { x, y, z };
}
/**
 * Convert Vector3 value to XYZProperties in degrees.
 * @param vector3 Vector3 degree value
 */
export function vector3ToXyzDegree(vector3) {
    let x = vector3.x, y = vector3.y, z = vector3.z;
    return { x, y, z };
}
/**
 * Convert hex color value to Color3.
 * @param hexString Text of hex color value(e.g., #123ABC)
 */
export function hexToColor3(hexString) {
    return BABYLON.Color3.FromHexString(hexString);
}
/**
 * Convert hex color value to Color4 (has alpha).
 * @param hexString Text of hex color value(e.g., #123ABCFF)
 */
export function hexToColor4(hexString) {
    return BABYLON.Color4.FromHexString(hexString);
}
