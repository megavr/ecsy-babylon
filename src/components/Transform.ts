import { XYZProperties } from "./types/index";

export class Transform {
  position: XYZProperties = { x: 0, y: 0, z: 0 };
  rotation: XYZProperties = { x: 0, y: 0, z: 0 };
  scale: XYZProperties = { x: 1, y: 1, z: 1 };
}