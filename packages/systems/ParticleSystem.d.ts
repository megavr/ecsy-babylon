import { System } from "ecsy";
import { Particle } from "../components/index";
export declare class ParticleSystem extends System {
    static queries: {
        particle: {
            components: (typeof Particle)[];
            listen: {
                added: boolean;
                changed: boolean;
                removed: boolean;
            };
        };
    };
    queries: any;
    execute(): void;
    private _updateParticle;
}
