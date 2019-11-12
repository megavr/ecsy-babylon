import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent } from "./types/index";
export declare enum AssetTypes {
    babylon = "Babylon"
}
export declare class Asset implements SceneComponent, ObjectComponent {
    sceneName?: string;
    object: BABYLON.Mesh;
    type: AssetTypes;
    url?: string;
}
