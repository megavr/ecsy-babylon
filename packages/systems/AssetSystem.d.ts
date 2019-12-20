import { System } from "ecsy";
import { Asset } from "../components/index";
/** System for Asset component */
export declare class AssetSystem extends System {
    /** @hidden */
    static queries: {
        asset: {
            components: (typeof Asset)[];
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
