import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent } from "./types/index";

export enum AssetTypes {
  babylon = "Babylon"
}

export class Asset implements SceneComponent, ObjectComponent {
  sceneName?: string;
  object!: BABYLON.Mesh;
  type: AssetTypes = AssetTypes.babylon;
  url?: string;
}