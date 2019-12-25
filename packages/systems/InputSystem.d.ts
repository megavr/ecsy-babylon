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
    /** @hidden */
    execute(): void;
}
