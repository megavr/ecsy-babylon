export interface MeshOptions {
  // Box, Plane
  size?: number;
  // Box, Plane, Ground
  width?: number;
  height?: number;
  // Box
  depth?: number;
  // Sphere
  segments?: number;
  diameter?: number;
  diameterX?: number;
  diameterY?: number;
  diameterZ?: number;
  arc?: number;
  slice?: number;
  // Ground
  subdivisions?: number;
}