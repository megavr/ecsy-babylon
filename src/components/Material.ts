import * as BABYLON from "@babylonjs/core";
import { MaterialComponent, ObjectComponent, SceneComponent, TextureComponent } from "./types/index";

export class Material implements SceneComponent, ObjectComponent, MaterialComponent {
  sceneName?: string;
  object: BABYLON.StandardMaterial;
  diffuse = "#ffffff";
  specular?: string;
  emissive?: string;
  ambient?: string;
  texture?: TextureComponent;
}