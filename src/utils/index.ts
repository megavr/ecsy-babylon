import * as BABYLON from "@babylonjs/core";
import { System, World, Entity } from "ecsy";
import { Transform } from "../components/index";
import { GameSystem } from "../systems/index";
import { ObjectComponent, TextureComponent, TextureAttributes, XYZProperties, MaterialColorProperties } from "../components/types/index";

/**
 * Translate degree to radians.
 * @param degree Degree
 * @returns Radians
 */
export function degreeToRadians(degree: number): number {
  return BABYLON.Angle.FromDegrees(degree).radians();
}

/**
 * Translate radians to degree.
 * @param radians Radians
 * @returns Degree
 */
export function radiansToDegree(radians: number): number {
  return BABYLON.Angle.FromRadians(radians).degrees();
}

/**
 * Hack on ecsy 0.1.4 to get World instance from system itself.
 * @param system A registered ecsy System class
 * @returns ecsy world
 */
/** @hidden */
export function getWorld(system: System): World {
  return (system as any)["world"] as World;
}

/**
 * Dispose Babylon.js object in the component. 
 * @param object Component contains Babylon.js object
 */
/** @hidden */
export function disposeObject(component: ObjectComponent<any>): void {
  component.object && component.object.dispose();
}

/**
 * Get runtime GameSystem instance. 
 * @param system A registered ecsy System class
 * @returns ecsy-babylon GameSystem 
 */
/** @hidden */
export function getGameSystem(system: System): GameSystem {
  return getWorld(system).getSystems().find(system => { return (system as any).engine; }) as GameSystem;
}

/**
 * Get a scene found or active scene if not available.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene
 * @returns Babylon.js Scene
 */
export function getScene(system: System, sceneName?: string): BABYLON.Scene {
  return getGameSystem(system).getScene(sceneName);
}

/**
 * Get an AssetManager found or an AssetManager in active scene.
 * @param system A registered ecsy System class
 * @param sceneName Name of the scene 
 * @returns Babylon.js AssetManager
 */
export function getAssetManager(system: System, sceneName?: string): BABYLON.AssetsManager {
  return getGameSystem(system).getAssetManager(sceneName);
}

/**
 * Get active Camera entity in the scene.
 * @param system A registered ecsy System class 
 * @returns Entity with ecsy-babylon Camera 
 */
export function getCamera(system: System): Entity {
  return getGameSystem(system).activeCameraEntity;
}

/**
 * Convert XYZProperties value to Vector3. 
 * @param properties XYZProperties value
 * @returns Babylon.js Vector3
 */
export function xyzToVector3(properties: XYZProperties): BABYLON.Vector3 {
  return new BABYLON.Vector3(properties.x, properties.y, properties.z);
}

/**
 * Convert XYZProperties degree value to Vector3 in radians. 
 * @param properties XYZProperties value in degrees
 * @returns Babylon.js Vector3
 */
export function xyzToVector3Radians(properties: XYZProperties): BABYLON.Vector3 {
  return new BABYLON.Vector3(degreeToRadians(properties.x), degreeToRadians(properties.y), degreeToRadians(properties.z));
}

/**
 * Convert Vector3 value to XYZProperties. 
 * @param vector3 Vector3 value
 * @returns Object matches XYZProperties
 */
export function vector3ToXyz(vector3: BABYLON.Vector3): XYZProperties {
  let x = vector3.x, y = vector3.y, z = vector3.z;
  return { x, y, z };
}

/**
 * Convert Vector3 value to XYZProperties in degrees. 
 * @param vector3 Vector3 degree value
 * @returns Object matches XYZProperties
 */
export function vector3ToXyzDegree(vector3: BABYLON.Vector3): XYZProperties {
  let x = vector3.x, y = vector3.y, z = vector3.z;
  return { x, y, z };
}

/**
 * Convert hex color value to Color3. 
 * @param hexString Text of hex color value(e.g., #123ABC)
 * @returns Babylon.js Color3
 */
export function hexToColor3(hexString: string): BABYLON.Color3 {
  return BABYLON.Color3.FromHexString(hexString);
}

/**
 * Convert hex color value to Color4 (has alpha). 
 * @param hexString Text of hex color value(e.g., #123ABCFF)
 * @returns Babylon.js Color4
 */
export function hexToColor4(hexString: string): BABYLON.Color4 {
  return BABYLON.Color4.FromHexString(hexString);
}

/**
 * Update texture object to a component for its texture properties.
 * @param component TextureComponent in the entity
 * @param textureProperties Texture properties to be update
 * @param assetManager AssetManager to process textures
 */
/** @hidden */
export function updateTexture<T>(component: TextureComponent<T>, textureProperties: T, assetManager: BABYLON.AssetsManager): void {
  for (let prop in textureProperties) {
    let textureAttributes = (textureProperties as any)[prop] as TextureAttributes;
    let task = assetManager.addTextureTask(prop, textureAttributes.url);
    task.onSuccess = (task) => {
      let textureObject = (task as BABYLON.TextureAssetTask).texture;
      for (let attr in textureAttributes) { attr !== "url" && ((textureObject as any)[attr] = (textureAttributes as any)[attr]); }
      let textureName = `${prop}Texture`;
      let componentObject = component.object;
      componentObject[textureName] && disposeObject(componentObject[textureName]);
      componentObject[textureName] = textureObject;
    }
  }
  assetManager.load();
  assetManager.reset();
}

/**
 * Get ObjectComponents in an Entity.
 * @param entity Entity to filter ObjectComponents
 * @returns Array of ObjectComponents
 */
/** @hidden */
export function getObjectComponentsInEntity(entity: Entity): Array<ObjectComponent<BABYLON.TransformNode>> {
  let components = entity.getComponents();
  let objectComponents: Array<ObjectComponent<BABYLON.TransformNode>> = [];
  for (let prop in components) {
    ((components as any)[prop] as ObjectComponent<BABYLON.TransformNode>).object && objectComponents.push((components as any)[prop] as ObjectComponent<BABYLON.TransformNode>);
  }
  return objectComponents;
}

/**
 * Update transformation to ObjectComponents.
 * @param transform Transfrom component in the entity
 * @param components Array of components with Babylon.js object
 */
/** @hidden */
export function updateObjectsTransform(transform: Transform, components: Array<ObjectComponent<any>>): void {
  components.forEach(component => {
    let object = component.object;
    object.position && (object.position = xyzToVector3(transform.position));
    object.rotation && (object.rotation = xyzToVector3Radians(transform.rotation));
    object.scaling && (object.scaling = xyzToVector3(transform.scale));
  });
}

/**
 * Update value of Babylon.js object's property from a property in component with same name.
 * @param component Component contains Babylon.js object
 * @param name Name of property in the component 
 */
/** @hidden */
export function updateObjectValue<T extends ObjectComponent<any>>(component: T, name: string): void {
  (component.object as any)[name] = (component as any)[name];
}

/**
 * Update Vector3 of Babylon.js object's property from property in component with same name.
 * @param component Component contains Babylon.js object
 * @param name Name of property in the component, value of property should matches XYZProperties  
 */
/** @hidden */
export function updateObjectVector3<T extends ObjectComponent<any>>(component: T, name: string): void {
  (component.object as any)[name] = xyzToVector3((component as any)[name]);
}

/**
 * Create object by XYZ values or create all zero object.
 * @param x value
 * @param y value
 * @param z value
 * @returns Object matches XYZProperties
 */
/** @hidden */
export function xyz(x?: number, y?: number, z?: number): XYZProperties {
  if (x && y && z) {
    return { x: x, y: y, z: z };
  } else {
    return { x: 0, y: 0, z: 0 };
  }
}

/**
 * Create object of material color values or create a material color object with white diffuse.
 * @param diffuse Diffuse color in hex string. e.g., #123ABC
 * @returns Object matches MaterialColorProperties
 */
/** @hidden */
export function materialColorHex(diffuse?: string): MaterialColorProperties {
  if (diffuse) {
    return { diffuse: diffuse };
  } else {
    return { diffuse: "#ffffff" };
  }
}