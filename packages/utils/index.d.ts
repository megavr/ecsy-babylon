import * as BABYLON from "@babylonjs/core";
import { System, World, Entity } from "ecsy";
import { Transform, Camera } from "../components/index";
import { ObjectComponent, ParticleTextureProperties, TextureComponent, TextureProperties, XYZProperties } from "../components/types/index";
/**
 * Translate degree to radians.
 * @param degree Degree
 */
export declare function degreeToRadians(degree: number): number;
/**
 * Translate radians to degree.
 * @param degree Radians
 */
export declare function radiansToDegree(radians: number): number;
/**
 * Hack on ecsy 0.1.4 to get World instance from system itself.
 * @param system A registered ecsy System class
 */
export declare function getWorld(system: System): World;
/**
 * Dispose Babylon.js object in the component.
 * @param object Component contains Babylon.js object
 */
export declare function disposeObject(component: ObjectComponent<any>): void;
/**
 * Get scene by name or return active scene.
 * @param system A registered ecsy System class
 * @param sceneName Name to get specific scene in system
 */
export declare function getScene(system: System, sceneName?: string): BABYLON.Scene;
/**
 * Get current Camera entity in the scene.
 * @param system A registered ecsy System class
 */
export declare function getCamera(system: System): Camera;
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
 * Convert Vector3 value to XYZProperties.
 * @param vector3 Vector3 value
 */
export declare function vector3ToXyz(vector3: BABYLON.Vector3): XYZProperties;
/**
 * Convert Vector3 value to XYZProperties in degrees.
 * @param vector3 Vector3 degree value
 */
export declare function vector3ToXyzDegree(vector3: BABYLON.Vector3): XYZProperties;
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
 * Update texture object to a component for its texture properties.
 * @param component TextureComponent in the entity
 * @param properties Properties to be update
 * @param system A registered ecsy System class
 */
export declare function updateTexture(component: TextureComponent, properties: TextureProperties | ParticleTextureProperties, system: System): void;
/**
 * Get ObjectComponents in an Entity.
 * @param entity Entity to filter ObjectComponents
 */
export declare function getEntityObjectComponents(entity: Entity): Array<ObjectComponent<any>>;
/**
 * Update transformation to ObjectComponents.
 * @param transform Transfrom component in the entity
 * @param components Components with object
 */
export declare function updateObjectsTransform(transform: Transform, components: Array<ObjectComponent<any>>): void;
