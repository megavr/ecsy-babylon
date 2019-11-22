/** 
 * Interface defined properties of a Material component. 
 * https://doc.babylonjs.com/api/classes/babylon.standardmaterial
 */
export interface MaterialComponent {
  /** 
   * hex for Color3 value, e.g., #123abc 
   * https://doc.babylonjs.com/api/classes/babylon.standardmaterial#diffusecolor
   */
  diffuse?: string;
  /** 
   * hex for Color3 value, e.g., #123abc 
   * https://doc.babylonjs.com/api/classes/babylon.standardmaterial#specularcolor
   */
  specular?: string;
  /** 
   * hex for Color3 value, e.g., #123abc 
   * https://doc.babylonjs.com/api/classes/babylon.standardmaterial#emissivecolor
   */
  emissive?: string;
  /** 
   * hex for Color3 value, e.g., #123abc 
   * https://doc.babylonjs.com/api/classes/babylon.standardmaterial#ambientcolor
   */
  ambient?: string;
}