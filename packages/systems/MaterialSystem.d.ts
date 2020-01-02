import { System } from "ecsy";
import { Material, Mesh } from "../components/index";
/** System for Material component */
export declare class MaterialSystem extends System {
    /** @hidden */
    static queries: {
        meshMaterial: {
            components: (typeof Mesh | typeof Material)[];
            listen: {
                added: boolean;
                removed: boolean;
                changed: (typeof Material)[];
            };
        };
    };
    /** @hidden */
    queries: any;
    /** @hidden */
    execute(): void;
    private _isUrlMesh;
    private _updateMaterial;
    private _updateColor;
}
