import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent, XYZProperties } from "./types/index";

export enum LightTypes {
  Point = "Point",
  Directional = "Directional",
  Spot = "Spot",
  Hemispheric = "Hemispheric"
}

export class Light implements SceneComponent, ObjectComponent {
  sceneName?: string;
  object!: BABYLON.HemisphericLight | BABYLON.ShadowLight;
  type: LightTypes = LightTypes.Hemispheric;
  direction: XYZProperties = { x: 0, y: 0, z: 0 };
  intensity?: number;
  radius?: number;
  range?: number;
  specular?: string;
  angle?: number;
  exponent?: number;
}