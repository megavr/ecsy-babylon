import * as BABYLON from "@babylonjs/core";
import { XYZProperties, ParticleTextureProperties, TextureComponent } from "./types/index";

export enum ParticleTypes {
  Point = "Point",
  Box = "Box",
  Sphere = "Sphere",
  DirectedSphere = "DirectedSphere",
  Hemisphere = "Hemisphere",
  Cylinder = "Cylinder",
  DirectedCylinder = "DirectedCylinder",
  Cone = "Cone"
}

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
export class Particle implements TextureComponent {
  sceneName?: string;
  object!: BABYLON.ParticleSystem;
  /** default: "Point" */
  type?: ParticleTypes = ParticleTypes.Point;
  /** default: 100 */
  capacity?: number = 100;
  /** https://doc.babylonjs.com/api/classes/babylon.particlesystem#emitter */
  emitter: XYZProperties = { x: 0, y: 0, z: 0 };
  texture?: ParticleTextureProperties;
  /** hex for Color4 value, e.g., #123abc00 */
  textureMask?: string;
  /** Point, Box, DirectedSphere, Cylinder */
  direction1: XYZProperties = { x: 0, y: 0, z: 0 };
  /** Point, Box, DirectedSphere, Cylinder; Default to emit at right-up-front 10 units. */
  direction2: XYZProperties = { x: 10, y: 10, z: 10 };
  /** Box */
  minEmitBox: XYZProperties = { x: 0, y: 0, z: 0 };
  /** Box */
  maxEmitBox: XYZProperties = { x: 0, y: 0, z: 0 };
  /** Sphere, DirectedSphere, Hemispheric, Cylinder, Cone */
  radius?: number;
  /** Hemispheric, Cylinder */
  radiusRange?: number;
  /** Cylinder */
  height?: number;
  /** Cone */
  angle?: number;
}