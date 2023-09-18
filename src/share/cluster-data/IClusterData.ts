import { Block } from "share/utility";
import { IChunkData } from "./chunk/IChunkData";
import { Vector3 } from "babylonjs";

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
   * @param pos The coordinate of the chunk to access.
   * @returns The chunk at the specified coordinate.
   */
  getChunk(pos: Vector3) : IChunkData | undefined;

  /**
   * Get the block at an xyz coordinate.
   * @param pos The coordinate to access.
   * @returns The block at the coordinate, or undefined if there is no block.
   */
  getBlock(pos: Vector3) : Block | undefined;

  /**
   * Set a block at an xyz coordinate.
   * @param pos The coordinate to update.
   * @param block The block to set at the specified coordinate.
   */
  setBlock(pos: Vector3, block: Block) : void;

  /**
   * Get iterator for all chunks in the cluster.
   * @returns An iterator for all chunks in this cluster.
   */
  getIterator(): Generator<IChunkData>;
  
  /**
   * Get chunk size.
   * @returns The chunk width in blocks.
   */
  getChunkSize(): number;
}
