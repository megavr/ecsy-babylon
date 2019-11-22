import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent, MeshOptions } from "./types/index";
export declare enum MeshTypes {
    Box = "Box",
    Plane = "Plane",
    Sphere = "Sphere",
    Ground = "Ground"
}
/**
 * Usage:
 * ```
 * entity.addComponent(Mesh);
 * entity.addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 2, height: 2 } });
 * entity.addComponent(Mesh, { type: MeshTypes.Sphere, options: { diameter: 2 } });
 * ```
 */
export declare class Mesh implements SceneComponent, ObjectComponent<BABYLON.Mesh> {
    sceneName?: string;
    object: BABYLON.Mesh;
    /** Default: "Box" */
    type?: MeshTypes;
    options?: MeshOptions;
}
