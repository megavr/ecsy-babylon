import { System } from "ecsy";
import { Mesh } from "../components/index";
/** System for Mesh component */
export declare class MeshSystem extends System {
    /** @hidden */
    static queries: {
        mesh: {
            components: (typeof Mesh)[];
            listen: {
                added: boolean;
                removed: boolean;
                changed: (typeof Mesh)[];
            };
        };
    };
    /** @hidden */
    queries: any;
    /** @hidden */
    execute(): void;
    private _updateMesh;
    private _fileExt;
    private _loadUrlMesh;
    private _updateMeshValue;
    private _unsupportedMesh;
}
