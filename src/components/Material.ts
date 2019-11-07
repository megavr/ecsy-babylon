import * as BABYLON from "@babylonjs/core";
import { MaterialComponent, TextureProperties, TextureComponent } from "./types/index";

export class Material implements TextureComponent, MaterialComponent {
  sceneName?: string;
  object!: BABYLON.StandardMaterial;
  diffuse: string = "#ffffff";
  specular?: string;
  emissive?: string;
  ambient?: string;
  texture?: TextureProperties;
}