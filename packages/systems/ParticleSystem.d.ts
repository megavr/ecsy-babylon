import { System } from "ecsy";
import { Particle } from "../components/index";
/** System for Particle component */
export declare class ParticleSystem extends System {
    /** @hidden */
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
    /** @hidden */
    queries: any;
    /** @hidden */
    execute(): void;
    private _updateParticle;
}
