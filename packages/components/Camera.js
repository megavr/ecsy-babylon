/**
 * @example
 * ```
 * entity.addComponent(Camera, { sceneName: "Scene" });
 * entity.addComponent(Camera, { pointerLock: true });
 * ```
 */
export class Camera {
    constructor() {
        /**
         * Lock pointer when using the camera.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
         * @default false
         */
        this.pointerLock = false;
    }
}
