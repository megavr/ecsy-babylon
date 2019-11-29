import * as BABYLON from "@babylonjs/core";
import { System, World, Entity } from "ecsy";
import { Transform, Camera } from "../components/index";
import { GameSystem } from "../systems/index";
import { ObjectComponent, ParticleTextureProperties, TextureComponent, TextureProperties, TextureAttributes, XYZProperties } from "../components/types/index";

/**
 * Translate degree to radians.
 * @param degree Degree
 */
export function degreeToRadians(degree: number): number {
  return BABYLON.Angle.FromDegrees(degree).radians();
}

/**
 * Translate radians to degree.
 * @param degree Radians
 */
export function radiansToDegree(radians: number): number {
  return BABYLON.Angle.FromRadians(radians).degrees();
}

/**
 * Hack on ecsy 0.1.4 to get World instance from system itself.
 * @param system A registered ecsy System class
 */
export function getWorld(system: System): World {
  return (system as any)["world"] as World;
}

/**
 * Dispose Babylon.js object in the component. 
 * @param object Component contains Babylon.js object
 */
export function disposeObject(component: ObjectComponent<any>): void {
  component.object && component.object.dispose();
}

/** @hidden */
function getGameSystem(system: System): GameSystem {
  return getWorld(system).getSystems().find(system => { return (system as any).engine !== undefined }) as GameSystem;
}

/**
 * Get scene by name or return active scene.
 * @param system A registered ecsy System class
 * @param sceneName Name to get specific scene in system 
 */
export function getScene(system: System, sceneName?: string): BABYLON.Scene {
  return getGameSystem(system).getScene(sceneName);
}

/**
 * Get current Camera entity in the scene.
 * @param system A registered ecsy System class 
 */
export function getCamera(system: System): Camera {
  return getGameSystem(system).currentCamera;
}

/**
 * Convert XYZProperties value to Vector3. 
 * @param properties XYZProperties value
 */
export function xyzToVector3(properties: XYZProperties): BABYLON.Vector3 {
  return new BABYLON.Vector3(properties.x, properties.y, properties.z);
}

/**
 * Convert XYZProperties degree value to Vector3 in radians. 
 * @param properties XYZProperties value in degrees
 */
export function xyzToVector3Radians(properties: XYZProperties): BABYLON.Vector3 {
  return new BABYLON.Vector3(degreeToRadians(properties.x), degreeToRadians(properties.y), degreeToRadians(properties.z));
}

/**
 * Convert Vector3 value to XYZProperties. 
 * @param vector3 Vector3 value
 */
export function vector3ToXyz(vector3: BABYLON.Vector3): XYZProperties {
  let x = vector3.x, y = vector3.y, z = vector3.z;
  return { x, y, z };
}

/**
 * Convert Vector3 value to XYZProperties in degrees. 
 * @param vector3 Vector3 degree value
 */
export function vector3ToXyzDegree(vector3: BABYLON.Vector3): XYZProperties {
  let x = vector3.x, y = vector3.y, z = vector3.z;
  return { x, y, z };
}

/**
 * Convert hex color value to Color3. 
 * @param hexString Text of hex color value(e.g., #123def)
 */
export function hexToColor3(hexString: string): BABYLON.Color3 {
  return BABYLON.Color3.FromHexString(hexString);
}

/**
 * Convert hex color value to Color4 (has alpha). 
 * @param hexString Text of hex color value(e.g., #123def1f)
 */
export function hexToColor4(hexString: string): BABYLON.Color4 {
  return BABYLON.Color4.FromHexString(hexString);
}

/**
 * Update texture object to a component for its texture properties.
 * @param component TextureComponent in the entity
 * @param properties Properties to be update
 * @param system A registered ecsy System class
 */
export function updateTexture(component: TextureComponent, properties: TextureProperties | ParticleTextureProperties, system: System): void {
  Object.keys(properties).forEach(name => {
    let textureAttributes = (properties as any)[name] as TextureAttributes;
    let textureObject = new BABYLON.Texture(textureAttributes.url, getScene(system, component.sceneName));
    Object.keys(textureAttributes)
      .filter(prop => { return prop !== "url"; })
      .forEach(prop => (textureObject as any)[prop] = (textureAttributes as any)[prop]);
    component.object[`${name}Texture`] && disposeObject(component.object[`${name}Texture`]);
    component.object[`${name}Texture`] = textureObject;
  });
}

/**
 * Get ObjectComponents in an Entity. 
 * @param entity Entity to filter ObjectComponents
 */
export function getEntityObjectComponents(entity: Entity): Array<ObjectComponent<any>> {
  let components = entity.getComponents();
  let objectComponents: Array<ObjectComponent<any>> = [];
  Object.keys(components)
    .filter(name => { return "object" in (components as any)[name]; })
    .forEach(name => objectComponents.push((components as any)[name]));
  return objectComponents;
}

/**
 * Update transformation to ObjectComponents.
 * @param transform Transfrom component in the entity
 * @param components Components with object
 */
export function updateObjectsTransform(transform: Transform, components: Array<ObjectComponent<any>>) {
  components.forEach(component => {
    let object = component.object;
    object.position && (object.position = xyzToVector3(transform.position));
    object.rotation && (object.rotation = xyzToVector3Radians(transform.rotation));
    object.scaling && (object.scaling = xyzToVector3(transform.scale));
  });
}