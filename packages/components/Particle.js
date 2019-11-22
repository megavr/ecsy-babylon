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
 * Usage:
 * ```
 * entity.addComponent(Particle, {
 *   emitter: { x: 0, y: 0, z: 1 },
 *   texture: {
 *     diffuse: { url: "PATH_TO_PARTICLE_TEXTURE" }
 *   }
 * });
 * ```
 */
export class Particle {
    constructor() {
        /** https://doc.babylonjs.com/api/classes/babylon.particlesystem#emitter */
        this.emitter = { x: 0, y: 0, z: 0 };
        /** Point, Box, DirectedSphere, Cylinder */
        this.direction1 = { x: 0, y: 0, z: 0 };
        /** Point, Box, DirectedSphere, Cylinder */
        this.direction2 = { x: 0, y: 10, z: 10 };
        /** Box */
        this.minEmitBox = { x: 0, y: 0, z: 0 };
        /** Box */
        this.maxEmitBox = { x: 0, y: 0, z: 0 };
    }
}
