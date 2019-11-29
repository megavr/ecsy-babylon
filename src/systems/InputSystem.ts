import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Input, InputTypes, Transform } from "../components/index";
import { getCamera, getEntityObjectComponents, vector3ToXyz, vector3ToXyzDegree, xyzToVector3 } from "../utils/index";

/** @hidden */
enum VRStateButtons {
  onMainButton = "onMainButton",
  onPad = "onPad",
  onSecondaryButton = "onSecondaryButton",
  onTrigger = "onTrigger"
}

/** @hidden */
enum VRValueButtons {
  onPadValues = "onPadValues"
}

/** System for Input component */
export class InputSystem extends System {
  /** @hidden */
  static queries = {
    input: { components: [Input], listen: { added: true } },
  };
  /** @hidden */
  queries: any;
  private _isControllerConntected: boolean = false;


  /** @hidden */
  execute() {
    this.queries.input.added.forEach((entity: Entity) => {
      let transform = entity.getMutableComponent(Transform);
      (transform && (entity.getComponent(Input).type as string).startsWith("Vr")) && (transform.updateObjects = false);
    });

    this.queries.input.results.forEach((entity: Entity) => {
      let controllers = getCamera(this).object.webVRCamera.controllers;
      let input = entity.getMutableComponent(Input);
      if (controllers.length > 0) {
        this._isControllerConntected ?
          this._updateObjectsTransform(entity, input.object, entity.getMutableComponent(Transform)) :
          this._initVRController(input, controllers);
      }
    });
  }

  private _initVRController(input: Input, controllers: Array<BABYLON.WebVRController>) {
    input.type === InputTypes.VrLeft ?
      input.object = this._getVRController(controllers, "left") :
      input.object = this._getVRController(controllers, "right");
    this._bindControllerBehaviours(input);
    this._isControllerConntected = true;
  }

  private _getVRController(controllers: Array<BABYLON.WebVRController>, hand: "right" | "left"): BABYLON.WebVRController {
    return controllers.find((controller: BABYLON.WebVRController) => { return controller.hand === hand; }) as BABYLON.WebVRController;
  }

  private _bindControllerBehaviours(input: Input) {
    Object.keys(input).filter(name => { return name in VRStateButtons; }).forEach(name => {
      (input as any)[name] && ((input.object as any)[`${name}StateChangedObservable`] as BABYLON.Observable<BABYLON.ExtendedGamepadButton>).add(data => {
        (input as any)[name].call(input, data.pressed, data.touched, data.value);
      });
    });
    Object.keys(input).filter(name => { return name in VRValueButtons; }).forEach(name => {
      (input as any)[name] && ((input.object as any)[`${name}ChangedObservable`] as BABYLON.Observable<BABYLON.StickValues>).add(data => {
        (input as any)[name].call(input, data.x, data.y);
      })
    });
  }

  private _updateObjectsTransform(entity: Entity, controller: BABYLON.WebVRController, transform: Transform) {
    transform && getEntityObjectComponents(entity)
      .filter(component => { return !(component instanceof Input) })
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