
import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

import { GUIManager, IGUIManager } from "@client/gui";
import { IView } from "@client/view";

import { AssetManager, IAssetManager } from "@client/assets";
import { PlayerMotor } from "@client/movement";

import { IClusterData } from "@share/data/cluster-data";
import { ClientIncoming, ClientOutgoing } from "@client/socket";
import { Socket } from "socket.io-client";
import { Action } from "@share/action/Action";
import { ClientActionProcessor } from "@client/action/ClientActionProcessor";
import { LoadClusterAction } from "@share/action/cluster/LoadClusterAction";
import { UnloadClusterAction } from "@share/action/cluster/UnloadClusterAction";
import { IClusterManager } from "@client/cluster/IClusterManager";
import { ClusterManager } from "@client/cluster";

/**
 * The runner class for all game logic.
 */
export class Game {

  // Overhead
  private _engine: Babylon.Engine;
  private _scene: Babylon.Scene;

  // Networking
  private _outgoing: ClientOutgoing;
  private _actionProcessor: ClientActionProcessor;

  // Lighting
  private _sun: Babylon.DirectionalLight;
  private _hemisphericLight: Babylon.HemisphericLight;
  private _shadowGenerator: Babylon.ShadowGenerator | null = null;

  // Game elements
  private _clusterManager: IClusterManager | null = null;
  private _motor: PlayerMotor | null = null;
  private _gui: IGUIManager;
  private _assetManager: IAssetManager;

  /**
   * Create a new Game.
   * @param view The view to use for the game.
   * @param debugMode Show Babylon debug GUI.
   */
  constructor(
    private _view: IView,
    socket: Socket,
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

    // Init communications
    this._outgoing = new ClientOutgoing(socket);
    this._actionProcessor = new ClientActionProcessor(this, this._outgoing);
    new ClientIncoming(socket, this._actionProcessor);

    this._gui = new GUIManager();
    this._gui.mainMenuGui();
    //this.gui.gameGui();

    // Run engine render loop
    const fpsElement = _view.getFpsElement();
    const scene = this._scene;
    const engine = this._engine;
    this._engine.runRenderLoop(() => {
      if (this._motor !== null)
        scene.render();
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
  }

  /**
   * Process an Action to update the game state.
   */
  public processAction(action: Action) {
    
    // TODO: Move cluster loading/unloading inside ClusterManager
    if (action instanceof LoadClusterAction) {
      this.loadCluster(action.cluster);
    }
    else if (action instanceof UnloadClusterAction) {
      this.unloadCluster();
    }

    this._clusterManager?.processAction(action);
  }

  /**
   * Load a cluster from a ClusterData.
   */
  public loadCluster(cluster: IClusterData) {
    this.unloadCluster();

    // Initialize cluster client
    this._clusterManager = new ClusterManager(cluster, this._shadowGenerator, this._assetManager);
    this._clusterManager.remesh();

    // Create local player motor
    this._motor = new PlayerMotor(
      this._view.getCanvas(), this._engine, this._scene, this._actionProcessor, new Vector3(50, 70, -50), true);
  }

  /**
   * Remove the current cluster from the world.
   */
  public unloadCluster() {
    if (this._clusterManager !== null) {
      this._clusterManager.dispose();
      this._clusterManager = null;
    }
  }

  /**
   * Get the IClusterManager.
   * @returns This Game's IClusterManager instance.
   */
  public getCluster(): IClusterManager | null {
    return this._clusterManager;
  }

  /**
   * Initialize the Babylon scene before adding objects.
   */
  private _initScene(debugMode: boolean = false): Babylon.Scene {

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
  private _addEventListeners() {
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
