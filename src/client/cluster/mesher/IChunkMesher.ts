import * as Babylon from "babylonjs";
import { IChunkData } from "@share/data/cluster-data/chunk-data";
import { IClusterData } from "@share/data/cluster-data";
import { IAssetManager } from "@client/assets";

/**
 * Interface for chunk mesh generators.
 */
export interface IChunkMesher {
  /**
   * Convert block data for a chunk from a cluster into a mesh.
   */
  generateChunkMesh(
    chunk: IChunkData,
    cluster: IClusterData,
    assetManager: IAssetManager
  ): Babylon.Mesh;
}
