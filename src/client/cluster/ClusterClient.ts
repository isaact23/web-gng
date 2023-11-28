import { IClusterClient } from ".";
import { IAssetManager } from "@client/assets";
import { Settings } from "@share/config/Settings";
import { IClusterData } from "@share/data/cluster-data";
import { ChunkData, IChunkData } from "@share/data/cluster-data/chunk-data";
import { IAbsoluteCoordinate, IChunkCoordinate } from "@share/data/coordinate";
import { ChunkGrid, IChunkGrid } from "@share/data/grid/chunk-grid";
import { Face, Block } from "@share/utility";

import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";
import { ChunkMesher, IChunkMesher } from "./mesher";
import { GreedyChunkMesher } from "./mesher/GreedyChunkMesher";

/**
 * Manage ClusterData on the client side.
 */
export class ClusterClient implements IClusterClient {

  /**
   * Remember which chunks need to be re-meshed.
   */
  private dirtyChunks: IChunkGrid<boolean> = new ChunkGrid<boolean>;

  /**
   * Store chunk meshes.
   */
  private chunkMeshes: IChunkGrid<Babylon.Mesh> = new ChunkGrid<Babylon.Mesh>;

  /**
   * Store chunk mesher algorithm.
   */
  private chunkMeshGen: IChunkMesher;
    
  constructor(
    private clusterData: IClusterData,
    private readonly shadowGenerator: Babylon.ShadowGenerator | null,
    private readonly assetManager: IAssetManager,
  ) {

    // Initialize all chunks as needing update
    for (let [coord, chunk] of clusterData) {
      this.dirtyChunks.set(coord, true);
    }

    this.chunkMeshGen = new ChunkMesher();
  }

  /**
   * Get the chunk at a chunk coordinate.
   * @returns The chunk, or undefined if it doesn't exist.
   */
  getChunk(coord: IChunkCoordinate) : IChunkData | undefined {
    return this.clusterData.getChunk(coord);
  }

  /**
   * Get the block at an absolute coordinate.
   * @returns The block, or undefined if it doesn't exist.
   */
  getBlock(coord: IAbsoluteCoordinate) : Block | undefined {
    return this.clusterData.getBlock(coord);
  }

  /**
   * Add a new chunk. Replace any chunk in its spot.
   * @param chunk The chunk to add.
   */
  addChunk(chunk: IChunkData) : void {
    this.clusterData.addChunk(chunk);

    // Flag chunk for update
    const c = chunk.getCoordinate();
    this.dirtyChunks.set(c, true);
  }

  /**
   * Set a block at an absolute coordinate.
   * @param coord The absolute coordinate.
   * @param block The block to set.
   */
  setBlock(coord: IAbsoluteCoordinate, block: Block) : void {
    this.clusterData.setBlock(coord, block);

    // Flag this chunk for update
    const chunkCoord = coord.getChunkCoordinate();
    this.dirtyChunks.set(chunkCoord, true);

    // Flag adjacent chunks for update
    const chunkSize = Settings.CHUNK_SIZE;
    const flagAdj = (offset: Vector3) => {
      this.dirtyChunks.set(chunkCoord.addScalars(offset.x, offset.y, offset.z), true);
    }

    const relCoord = coord.getRelativeCoordinate();
    if (block == Block.Air) {
      if (relCoord.x == 0)               flagAdj(Vector3.Left());
      if (relCoord.y == 0)               flagAdj(Vector3.Down());
      if (relCoord.z == 0)               flagAdj(Vector3.Backward());
      if (relCoord.x == chunkSize - 1)   flagAdj(Vector3.Right());
      if (relCoord.y == chunkSize - 1)   flagAdj(Vector3.Up());
      if (relCoord.z == chunkSize - 1)   flagAdj(Vector3.Forward());
    }
  }

  /**
   * Get iterator for all chunks in the world.
   * @returns An iterator for all chunks in this world
   * with respective chunk coordinates.
   */
  [Symbol.iterator](): Iterator<[IChunkCoordinate, IChunkData]> {
    return this.clusterData[Symbol.iterator]();
  }

  /**
   * Load or reload chunk meshes in the world.
   */
  remesh(): void {
    const shadowMap = this.shadowGenerator?.getShadowMap();
    
    // Iterate through each chunk
    for (let [coord, chunk] of this) {

      // Check if each chunk needs to be updated
      if (this.dirtyChunks.get(coord)) {
        
        // Replace mesh
        const oldMesh = this.chunkMeshes.get(coord);
        const newMesh = this.chunkMeshGen.generateChunkMesh(chunk, this.clusterData, this.assetManager);

        shadowMap?.renderList?.push(newMesh);
        if (oldMesh != undefined) {
          oldMesh.dispose();
        }
        this.chunkMeshes.set(coord, newMesh);
        this.dirtyChunks.set(coord, false);
      }
    }
  }
}
