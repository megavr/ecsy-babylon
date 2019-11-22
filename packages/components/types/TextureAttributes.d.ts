/**
 * Interface defined attribute(s) of a texture property.
 * https://doc.babylonjs.com/api/classes/babylon.texture
 */
export interface TextureAttributes {
    /** Path of a texture file. */
    url: string;
    /** https://doc.babylonjs.com/api/classes/babylon.texture#uoffset */
    uOffset: number;
    /** https://doc.babylonjs.com/api/classes/babylon.texture#voffset */
    vOffset: number;
    /** https://doc.babylonjs.com/api/classes/babylon.texture#uang */
    uAng: number;
    /** https://doc.babylonjs.com/api/classes/babylon.texture#vang */
    vAng: number;
    /** https://doc.babylonjs.com/api/classes/babylon.texture#uscale */
    uScale: number;
    /** https://doc.babylonjs.com/api/classes/babylon.texture#vscale */
    vScale: number;
}
