import * as BABYLON from "@babylonjs/core";
import { System, World } from "ecsy";
import { ObjectComponent, ParticleTextureProperties, TextureComponent, TextureProperties, TextureAttributes, XYZProperties } from "../components/types/index";

/**
 * Translate degree to radians in Babylon.js.
 * @param degree Degree
 */
export function degreeToRadians(degree: number): number {
  return BABYLON.Angle.FromDegrees(degree).radians();
}

/**
 * Translate radians to degree in Babylon.js.
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
  return ((system as any)["world"] as World);
}

/**
 * Dispose a generated Babylon.js object if existed. 
 * @param object Component contains Babylon.js object
 */
export function disposeObject(component: ObjectComponent): void {
  component.object && component.object.dispose();
}

/**
 * Get active scene from GameSystem.
 * @param system A registered ecsy System class
 * @param sceneName Name to get specific scene in system 
 */
export function getActiveScene(system: System, sceneName?: string): BABYLON.Scene {
  return (getWorld(system).getSystems().find(system => { return (system as any).activeScene !== undefined }) as any).getScene(sceneName);
}

/**
 * Convert XYZ value to Vector3 from a TransformProperties object. 
 * @param properties Defined XYZ values
 */
export function xyzToVector3(properties: XYZProperties): BABYLON.Vector3 {
  return new BABYLON.Vector3(properties.x, properties.y, properties.z);
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
 * Update Babylon texture for the texture properties in a TextureComponent.
 * @param component TextureComponent in the entity
 * @param properties Properties to be update
 * @param system A registered ecsy System class
 */
export function updateTexture(component: TextureComponent, properties: TextureProperties | ParticleTextureProperties, system: System): void {
  Object.keys(properties).forEach(name => {
    let textureAttributes = (properties as any)[name] as TextureAttributes;
    let textureObject = new BABYLON.Texture(textureAttributes.url, getActiveScene(system, component.sceneName));
    Object.keys(textureAttributes).filter(prop => prop === "url").forEach(prop => {
      (textureObject as any)[prop] = (textureAttributes as any)[prop];
    });
    component.object[`${name}Texture`] && disposeObject(component.object[`${name}Texture`]);
    component.object[`${name}Texture`] = textureObject;
  });
}