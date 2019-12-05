import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent, MeshOptions } from "./types/index";
export declare enum MeshTypes {
    Box = "Box",
    Plane = "Plane",
    Sphere = "Sphere",
    Ground = "Ground"
}
/**
 * @example
 * ```
 * entity.addComponent(Mesh, { sceneName: "Scene" });
 * entity.addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 2, height: 2 } });
 * entity.addComponent(Mesh, { type: MeshTypes.Sphere, options: { diameter: 2 } });
 * ```
 */
export declare class Mesh implements SceneComponent, ObjectComponent<BABYLON.Mesh> {
    sceneName?: string;
    object: BABYLON.Mesh;
    /** @default "Box" */
    type?: MeshTypes;
    /** @default {} */
    options?: MeshOptions;
}
