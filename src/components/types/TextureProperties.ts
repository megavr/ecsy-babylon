import { TextureAttributes } from "./TextureAttributes";

export interface TextureProperties {
  diffuse?: TextureAttributes;
  specular?: TextureAttributes;
  emissive?: TextureAttributes;
  ambient?: TextureAttributes;
  bump?: TextureAttributes;
  lightmap?: TextureAttributes;
  opacity?: TextureAttributes;
  reflection?: TextureAttributes;
  refraction?: TextureAttributes;
}