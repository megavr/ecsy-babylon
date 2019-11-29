import * as BABYLON from "@babylonjs/core";

export enum InputTypes {
  VrRight = "VrRight",
  VrLeft = "VrLeft"
}
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
  object!: BABYLON.WebVRController;
  /** Default: "VrRight" */
  type?: InputTypes = InputTypes.VrRight;
  /** https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#onmainbuttonstatechangedobservable */
  onMainButton?: PressTouchValueInput;
  /** https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#onpadstatechangedobservable */
  onPad?: PressTouchValueInput;
  /** https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#onpadvalueschangedobservable */
  onPadValues?: ValueInput;
  /** https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#onsecondarybuttonstatechangedobservable */
  onSecondaryButton?: PressTouchValueInput;
  /** https://doc.babylonjs.com/api/classes/babylon.webvrcontroller#ontriggerstatechangedobservable */
  onTrigger?: PressTouchValueInput;
}

interface PressTouchValueInput {
  (pressed: boolean, touched: boolean, value: number): void;
}

interface ValueInput {
  (x: number, y: number): void;
}