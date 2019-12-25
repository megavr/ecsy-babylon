import { xyz } from "../utils/mathUtils";
/**
 * @example
 * ```
 * entity.addComponent(Transform);
 * ```
 */
export class Transform {
    constructor() {
        /** @default 0,0,0 */
        this.position = xyz();
        /** @default 0,0,0 */
        this.rotation = xyz();
        /** @default 1,1,1 */
        this.scale = xyz(1, 1, 1);
    }
}
