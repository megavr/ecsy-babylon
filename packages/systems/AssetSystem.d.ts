import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Transform, Asset } from "../components/index";
export declare class AssetSystem extends System {
    static queries: {
        asset: {
            components: (typeof Transform | typeof Asset)[];
            listen: {
                added: boolean;
                removed: boolean;
            };
        };
    };
    queries: any;
    assetManager: BABYLON.AssetsManager;
    execute(): void;
}
