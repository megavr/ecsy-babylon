import { System } from "ecsy";
import { Scene } from "../components/Scene";
export declare class SceneSystem extends System {
    /** @hidden */
    static queries: {
        scene: {
            components: (typeof Scene)[];
            listen: {
                added: boolean;
                removed: boolean;
            };
        };
    };
    /** @hidden */
    queries: any;
    private _activeScene;
    get activeScene(): Scene;
    /** @hidden */
    execute(): void;
    private _getEngine;
}
