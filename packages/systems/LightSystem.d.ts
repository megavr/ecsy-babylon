import { System } from "ecsy";
import { Light } from "../components/index";
export declare class LightSystem extends System {
    static queries: {
        light: {
            components: (typeof Light)[];
            listen: {
                added: boolean;
                removed: boolean;
                changed: boolean;
            };
        };
    };
    queries: any;
    execute(): void;
    private _updateLight;
}
