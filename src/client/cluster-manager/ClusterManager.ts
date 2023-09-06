import { IClusterManager } from "./IClusterManager";
import { IAssetManager } from "@client/assets";
import { IClusterData } from "@share/cluster/data";
import * as Babylon from "babylonjs";

export class ClusterManager implements IClusterManager {

  constructor(
    private clusterData: IClusterData,
    private readonly shadowGenerator: Babylon.ShadowGenerator,
    private readonly assetManager: IAssetManager,
  ) {
    
  }

  // Load or reload chunk meshes in the world.
  remesh(): void {
    let chunkIterator = this.clusterData.getIterator();
    for (let chunk of chunkIterator) {
      chunk.remesh();
    }
  }
}