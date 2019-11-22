import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent, XYZProperties } from "./types/index";

export enum LightTypes {
  Point = "Point",
  Directional = "Directional",
  Spot = "Spot",
  Hemispheric = "Hemispheric"
}

/**
 * Usage:
 * ```
 * entity.addComponent(Light);
 * entity.addComponent(Light, { type: LightTypes.Point, intensity: 2 });
 * entity.addComponent(Light, { type: LightTypes.Directional, direction: { x: 0, y: 0, z: 1 } });
 * entity.addComponent(Light, { type: LightTypes.Spot, direction: { x: 0, y: 0, z: 1 }, angle: 30, exponent: 2 });
 * ```
 */
export class Light implements SceneComponent, ObjectComponent<BABYLON.HemisphericLight | BABYLON.ShadowLight> {
  sceneName?: string;
  object!: BABYLON.HemisphericLight | BABYLON.ShadowLight;
  /** Default: "Hemispheric" */
  type?: LightTypes;
  direction: XYZProperties = { x: 0, y: 0, z: 0 };
  /** https://doc.babylonjs.com/api/classes/babylon.light#intensity */
  intensity?: number;
  /** https://doc.babylonjs.com/api/classes/babylon.light#radius */
  radius?: number;
  /** https://doc.babylonjs.com/api/classes/babylon.light#range */
  range?: number;
  /**
   * hex for Color3 value, e.g., #123abc
   * https://doc.babylonjs.com/api/classes/babylon.light#diffuse
   */
  diffuse?: string;
  /**
   * hex for Color3 value, e.g., #123abc
   * https://doc.babylonjs.com/api/classes/babylon.light#specularS
   */
  specular?: string;
  /** 
   * Spot
   * https://doc.babylonjs.com/api/classes/babylon.spotlight#angle 
   */
  angle?: number;
  /** 
   * Spot
   * https://doc.babylonjs.com/api/classes/babylon.spotlight#exponent 
   */
  exponent?: number;
}