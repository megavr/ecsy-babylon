import { System } from "ecsy";
import { Light } from "../components/index";
/** System for Light component */
export declare class LightSystem extends System {
    /** @hidden */
    static queries: {
        light: {
            components: (typeof Light)[];
            listen: {
                added: boolean;
                removed: boolean;
                changed: (typeof Light)[];
            };
        };
    };
    /** @hidden */
    queries: any;
    /** @hidden */
    execute(): void;
    private _updateLight;
    private _updateColor;
}
