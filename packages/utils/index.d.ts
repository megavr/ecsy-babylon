import * as BABYLON from "@babylonjs/core";
import { System, World, Entity } from "ecsy";
import { Transform } from "../components/index";
import { GameSystem } from "../systems/index";
import { ObjectComponent, TextureComponent, XYZProperties, MaterialColorProperties } from "../components/types/index";
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
 * Hack on ecsy 0.1.4 to get World instance from system itself.
 * @param system A registered ecsy System class
 * @returns ecsy world
 */
/** @hidden */
export declare function getWorld(system: System): World;
/**
 * Dispose Babylon.js object in the component.
 * @param object Component contains Babylon.js object
 */
/** @hidden */
export declare function disposeObject(component: ObjectComponent<any>): void;
/**
 * Get runtime GameSystem instance.
 * @param system A registered ecsy System class
 * @returns ecsy-babylon GameSystem
 */
/** @hidden */
export declare function getGameSystem(system: System): GameSystem;
/**
 * Get a scene found or active scene if not available.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 * @returns Babylon.js Scene
 */
export declare function getScene(system: System, sceneName?: string): BABYLON.Scene;
/**
 * Get an AssetManager found or an AssetManager in active scene.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 * @returns Babylon.js AssetManager
 */
export declare function getAssetManager(system: System, sceneName?: string): BABYLON.AssetsManager;
/**
 * Get active Camera entity in the scene.
 * @param system A registered ecsy System class
 * @returns Entity with ecsy-babylon Camera
 */
export declare function getCamera(system: System): Entity;
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
 * Update texture object to a component for its texture properties.
 * @param component TextureComponent in the entity
 * @param textureProperties Texture properties to be update
 * @param assetManager AssetManager to process textures
 */
/** @hidden */
export declare function updateTexture<T>(component: TextureComponent<T>, textureProperties: T, assetManager: BABYLON.AssetsManager): void;
/**
 * Get ObjectComponents in an Entity.
 * @param entity Entity to filter ObjectComponents
 * @returns Array of ObjectComponents
 */
/** @hidden */
export declare function getObjectComponentsInEntity(entity: Entity): Array<ObjectComponent<BABYLON.TransformNode>>;
/**
 * Update transformation to ObjectComponents.
 * @param transform Transfrom component in the entity
 * @param components Array of components with Babylon.js object
 */
/** @hidden */
export declare function updateObjectsTransform(transform: Transform, components: Array<ObjectComponent<any>>): void;
/**
 * Update value of Babylon.js object's property from a property in component with same name.
 * @param component Component contains Babylon.js object
 * @param name Name of property in the component
 */
/** @hidden */
export declare function updateObjectValue<T extends ObjectComponent<any>>(component: T, name: string): void;
/**
 * Update Vector3 of Babylon.js object's property from property in component with same name.
 * @param component Component contains Babylon.js object
 * @param name Name of property in the component, value of property should matches XYZProperties
 */
/** @hidden */
export declare function updateObjectVector3<T extends ObjectComponent<any>>(component: T, name: string): void;
/**
 * Create object by XYZ values or create all zero object.
 * @param x value
 * @param y value
 * @param z value
 * @returns Object matches XYZProperties
 */
/** @hidden */
export declare function xyz(x?: number, y?: number, z?: number): XYZProperties;
/**
 * Create object of material color values or create a material color object with white diffuse.
 * @param diffuse Diffuse color in hex string. e.g., #123ABC
 * @returns Object matches MaterialColorProperties
 */
/** @hidden */
export declare function materialColorHex(diffuse?: string): MaterialColorProperties;
