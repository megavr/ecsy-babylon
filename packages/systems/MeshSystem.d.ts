import { System } from "ecsy";
import { Mesh } from "../components/index";
export declare class MeshSystem extends System {
    static queries: {
        mesh: {
            components: (typeof Mesh)[];
            listen: {
                added: boolean;
                removed: boolean;
            };
        };
    };
    queries: any;
    execute(): void;
}
