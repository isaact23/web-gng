import { ClusterManager, IClusterManager } from "@client/cluster";
import * as Babylon from "babylonjs";
import {Vector3} from "babylonjs";

/**
 * Handler for all in-game logic.
 */
export class World {

  // Lighting
  private _sun: Babylon.DirectionalLight;
  private _hemisphericLight: Babylon.HemisphericLight;
  private _shadowGenerator: Babylon.ShadowGenerator;

  private _clusterManager: IClusterManager;

  /**
   * Asynchronously load ingame elements.
   */
  static async load() {

    // Initialize cluster client
    this._clusterManager = new ClusterManager(cluster, this._shadowGenerator, this._assetManager);
    this._clusterManager.remesh();

    return new World();
  }

  /**
   * Create new World. Must be called via static async load() factory function.
   */
  private constructor() {

    // Set up lighting
    this._sun = new Babylon.DirectionalLight("sun", new Vector3(-1, -1, -1), this._scene);
    this._sun.intensity = 1.2;
    this._sun.position = new Vector3(100, 100, 100);
    this._hemisphericLight = new Babylon.HemisphericLight(
      "ambience", new Vector3(-1, 1, -1), this._scene);
    this._hemisphericLight.intensity = 0.3;

    // Init shadow generator
    this._shadowGenerator = new Babylon.ShadowGenerator(1024, this._sun);
    this._shadowGenerator.usePoissonSampling = true;

  }

  /**
   * Unload this world.
   */
  public dispose() {
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