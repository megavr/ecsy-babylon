export var InputTypes;
(function (InputTypes) {
    InputTypes["Keyboard"] = "Keyboard";
})(InputTypes || (InputTypes = {}));
/**
 * @example Keyboard
 * ```
 * entity.addComponent(Input, { onKey: onKey });
 * function onKey(key, down, up) {
 *   if (down) console.log(key + " is pressing.");
 * }
 * ```
 */
export class Input {
    constructor() {
        /** @default "Keyboard" */
        this.type = InputTypes.Keyboard;
    }
}
