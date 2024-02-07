// Code from https://www.babylonjs-playground.com/#3EDS3A#22

import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

import { GUIManager, IGUIManager } from "@client/gui";
import { ClusterClient, IClusterClient } from "@client/cluster";
import { IView } from "@client/view";

import { AssetManager, IAssetManager } from "@client/assets";
import { PlayerMotor, IPlayerMotor } from "@client/movement";

import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { ClusterEncoder } from "@share/data/cluster-data/ClusterEncoder";

/**
 * The runner class for all game logic.
 */
export class Game {

  // Overhead
  private _engine: Babylon.Engine;
  private _scene: Babylon.Scene;

  // Lighting
  private _sun: Babylon.DirectionalLight;
  private _hemisphericLight: Babylon.HemisphericLight;
  private _shadowGenerator: Babylon.ShadowGenerator | null = null;

  // Game elements
  private _cluster: IClusterClient;
  private _motor: IPlayerMotor;
  private _gui: IGUIManager;
  private _assetManager: IAssetManager | null = null;

  /**
   * Create a new Game.
   * @param view The view to use for the game.
   * @param debugMode Show Babylon debug GUI.
   */
  constructor(
    private _view: IView,
    clusterString: string,
    debugMode = false
  )
  {
    this._engine = new Babylon.Engine(_view.getCanvas(), debugMode);

    // Set up the scene
    this._scene = this._initScene(debugMode);
    this._addEventListeners();

    // Set up lighting
    this._sun = new Babylon.DirectionalLight("sun", new Vector3(-1, -1, -1), this._scene);
    this._sun.intensity = 1.2;
    this._sun.position = new Vector3(100, 100, 100);
    this._hemisphericLight = new Babylon.HemisphericLight(
      "ambience", new Vector3(-1, 1, -1), this._scene);
    this._hemisphericLight.intensity = 0.3;

    // Init asset manager
    this._assetManager = new AssetManager(this._scene);

    // Init shadow generator
    this._shadowGenerator = new Babylon.ShadowGenerator(1024, this._sun);
    this._shadowGenerator.usePoissonSampling = true;

    // Get world data from the server
    const clusterData = ClusterEncoder.decode(clusterString);

    this._cluster = new ClusterClient(clusterData, this._shadowGenerator, this._assetManager);
    this._cluster.remesh();

    // Create local player motor
    this._motor = new PlayerMotor(
      _view.getCanvas(), this._engine, this._scene, this._cluster, new Vector3(50, 70, -50), true);

    this._gui = new GUIManager();
    this._gui.mainMenuGui();
    //this.gui.gameGui();

    // Run engine render loop
    const fpsElement = _view.getFpsElement();
    const scene = this._scene;
    const engine = this._engine;
    this._engine.runRenderLoop(() => {
      scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
  }

  /**
   * Initialize the Babylon scene before adding objects.
   */
  _initScene(debugMode: boolean = false): Babylon.Scene {

    // Set up scene
    const scene = new Babylon.Scene(this._engine);
    if (debugMode) {
      scene.debugLayer.show();
    }

    scene.clearColor = new Babylon.Color4(0.5, 0.6, 0.7, 1);

    return scene;
  }

  /**
   * Add event listeners.
   */ 
  _addEventListeners() {
    const engine = this._engine;

    // Window resize listener
    window.addEventListener("resize", () => {
      engine.resize();
    });

    this._scene.onPointerDown = event => {
      this._engine.enterPointerlock();
    };
  }
}
