export var InputTypes;
(function (InputTypes) {
    InputTypes["VrRight"] = "VrRight";
    InputTypes["VrLeft"] = "VrLeft";
})(InputTypes || (InputTypes = {}));
/**
 * Usage:
 * ```
 * entity.addComponent(Input, { type:InputTypes.VrLeft, onPad: onPad, onPadValues: onPadValues });
 * function onPad(pressed, touched) {
 *   if (pressed) console.log("Pad is pressed.");
 *   if (touched) console.log("Pad is touched.");
 * }
 * function onPadValues(x, y) {
 *   console.log("Pad is touched on: " + x + ", " + y);
 * }
 * ```
 */
export class Input {
    constructor() {
        /** Default: "VrRight" */
        this.type = InputTypes.VrRight;
    }
}
