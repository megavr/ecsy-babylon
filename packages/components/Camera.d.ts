import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent } from "./types/index";
/**
 * Usage:
 * ```
 * entity.addComponent(Camera);
 * entity.addComponent(Camera, { options: { controllerMeshes: false } });
 * ```
 */
export declare class Camera implements SceneComponent, ObjectComponent<BABYLON.VRExperienceHelper> {
    sceneName?: string;
    object: BABYLON.VRExperienceHelper;
    /**
     * Default: {}
     *
     * https://doc.babylonjs.com/api/interfaces/babylon.vrexperiencehelperoptions
     */
    options?: BABYLON.VRExperienceHelperOptions;
}
