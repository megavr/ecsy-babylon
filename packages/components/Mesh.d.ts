import * as BABYLON from "@babylonjs/core";
import { Entity } from "ecsy";
import { SceneComponent, ObjectComponent, MeshOptions } from "./types/index";
export declare enum MeshTypes {
    Box = "Box",
    Plane = "Plane",
    Sphere = "Sphere",
    Ground = "Ground",
    Url = "Url"
}
/**
 * @example
 * ```
 * entity.addComponent(Mesh);
 * entity.addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 2, height: 2 } });
 * entity.addComponent(Mesh, { type: MeshTypes.Sphere, options: { diameter: 2 } });
 * entity.addComponent(Mesh, { type: MeshTypes.Url, url: "PATH_TO_MESH" });
 * ```
 */
export declare class Mesh implements SceneComponent, ObjectComponent<BABYLON.Mesh> {
    scene?: Entity;
    object: BABYLON.Mesh;
    /** @default "Box" */
    type?: MeshTypes;
    /**
     * @default {}
     * @memberof Box, Plane, Sphere, Ground
     */
    options?: MeshOptions;
    /** @memberof Url */
    url?: String;
}
