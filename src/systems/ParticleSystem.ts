import * as BABYLON from "@babylonjs/core";
import { System, Entity } from "ecsy";
import { Particle, ParticleTypes } from "../components/index";
import { getActiveScene, disposeObject, xyzToVector3, updateTexture, hexToColor4 } from "../utils/index";

enum ParticleColorValues {
  textureMask = "textureMask"
}

enum ParticleXyzValues {
  emitter = "emitter",
  direction1 = "direction1",
  direction2 = "direction2"
}

export class ParticleSystem extends System {
  static queries = {
    particle: { components: [Particle], listen: { added: true, changed: true, removed: true } },
  };

  queries: any;

  execute() {
    this.queries.particle.added.forEach((entity: Entity) => {
      let particle = entity.getComponent(Particle) as Particle;
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

    this.queries.particle.changed.forEach((entity: Entity) => {
      this._updateParticle(entity.getComponent(Particle));
    });

    this.queries.particle.removed.forEach((entity: Entity) => {
      let particle = entity.getComponent(Particle) as Particle;
      particle.object.stop();
      disposeObject(particle);
    });
  }

  private _updateParticle(particle: Particle) {
    let particleObject = particle.object;
    Object.keys(particle).forEach(name => {
      if ((ParticleXyzValues as any)[name]) {
        (particleObject as any)[name] = xyzToVector3((particle as any)[name]);
      } else if ((ParticleColorValues as any)[name]) {
        (particleObject as any)[name] = hexToColor4((particle as any)[name]);
      } else if (name === "texture") {
        particle.texture && updateTexture(particle, particle.texture, this);
      } else {
        (particleObject as any)[name] = (particle as any)[name];
      }
    });
  }
}