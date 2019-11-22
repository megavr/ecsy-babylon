import { System } from "ecsy";
import { Transform, Asset } from "../components/index";
/** System for Asset component */
export declare class AssetSystem extends System {
    /** @hidden */
    static queries: {
        asset: {
            components: (typeof Transform | typeof Asset)[];
            listen: {
                added: boolean;
                removed: boolean;
            };
        };
    };
    /** @hidden */
    queries: any;
    private _assetManager;
    /** @hidden */
    execute(): void;
    private _loadBabylon;
}
