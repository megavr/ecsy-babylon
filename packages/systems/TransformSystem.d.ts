import { System } from "ecsy";
import { Transform } from "../components/index";
/** System for Transform component */
export declare class TransformSystem extends System {
    /** @hidden */
    static queries: {
        object: {
            components: (typeof Transform)[];
            listen: {
                changed: (typeof Transform)[];
            };
        };
    };
    /** @hidden */
    queries: any;
    /** @hidden */
    init(): void;
    /** @hidden */
    execute(): void;
    private _updateTransform;
}
