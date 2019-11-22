import { SceneComponent } from "./SceneComponent";
import { ObjectComponent } from "./ObjectComponent";
import { TextureProperties } from "./TextureProperties";
import { ParticleTextureProperties } from "./ParticleTextureProperties";

/** Interface defined texture of a component, which will also have sceneName and object property. */
export interface TextureComponent extends SceneComponent, ObjectComponent<any> {
  /** Texture properties to be manipulated. */
  texture?: TextureProperties | ParticleTextureProperties;
}