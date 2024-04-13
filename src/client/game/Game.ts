import * as Babylon from "@babylonjs/core";
import "@babylonjs/inspector";

import { Socket } from "socket.io-client";

import { GUIManager, IGUIManager } from "@client/gui";
import { IView } from "@client/view";
import { AssetManager } from "@client/assets";
import { IClusterData } from "@share/data/cluster-data";
import { ClientIncoming, ClientOutgoing } from "@client/socket";
import { Action } from "@share/action/Action";
import { ClientActionProcessor } from "@client/action/ClientActionProcessor";
import { LoadClusterAction } from "@share/action/cluster/LoadClusterAction";
import { UnloadClusterAction } from "@share/action/cluster/UnloadClusterAction";
import { User } from "@client/user/User";
import { World } from "./world";
import { UserActionProcessor } from "@client/action/UserActionProcessor";

/**
 * The runner class for the Babylon game. Contains logic
 * for the GUIs as well as the ingame play.
 */
export class Game {

  // Overhead
  private _engine: Babylon.Engine;
  private _scene: Babylon.Scene;

  // Networking and Actions
  private _outgoing: ClientOutgoing;
  private _actionProcessor: ClientActionProcessor;
  private _userAP: UserActionProcessor;

  // User -> Player -> Avatar
  private _user: User | null = null; // Main user
  // Add other users

  // Game elements
  private _gui: IGUIManager;
  private _assetManager: AssetManager;

  // Handle in-world component
  private _world: World | null = null;

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

    // Init asset manager
    this._assetManager = new AssetManager(this._scene);

    // Init communications
    this._outgoing = new ClientOutgoing(socket);
    this._actionProcessor = new ClientActionProcessor(this, this._outgoing);
    new ClientIncoming(socket, this._actionProcessor);
    this._userAP = new UserActionProcessor(this._actionProcessor);

    this._gui = new GUIManager();
    this._gui.mainMenuGui();
    //this._gui.gameGui();

    // Run engine render loop
    const fpsElement = _view.getFpsElement();
    const scene = this._scene;
    const engine = this._engine;
    this._engine.runRenderLoop(() => {
      if (this._world != null) {
        scene.render();
      }
      fpsElement.innerHTML = engine.getFps().toFixed();
    });
  }

  /**
   * Process an Action to update the game state.
   */
  public processAction(action: Action) {
    console.log("Game received action");
    
    if (action instanceof LoadClusterAction) {
      this._loadCluster(action.cluster);
    }
    else if (action instanceof UnloadClusterAction) {
      this._unloadCluster();
    }

    this._world?.processAction(action);
  }

  // Getters
  public getEngine()       { return this._engine; }
  public getAssetManager() { return this._assetManager; }
  public getScene()        { return this._scene; }
  public getView()         { return this._view; }
  public getUserAP()       { return this._userAP; }

  /**
   * Load a cluster (creates the world)
   */
  private async _loadCluster(cluster: IClusterData) {
    this._world?.unload();
    console.log("Loading world");
    this._world = await World.load(this, cluster);
    console.log("Done loading world");
  }

  /**
   * Unload the cluster (removes the world)
   */
  private _unloadCluster() {
    this._world?.unload();
    this._world = null;
  }

  /**
   * Initialize the Babylon scene before adding objects.
   */
  private _initScene(debugMode: boolean = false): Babylon.Scene {

    // Set up scene
    const scene = new Babylon.Scene(this._engine);
    if (debugMode) {
      console.log("Entering debug mode");
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
