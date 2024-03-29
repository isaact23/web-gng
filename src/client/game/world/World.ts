import { AssetManager } from "@client/assets";
import { ClusterManager, IClusterManager } from "@client/cluster";
import { User } from "@client/user";
import { Action } from "@share/action";
import { IClusterData } from "@share/data/cluster-data";
import * as Babylon from "babylonjs";
import {Vector3} from "babylonjs";

/**
 * Handler for all in-game logic. Only exists when the world is loaded.
 * Out-of-game logic handled in the wrapper class Game (i.e. the main menu)
 */
export class World {

  private _user: User;

  /**
   * Asynchronously load ingame elements.
   */
  static async load(scene: Babylon.Scene, assetManager: AssetManager, cluster: IClusterData, canvas: HTMLCanvasElement) {

    // Set up lighting
    const sun = new Babylon.DirectionalLight("sun", new Vector3(-1, -1, -1), scene);
    sun.intensity = 1.2;
    sun.position = new Vector3(100, 100, 100);
    const hemisphericLight = new Babylon.HemisphericLight(
      "ambience", new Vector3(-1, 1, -1), scene);
    hemisphericLight.intensity = 0.3;

    // Init shadow generator
    const shadowGenerator = new Babylon.ShadowGenerator(1024, sun);
    shadowGenerator.usePoissonSampling = true;

    // Initialize cluster client
    const clusterManager = new ClusterManager(cluster, shadowGenerator, assetManager);
    await clusterManager.remesh();

    return new World(clusterManager, scene, assetManager, canvas);
  }

  /**
   * Create new World. Must be called via static async load() factory function.
   */
  private constructor(
    private _clusterManager: IClusterManager,
    scene: Babylon.Scene,
    assetManager: AssetManager,
    canvas: HTMLCanvasElement
  ) {
    this._user = new User();
    this._user.spawnPlayer(assetManager, scene, canvas);
  }

  /**
   * Handle an Action if it applies to this World.
   */
  public processAction(action: Action) {
    this._clusterManager.processAction(action);
  }

  /**
   * Unload this world.
   */
  public unload() {
    this._clusterManager.dispose();
  }

  /**
   * Get the IClusterManager.
   * @returns This Game's IClusterManager instance.
   */
  public getCluster(): IClusterManager {
    return this._clusterManager;
  }
}