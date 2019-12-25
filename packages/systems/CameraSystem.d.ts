import { System } from "ecsy";
import { Camera } from "../components/index";
/** System for Camera component */
export declare class CameraSystem extends System {
    /** @hidden */
    static queries: {
        camera: {
            components: (typeof Camera)[];
            listen: {
                added: boolean;
                removed: boolean;
            };
        };
    };
    /** @hidden */
    queries: any;
    /** <BABYLON.Scene.uid, Camera component> */
    private _cameraOfScenes;
    /** @hidden */
    init(): void;
    /** @hidden */
    execute(): void;
    private _updateControl;
}
