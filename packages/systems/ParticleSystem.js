import * as BABYLON from "@babylonjs/core";
import { System } from "ecsy";
import { Particle, ParticleTypes } from "../components/index";
import { getActiveScene, disposeObject, xyzToVector3, updateTexture, hexToColor4 } from "../utils/index";
var ParticleColorValues;
(function (ParticleColorValues) {
    ParticleColorValues["textureMask"] = "textureMask";
})(ParticleColorValues || (ParticleColorValues = {}));
var ParticleXyzValues;
(function (ParticleXyzValues) {
    ParticleXyzValues["emitter"] = "emitter";
    ParticleXyzValues["direction1"] = "direction1";
    ParticleXyzValues["direction2"] = "direction2";
})(ParticleXyzValues || (ParticleXyzValues = {}));
export class ParticleSystem extends System {
    execute() {
        this.queries.particle.added.forEach((entity) => {
            let particle = entity.getComponent(Particle);
            particle.object = new BABYLON.ParticleSystem(particle.type, particle.capacity, getActiveScene(this, particle.sceneName));
            let particleObject = particle.object;
            switch (particle.type) {
                case ParticleTypes.Point:
                    particleObject.createPointEmitter(xyzToVector3(particle.direction1), xyzToVector3(particle.direction2));
                    break;
                case ParticleTypes.Box:
                    particleObject.createBoxEmitter(xyzToVector3(particle.direction1), xyzToVector3(particle.direction2), xyzToVector3(particle.minEmitBox), xyzToVector3(particle.maxEmitBox));
                    break;
                case ParticleTypes.Sphere:
                    particleObject.createSphereEmitter(particle.radius, particle.radiusRange);
                    break;
                case ParticleTypes.DirectedSphere:
                    particleObject.createDirectedSphereEmitter(particle.radius, xyzToVector3(particle.direction1), xyzToVector3(particle.direction2));
                    break;
                case ParticleTypes.Hemisphere:
                    particleObject.createHemisphericEmitter(particle.radius, particle.radiusRange);
                    break;
                case ParticleTypes.Cylinder:
                    particleObject.createCylinderEmitter(particle.radius, particle.height, particle.radiusRange, Math.random());
                    break;
                case ParticleTypes.DirectedCylinder:
                    particleObject.createDirectedCylinderEmitter(particle.radius, particle.height, particle.radiusRange, xyzToVector3(particle.direction1), xyzToVector3(particle.direction2));
                    break;
                case ParticleTypes.Cone:
                    particleObject.createConeEmitter(particle.radius, particle.angle);
                    break;
            }
            this._updateParticle(particle);
            particleObject.start();
        });
        this.queries.particle.changed.forEach((entity) => {
            this._updateParticle(entity.getComponent(Particle));
        });
        this.queries.particle.removed.forEach((entity) => {
            let particle = entity.getComponent(Particle);
            particle.object.stop();
            disposeObject(particle);
        });
    }
    _updateParticle(particle) {
        let particleObject = particle.object;
        Object.keys(particle).forEach(name => {
            if (ParticleXyzValues[name]) {
                particleObject[name] = xyzToVector3(particle[name]);
            }
            else if (ParticleColorValues[name]) {
                particleObject[name] = hexToColor4(particle[name]);
            }
            else if (name === "texture") {
                particle.texture && updateTexture(particle, particle.texture, this);
            }
            else {
                particleObject[name] = particle[name];
            }
        });
    }
}
ParticleSystem.queries = {
    particle: { components: [Particle], listen: { added: true, changed: true, removed: true } },
};
