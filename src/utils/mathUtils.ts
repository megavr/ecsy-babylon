import { XYZProperties } from "../components/types/index";
/**
 * @hidden
 * Create object by XYZ values or create all zero object.
 * @param x value
 * @param y value
 * @param z value
 * @returns Object matches XYZProperties
 */
export function xyz(x?: number, y?: number, z?: number): XYZProperties {
  if (x && y && z) {
    return { x: x, y: y, z: z };
  } else {
    return { x: 0, y: 0, z: 0 };
  }
}
