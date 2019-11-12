import { System } from "ecsy";
import { Transform } from "../components/index";
export declare class TransformSystem extends System {
    static queries: {
        object: {
            components: (typeof Transform)[];
            listen: {
                changed: (typeof Transform)[];
            };
        };
    };
    queries: any;
    init(): void;
    execute(): void;
    private _updateTransform;
}
