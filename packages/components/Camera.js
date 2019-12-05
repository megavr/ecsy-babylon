/**
 * @example
 * ```
 * entity.addComponent(Camera, { sceneName: "Scene" });
 * entity.addComponent(Camera, { options: { controllerMeshes: false } });
 * ```
 */
export class Camera {
    constructor() {
        /**
         * @see https://doc.babylonjs.com/api/interfaces/babylon.vrexperiencehelperoptions
         * @default {}
         */
        this.options = {};
    }
}
