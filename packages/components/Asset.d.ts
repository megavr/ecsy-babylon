import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent } from "./types/index";
export declare enum AssetTypes {
    Babylon = "Babylon"
}
/**
 * @example
 * ```
 * entity.addComponent(Asset, { sceneName: "Scene", url: "PATH_TO_ASSET" });
 * entity.addComponent(Asset, { type: AssetTypes.Babylon, url: "PATH_TO_ASSET" });
 * ```
 */
export declare class Asset implements SceneComponent, ObjectComponent<BABYLON.Mesh> {
    sceneName?: string;
    object: BABYLON.Mesh;
    /** @default "Babylon" */
    type?: AssetTypes;
    /** Path of an asset file with filename. */
    url?: string;
}
