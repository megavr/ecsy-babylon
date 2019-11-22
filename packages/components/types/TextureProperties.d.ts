import { TextureAttributes } from "./TextureAttributes";
/** Interface defined texture(s) of a Material component. */
export interface TextureProperties {
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#diffusetexture */
    diffuse?: TextureAttributes;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#speculartexture */
    specular?: TextureAttributes;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#emissivetexture */
    emissive?: TextureAttributes;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#ambienttexture */
    ambient?: TextureAttributes;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#bumptexture */
    bump?: TextureAttributes;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#lightmaptexture */
    lightmap?: TextureAttributes;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#opacitytexture */
    opacity?: TextureAttributes;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#reflectiontexture */
    reflection?: TextureAttributes;
    /** https://doc.babylonjs.com/api/classes/babylon.standardmaterial#refractiontexture */
    refraction?: TextureAttributes;
}
