import { IClusterData } from "@share/cluster-data";
import { IChunkData } from "@share/cluster-data/chunk-data";
import { IAbsoluteCoordinate, IChunkCoordinate } from "@share/data/coordinate";
import { Block } from "@share/utility";

/**
 * Manage ClusterData on the client side.
 */
export interface IClusterClient extends IClusterData {

  /**
   * Get the chunk at a chunk coordinate.
   * @returns The chunk, or undefined if it doesn't exist.
   */
  getChunk(coord: IChunkCoordinate) : IChunkData | undefined;

  /**
   * Get the block at an absolute coordinate.
   * @returns The block, or undefined if it doesn't exist.
   */
  getBlock(coord: IAbsoluteCoordinate) : Block | undefined;

  /**
   * Add a new chunk. Replace any chunk in its spot.
   * @param chunk The chunk to add.
   */
  addChunk(chunk: IChunkData) : void;

  /**
   * Set a block at an absolute coordinate.
   * @param coord The absolute coordinate.
   * @param block The block to set.
   */
  setBlock(coord: IAbsoluteCoordinate, block: Block) : void;

  /**
   * Load or reload chunk meshes in the world.
   */
  remesh(): void;
}