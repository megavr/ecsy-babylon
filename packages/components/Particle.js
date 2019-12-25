import { xyz } from "../utils/mathUtils";
export var ParticleTypes;
(function (ParticleTypes) {
    ParticleTypes["Point"] = "Point";
    ParticleTypes["Box"] = "Box";
    ParticleTypes["Sphere"] = "Sphere";
    ParticleTypes["DirectedSphere"] = "DirectedSphere";
    ParticleTypes["Hemisphere"] = "Hemisphere";
    ParticleTypes["Cylinder"] = "Cylinder";
    ParticleTypes["DirectedCylinder"] = "DirectedCylinder";
    ParticleTypes["Cone"] = "Cone";
})(ParticleTypes || (ParticleTypes = {}));
/**
 * @example
 * ```
 * entity.addComponent(Particle, {
 *    sceneName: "Scene",
 *    emitter: { x: 0, y: 0, z: 1 },
 *    texture: {
 *      diffuse: { url: "PATH_TO_PARTICLE_TEXTURE" }
 *    }
 * });
 * ```
 */
export class Particle {
    constructor() {
        /** @default "Point" */
        this.type = ParticleTypes.Point;
        /**
         * @see https://doc.babylonjs.com/api/classes/babylon.particlesystem#constructor
         * @default 100
         */
        this.capacity = 100;
        /**
         * @see https://doc.babylonjs.com/api/classes/babylon.particlesystem#emitter
         * @default 0,0,0
         */
        this.emitter = xyz();
        /**
         * @memberof Point, Box, DirectedSphere, Cylinder
         * @default 0,0,0
         */
        this.direction1 = xyz();
        /**
         * @memberof Point, Box, DirectedSphere, Cylinder
         * @default 10,10,10
         */
        this.direction2 = xyz(10, 10, 10);
        /**
         * @memberof Box
         * @default 0,0,0
         */
        this.minEmitBox = xyz();
        /**
         * @memberof Box
         * @default 0,0,0
         */
        this.maxEmitBox = xyz();
    }
}
