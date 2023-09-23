import { Block } from "share/utility";
import { IChunkData } from "./chunk-data/IChunkData";
import { Vector3 } from "babylonjs";
import { IChunkCoordinate } from "@share/data/coordinate/ChunkCoordinate";
import { IAbsoluteCoordinate } from "@share/data/coordinate/AbsoluteCoordinate";

/**
 * Manage multiple chunks, generating their meshes and loading them
 * into the Babylon scene.
 */
export interface IClusterData {
  /**
   * Add a new chunk. Replace any chunk in its spot.
   * @param chunk The chunk to add.
   */
  addChunk(chunk: IChunkData) : void;

  /**
   * Get the chunk at a coordinate.
   * @param coord The coordinate of the chunk to access.
   * @returns The chunk at the specified coordinate, or undefined if there is no chunk.
   */
  getChunk(coord: IChunkCoordinate) : IChunkData | undefined;

  /**
   * Get the block at an absolute coordinate.
   * @param coord The coordinate to access.
   * @returns The block at the coordinate, or undefined if there is no block.
   */
  getBlock(coord: IAbsoluteCoordinate) : Block | undefined;

  /**
   * Set a block at an absolute coordinate.
   * @param coord The coordinate to update.
   * @param block The block to set at the specified coordinate.
   */
  setBlock(coord: IAbsoluteCoordinate, block: Block) : void;

  /**
   * Get iterator for all chunks in the cluster.
   * @returns An iterator for all chunks in this cluster.
   */
  getIterator(): Generator<IChunkData>;
}
