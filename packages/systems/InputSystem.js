import { System } from "ecsy";
import { Input, InputTypes, Transform, Camera } from "../components/index";
import { getCamera, getObjectComponentsInEntity, vector3ToXyz, vector3ToXyzDegree, xyzToVector3 } from "../utils/index";
/** @hidden */
var VRStateButtons;
(function (VRStateButtons) {
    VRStateButtons["onMainButton"] = "onMainButton";
    VRStateButtons["onPad"] = "onPad";
    VRStateButtons["onSecondaryButton"] = "onSecondaryButton";
    VRStateButtons["onTrigger"] = "onTrigger";
})(VRStateButtons || (VRStateButtons = {}));
/** @hidden */
var VRValueButtons;
(function (VRValueButtons) {
    VRValueButtons["onPadValues"] = "onPadValues";
})(VRValueButtons || (VRValueButtons = {}));
/** System for Input component */
export class InputSystem extends System {
    constructor() {
        super(...arguments);
        this._isControllerConntected = false;
    }
    /** @hidden */
    execute() {
        this.queries.input.added.forEach((entity) => {
            let input = entity.getComponent(Input);
            switch (input.type) {
                case InputTypes.Keyboard:
                    if (input.onKey) {
                        window.addEventListener("keydown", event => input.onKey.call(input, event.key, true, false));
                        window.addEventListener("keyup", event => input.onKey.call(input, event.key, false, true));
                    }
                    break;
                default:
                    entity.hasComponent(Transform) && (entity.getMutableComponent(Transform).updateObjects = false);
                    break;
            }
        });
        this.queries.input.results.forEach((entity) => {
            let controllers = getCamera(this).getComponent(Camera).object.webVRCamera.controllers;
            let input = entity.getMutableComponent(Input);
            if (controllers.length > 0) {
                this._isControllerConntected ?
                    this._updateObjectsTransform(entity, input.object, entity.getMutableComponent(Transform)) :
                    this._initVRController(input, controllers);
            }
        });
    }
    _initVRController(input, controllers) {
        input.type === InputTypes.VrLeft ?
            input.object = this._getVRController(controllers, "left") :
            input.object = this._getVRController(controllers, "right");
        this._bindControllerBehaviours(input);
        this._isControllerConntected = true;
    }
    _getVRController(controllers, hand) {
        return controllers.find((controller) => { return controller.hand === hand; });
    }
    _bindControllerBehaviours(input) {
        for (let prop in input) {
            if (input[prop]) {
                prop in VRStateButtons && input.object[`${prop}StateChangedObservable`].add(data => {
                    input[prop].call(input, data.pressed, data.touched, data.value);
                });
                prop in VRValueButtons && input.object[`${prop}ChangedObservable`].add(data => {
                    input[prop].call(input, data.x, data.y);
                });
            }
        }
    }
    _updateObjectsTransform(entity, controller, transform) {
        transform && getObjectComponentsInEntity(entity)
            .filter(component => { return !(component instanceof Input); })
            .forEach(component => {
            let pos = controller.devicePosition;
            let rot = controller.deviceRotationQuaternion.toEulerAngles();
            let object = component.object;
            object.position && (object.position = pos);
            object.rotation && (object.rotation = rot);
            object.scaling && (object.scaling = xyzToVector3(transform.scale));
            transform.position = vector3ToXyz(pos);
            transform.rotation = vector3ToXyzDegree(rot);
        });
    }
}
/** @hidden */
InputSystem.queries = {
    input: { components: [Input], listen: { added: true } },
};
