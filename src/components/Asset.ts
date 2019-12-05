import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent } from "./types/index";

export enum AssetTypes {
  Babylon = "Babylon"
}

/**
 * @example
 * ```
 * entity.addComponent(Asset, { sceneName: "Scene", url: "PATH_TO_ASSET" });
 * entity.addComponent(Asset, { type: AssetTypes.Babylon, url: "PATH_TO_ASSET" });
 * ```
 */
export class Asset implements SceneComponent, ObjectComponent<BABYLON.Mesh> {
  sceneName?: string;
  object: BABYLON.Mesh;
  /** @default "Babylon" */
  type?: AssetTypes = AssetTypes.Babylon;
  /** Path of an asset file with filename. */
  url?: string;
}