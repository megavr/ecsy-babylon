import { System } from "ecsy";
import { Transform } from "../components/index";
export declare class TransformSystem extends System {
    static queries: {
        object: {
            components: (typeof Transform)[];
        };
    };
    queries: any;
    execute(): void;
    private _updateTransform;
}
