import { XYZProperties } from "./types/index";
import { xyz } from "../utils/index";

/**
 * @example
 * ```
 * entity.addComponent(Transform);
 * ```
 */
export class Transform {
  /** @default 0,0,0 */
  position: XYZProperties = xyz();
  /** @default 0,0,0 */
  rotation: XYZProperties = xyz();
  /** @default 1,1,1 */
  scale: XYZProperties = xyz(1, 1, 1);
  /** 
   * Update Babylon.js object transformation (if existed) for all components in the entity. 
   * @default true
   */
  updateObjects: boolean = true;
}