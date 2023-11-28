import * as Babylon from "babylonjs";

import { IChunkData } from "@share/data/cluster-data/chunk-data";
import { IChunkMesher } from ".";
import { IClusterData } from "@share/data/cluster-data";
import { IAssetManager } from "@client/assets";

/**
 * A chunk mesher implementation that combines redundant faces.
 */
export class GreedyChunkMesher implements IChunkMesher {
  /**
   * Convert block data for a chunk from a cluster into a mesh.
   */
  generateChunkMesh(
    chunk: IChunkData,
    cluster: IClusterData,
    assetManager: IAssetManager
  ): Babylon.Mesh {


    return Babylon.MeshBuilder.CreateSphere("yoy");
  }
}