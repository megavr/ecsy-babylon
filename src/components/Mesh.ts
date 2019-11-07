import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent, MeshOptions } from "./types/index";

export enum MeshTypes {
  Box = "Box",
  Plane = "Plane",
  Sphere = "Sphere",
  Ground = "Ground"
}

export class Mesh implements SceneComponent, ObjectComponent {
  sceneName?: string;
  object!: BABYLON.Mesh;
  type: MeshTypes = MeshTypes.Box;
  options: MeshOptions = {};
}