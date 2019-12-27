import * as BABYLON from "@babylonjs/core";
import { Entity } from "ecsy";
import { SceneComponent, ObjectComponent } from "./types/index";
export declare enum AssetTypes {
    Babylon = "Babylon"
}
/**
 * @example
 * ```
 * entity.addComponent(Asset, { url: "PATH_TO_ASSET" });
 * ```
 */
export declare class Asset implements SceneComponent, ObjectComponent<BABYLON.Mesh> {
    scene?: Entity;
    object: BABYLON.Mesh;
    /** @default "Babylon" */
    type?: AssetTypes;
    /** Path of an asset file with filename. */
    url?: string;
}
