import * as BABYLON from "@babylonjs/core";
import { XYZProperties, ParticleTextureProperties, TextureComponent } from "./types/index";
export declare enum ParticleTypes {
    Point = "Point",
    Box = "Box",
    Sphere = "Sphere",
    DirectedSphere = "DirectedSphere",
    Hemisphere = "Hemisphere",
    Cylinder = "Cylinder",
    DirectedCylinder = "DirectedCylinder",
    Cone = "Cone"
}
export declare class Particle implements TextureComponent {
    sceneName?: string;
    object: BABYLON.ParticleSystem;
    type: ParticleTypes;
    capacity: number;
    emitter: XYZProperties;
    texture?: ParticleTextureProperties;
    textureMask?: string;
    direction1: XYZProperties;
    direction2: XYZProperties;
    minEmitBox: XYZProperties;
    maxEmitBox: XYZProperties;
    radius?: number;
    radiusRange?: number;
    height?: number;
    angle?: number;
}
