import { TextureProperties } from "./TextureProerties";

export interface TextureComponent extends Object {
  diffuse?: TextureProperties;
  specular?: TextureProperties;
  emissive?: TextureProperties;
  ambient?: TextureProperties;
  bump?: TextureProperties;
  lightmap?: TextureProperties;
  opacity?: TextureProperties;
  reflection?: TextureProperties;
  refraction?: TextureProperties;
}