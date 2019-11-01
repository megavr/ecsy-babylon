import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent, DirectionComponent } from "./types/index";

export enum LightTypes {
  Point = "Point",
  Directional = "Directional",
  Spot = "Spot",
  Hemispheric = "Hemispheric"
}

export class Light implements SceneComponent, ObjectComponent, DirectionComponent {
  sceneName?: string;
  object!: BABYLON.HemisphericLight | BABYLON.ShadowLight;
  type = LightTypes.Hemispheric;
  direction = { x: 0, y: 0, z: 0 };
  angle?: number;
  exponent?: number;
}