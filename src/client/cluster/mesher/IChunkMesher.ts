import { AssetManager } from "@client/assets";
import { IClusterData } from "@share/data/cluster-data";
import { IChunkData } from "@share/data/cluster-data/chunk-data";
import * as Babylon from "babylonjs";

export interface IChunkMesher {

  /**
   * Convert block data for a chunk from a cluster into a mesh.
   */
  generateChunkMesh(
    chunk: IChunkData,
    cluster: IClusterData,
    assetManager: AssetManager
  ): Babylon.Mesh;
}