import * as BABYLON from "@babylonjs/core";
import { MaterialComponent, ObjectComponent, SceneComponent } from "./types/index";

export class Material implements SceneComponent, ObjectComponent, MaterialComponent {
  sceneName?: string;
  object: BABYLON.StandardMaterial;
  diffuse = "#ffffff";
}