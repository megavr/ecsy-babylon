/**
 * Usage:
 * ```
 * entity.addComponent(Transform);
 * ```
 */
export class Transform {
    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    }
}
