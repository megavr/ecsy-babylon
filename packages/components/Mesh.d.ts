import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent, MeshOptions } from "./types/index";
export declare enum MeshTypes {
    Box = "Box",
    Plane = "Plane",
    Sphere = "Sphere",
    Ground = "Ground"
}
export declare class Mesh implements SceneComponent, ObjectComponent {
    sceneName?: string;
    object: BABYLON.Mesh;
    type: MeshTypes;
    options: MeshOptions;
}
