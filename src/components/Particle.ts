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

export class Particle implements TextureComponent {
  sceneName?: string;
  object!: BABYLON.ParticleSystem;
  type: ParticleTypes = ParticleTypes.Point;
  capacity: number = 100;
  emitter: XYZProperties = { x: 0, y: 0, z: 0 };
  texture?: ParticleTextureProperties;
  textureMask?: string;
  // Point, Box, DirectedSphere, Cylinder
  direction1: XYZProperties = { x: 0, y: 0, z: 0 };
  direction2: XYZProperties = { x: 0, y: 10, z: 10 };
  // Box
  minEmitBox!: XYZProperties;
  maxEmitBox!: XYZProperties;
  // Sphere, DirectedSphere, Hemispheric, Cylinder, Cone
  radius?: number;
  // Hemispheric, Cylinder
  radiusRange?: number;
  // Cylinder
  height?: number;
  // Cone
  angle?: number;
}