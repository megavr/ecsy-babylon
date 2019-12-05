/**
 * Interface defined properties of a Material component.
 * @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial
 */
export interface MaterialComponent {
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial#diffusecolor
     * @example #123abc
     */
    diffuse?: string;
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial#specularcolor
     * @example #123abc
     */
    specular?: string;
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial#emissivecolor
     * @example #123abc
     */
    emissive?: string;
    /**
     * @see https://doc.babylonjs.com/api/classes/babylon.standardmaterial#ambientcolor
     * @example #123abc
     */
    ambient?: string;
}
