import { System } from "ecsy";
import { Input } from "../components/index";
/** System for Input component */
export declare class InputSystem extends System {
    /** @hidden */
    static queries: {
        input: {
            components: (typeof Input)[];
            listen: {
                added: boolean;
            };
        };
    };
    /** @hidden */
    queries: any;
    private _isControllerConntected;
    /** @hidden */
    execute(): void;
    private _initVRController;
    private _getVRController;
    private _bindControllerBehaviours;
    private _updateObjectsTransform;
}
