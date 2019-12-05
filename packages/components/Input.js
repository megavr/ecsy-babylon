export var InputTypes;
(function (InputTypes) {
    InputTypes["Keyboard"] = "Keyboard";
    InputTypes["VrRight"] = "VrRight";
    InputTypes["VrLeft"] = "VrLeft";
})(InputTypes || (InputTypes = {}));
/**
 * @example VR
 * ```
 * entity.addComponent(Input, { type: InputTypes.VrLeft, onPad: onPad, onPadValues: onPadValues });
 * function onPad(pressed, touched, value) {
 *   if (pressed) console.log("Pad is pressed.");
 *   if (touched) console.log("Pad is touched.");
 * }
 * function onPadValues(x, y) {
 *   console.log("Pad is touched on: " + x + ", " + y);
 * }
 * ```
 * @example Keyboard
 * ```
 * entity.addComponent(Input, { type: InputTypes.Keyboard, onKey: onKey });
 * function onKey(key, down, up) {
 *   if (down) console.log(key + " is pressing.");
 * }
 * ```
 */
export class Input {
    constructor() {
        /** @default "VrRight" */
        this.type = InputTypes.VrRight;
    }
}
