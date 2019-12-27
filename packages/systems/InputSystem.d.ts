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
                removed: boolean;
            };
        };
    };
    /** @hidden */
    queries: any;
    private _inputs;
    private _input;
    init(): void;
    /** @hidden */
    execute(): void;
    private _updateOnKey;
    private _removeOnKey;
    private _onKey;
}
