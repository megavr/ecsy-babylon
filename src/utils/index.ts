import { World } from "ecsy";
import * as BABYLON from "@babylonjs/core";
import { ObjectComponent } from "../components/types/index";

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
export function getWorld(system: any): World {
  return (system["world"] as World);
}

/**
 * Dispose a generated Babylon.js object if existed. 
 * @param object Component contains Babylon.js object
 */
export function disposeObject(component: ObjectComponent): void {
  component.object !== undefined && component.object.dispose();
}

/**
 * Get active scene from GameSystem.
 * @param system A registered ecsy System class
 * @param sceneName Name to get specific scene in system 
 */
export function getActiveScene(system: any, sceneName?: string): BABYLON.Scene {
  return (getWorld(system).getSystems().find(system => { return (system as any).activeScene !== undefined }) as any).getScene(sceneName);
}