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
export declare class Particle implements TextureComponent {
    sceneName?: string;
    object: BABYLON.ParticleSystem;
    /** default: "Point" */
    type?: ParticleTypes;
    /** default: 100 */
    capacity?: number;
    /** https://doc.babylonjs.com/api/classes/babylon.particlesystem#emitter */
    emitter: XYZProperties;
    texture?: ParticleTextureProperties;
    /** hex for Color4 value, e.g., #123abc00 */
    textureMask?: string;
    /** Point, Box, DirectedSphere, Cylinder */
    direction1: XYZProperties;
    /** Point, Box, DirectedSphere, Cylinder */
    direction2: XYZProperties;
    /** Box */
    minEmitBox: XYZProperties;
    /** Box */
    maxEmitBox: XYZProperties;
    /** Sphere, DirectedSphere, Hemispheric, Cylinder, Cone */
    radius?: number;
    /** Hemispheric, Cylinder */
    radiusRange?: number;
    /** Cylinder */
    height?: number;
    /** Cone */
    angle?: number;
}
