import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent } from "./types/index";

export class Camera implements SceneComponent, ObjectComponent {
  sceneName?: string;
  object!: BABYLON.VRExperienceHelper;
  options: BABYLON.VRExperienceHelperOptions = {};
}