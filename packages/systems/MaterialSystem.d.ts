import { System } from "ecsy";
import { Material, Mesh } from "../components/index";
export declare class MaterialSystem extends System {
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
    queries: any;
    execute(): void;
    private _updateMaterial;
}
