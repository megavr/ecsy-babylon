import * as BABYLON from "@babylonjs/core";
import { SceneComponent, ObjectComponent } from "./types/index";
/**
 * @example
 * ```
 * entity.addComponent(Camera, { sceneName: "Scene" });
 * entity.addComponent(Camera, { pointerLock: true });
 * ```
 */
export declare class Camera implements SceneComponent, ObjectComponent<BABYLON.FreeCamera> {
    sceneName?: string;
    object: BABYLON.FreeCamera;
    /**
     * Lock pointer when using the camera.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
     * @default false
     */
    pointerLock?: boolean;
}
