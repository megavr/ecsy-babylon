import { System } from "ecsy";
import { Transform } from "../components/index";
/** System for Transform component */
export declare class TransformSystem extends System {
    /** @hidden */
    static queries: {
        transforms: {
            components: (typeof Transform)[];
            listen: {
                changed: (typeof Transform)[];
            };
        };
    };
    /** @hidden */
    queries: any;
    /** @hidden */
    execute(): void;
}
