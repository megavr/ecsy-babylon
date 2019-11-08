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
export class Particle {
    constructor() {
        this.type = ParticleTypes.Point;
        this.capacity = 100;
        this.emitter = { x: 0, y: 0, z: 0 };
        // Point, Box, DirectedSphere, Cylinder
        this.direction1 = { x: 0, y: 0, z: 0 };
        this.direction2 = { x: 0, y: 10, z: 10 };
    }
}
