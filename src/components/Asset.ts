import * as BABYLON from "@babylonjs/core";
import { Entity } from "ecsy";
import { SceneComponent, ObjectComponent } from "./types/index";

export enum AssetTypes {
  Babylon = "Babylon"
}

/**
 * @example
 * ```
 * entity.addComponent(Asset, { url: "PATH_TO_ASSET" });
 * ```
 */
export class Asset implements SceneComponent, ObjectComponent<BABYLON.Mesh> {
  scene?: Entity;
  object: BABYLON.Mesh;
  /** @default "Babylon" */
  type?: AssetTypes = AssetTypes.Babylon;
  /** Path of an asset file with filename. */
  url?: string;
}