import { XYZProperties } from "./types/index";
/**
 * @example
 * ```
 * entity.addComponent(Transform);
 * ```
 */
export declare class Transform {
    /** @default 0,0,0 */
    position: XYZProperties;
    /** @default 0,0,0 */
    rotation: XYZProperties;
    /** @default 1,1,1 */
    scale: XYZProperties;
}
