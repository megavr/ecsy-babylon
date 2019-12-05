import * as BABYLON from "@babylonjs/core";
import { Entity, System } from "ecsy";
import { Camera } from "../components/index";
import { disposeObject, getWorld } from "../utils/index";

/** Core system of ecsy-babylon. */
export class GameSystem extends System {
  /** @hidden */
  static queries = {
    camera: { components: [Camera], listen: { added: true, removed: true } }
  };
  /** @hidden */
  queries: any;

  /** Babylon.js engine instance. */
  engine!: BABYLON.Engine;
  private _scenes: Map<String, BABYLON.Scene> = new Map<String, BABYLON.Scene>();
  private _assetManagers: Map<String, BABYLON.AssetsManager> = new Map<String, BABYLON.AssetsManager>();
  private _activeScene!: BABYLON.Scene;
  private _activeSceneName!: String;
  private _activeCameraEntity!: Entity;
  private _isRendering = false;

  /** Get name of active scene */
  get activeSceneName() { return this._activeSceneName; }

  /** Get active Camera Entity. */
  get activeCameraEntity() { return this._activeCameraEntity; }

  /** @hidden */
  init() { this._render = this._render.bind(this); }

  /** @hidden */
  execute() {
    this.queries.camera.added.forEach((entity: Entity) => {
      let camera = entity.getComponent(Camera);
      let scene = this.getScene(camera.sceneName);
      camera.object = new BABYLON.VRExperienceHelper(scene, camera.options);
      if (scene === this._activeScene) {
        this._activeCameraEntity = entity;
        this._isRendering = true;
      }
    });

    this.queries.camera.removed.forEach((entity: Entity) => {
      let camera = entity.getComponent(Camera);
      disposeObject(camera);
      let scene = this.getScene(camera.sceneName);
      scene === this._activeScene && (this._isRendering = false);
    });
  }

  /**
   * Start game system in the world can be used by other systems & components.
   * @see https://doc.babylonjs.com/api/classes/babylon.engine#constructor
   * @param canvas WebGL context to be used for rendering
   * @param antialias defines enable antialiasing (default: false)
   * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.engineoptions
   * @param adaptToDeviceRatio defines whether to adapt to the device's viewport characteristics (default: false)
   * @returns This GameSystem
   */
  public start(canvas: HTMLCanvasElement, antialias?: boolean, options?: BABYLON.EngineOptions, adaptToDeviceRatio?: boolean): GameSystem {
    this.engine = new BABYLON.Engine(canvas, antialias, options, adaptToDeviceRatio);
    this.engine.runRenderLoop(this._render);
    return this;
  }

  /**
   * Add a new scene with a name.
   * @see https://doc.babylonjs.com/api/classes/babylon.scene#constructor
   * @param sceneName Readable name to be used to switch or remove scene in the system
   * @param options @see https://doc.babylonjs.com/api/interfaces/babylon.sceneoptions
   * @returns This GameSystem
   */
  public addScene(sceneName: String, options?: BABYLON.SceneOptions): GameSystem {
    let scene = new BABYLON.Scene(this.engine, options);
    let assetManager = new BABYLON.AssetsManager(scene);
    assetManager.useDefaultLoadingScreen = false;
    this._scenes.set(sceneName, scene);
    this._assetManagers.set(sceneName, assetManager);
    if (this.engine.scenes.length === 1) {
      this._activeScene = scene;
      this._activeSceneName = sceneName;
    }
    return this;
  }

  /** Remove an inactive scene by given name */
  public removeScene(sceneName: String): GameSystem {
    sceneName !== this.activeSceneName && this.getScene(sceneName).dispose();
    return this;
  }

  /**
   * Switch to a scene by given scene name.
   * @param sceneName Name of scene
   * @param cameraEntity Default camera for the new scene 
   * @returns This GameSystem
   */
  public switchScene(sceneName: String, cameraEntity: Entity): GameSystem {
    if (this.getScene(sceneName)) {
      this._activeScene = this.getScene(sceneName);
      this._activeSceneName = sceneName;
      this._activeCameraEntity = cameraEntity;
    }
    return this;
  }

  /**
   * Get a scene by provided name.
   * @param sceneName Name of the scene
   * @returns Scene found in system or active scene if not available
   */
  public getScene(sceneName?: String): BABYLON.Scene {
    if (sceneName) {
      return this._scenes.get(sceneName) as BABYLON.Scene;
    } else {
      return this._activeScene;
    }
  }

  /**
   * Get a asset manager by provided scene name.
   * @param sceneName Name of the scene
   * @returns Asset manager found or asset manager in active scene 
   */
  public getAssetManager(sceneName?: String): BABYLON.AssetsManager {
    let name = this.activeSceneName;
    sceneName && (name = sceneName);
    return this._assetManagers.get(name)!;
  }

  private _render() {
    getWorld(this).execute(this.engine.getDeltaTime(), performance.now());
    (this._isRendering && getWorld(this).enabled) && this._activeScene.render();
  }
}