import { TextureAttributes } from "./TextureAttributes";

/** Interface defined texture(s) of a Particle component. */
export interface ParticleTextureProperties {
  /** https://doc.babylonjs.com/api/classes/babylon.particlesystem#particletexture */
  particle?: TextureAttributes;
  /** https://doc.babylonjs.com/api/classes/babylon.particlesystem#noisetexture */
  noise?: TextureAttributes;
}