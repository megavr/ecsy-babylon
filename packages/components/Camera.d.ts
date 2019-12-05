import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent } from "./types/index";
/**
 * @example
 * ```
 * entity.addComponent(Camera, { sceneName: "Scene" });
 * entity.addComponent(Camera, { options: { controllerMeshes: false } });
 * ```
 */
export declare class Camera implements SceneComponent, ObjectComponent<BABYLON.VRExperienceHelper> {
    sceneName?: string;
    object: BABYLON.VRExperienceHelper;
    /**
     * @see https://doc.babylonjs.com/api/interfaces/babylon.vrexperiencehelperoptions
     * @default {}
     */
    options?: BABYLON.VRExperienceHelperOptions;
}
