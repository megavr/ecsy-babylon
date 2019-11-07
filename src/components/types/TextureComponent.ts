import { SceneComponent } from "./SceneComponent";
import { ObjectComponent } from "./ObjectComponent";
import { TextureProperties } from "./TextureProperties";
import { ParticleTextureProperties } from "./ParticleTextureProperties";

export interface TextureComponent extends SceneComponent, ObjectComponent {
  texture?: TextureProperties | ParticleTextureProperties;
}