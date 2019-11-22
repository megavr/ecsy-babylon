/**
 * Interface defined options of a Mesh component. 
 * https://doc.babylonjs.com/api/classes/babylon.meshbuilder 
 */
export interface MeshOptions {
  /** Box, Plane */
  size?: number;
  /** Box, Plane, Ground */
  width?: number;
  /** Box, Plane, Ground */
  height?: number;
  /** Box */
  depth?: number;
  /** Sphere */
  segments?: number;
  /** Sphere */
  diameter?: number;
  /** Sphere */
  diameterX?: number;
  /** Sphere */
  diameterY?: number;
  /** Sphere */
  diameterZ?: number;
  /** Sphere */
  arc?: number;
  /** Sphere */
  slice?: number;
  /** Ground */
  subdivisions?: number;
}