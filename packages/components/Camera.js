/**
 * Usage:
 * ```
 * entity.addComponent(Camera);
 * entity.addComponent(Camera, { options: { controllerMeshes: false } });
 * ```
 */
export class Camera {
    constructor() {
        /**
         * Default: {}
         *
         * https://doc.babylonjs.com/api/interfaces/babylon.vrexperiencehelperoptions
         */
        this.options = {};
    }
}
