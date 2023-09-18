import { Block } from "share/utility";
import { Mesh, Vector3 } from "babylonjs";
import { IClusterData } from "../IClusterData";

/**
 * Store data for a single chunk, a cubic region of blocks.
 */
export interface IChunkData {
  /**
   * Get the size (width, length, height) of a chunk in blocks.
   * @return The width of the chunk.
   */
  getSize(): number;

  /**
   * Get the block at an xyz coordinate
   * @param pos The position of the block to access.
   * @returns The block, or undefined if there is no block.
   */
  getBlock(pos: Vector3) : Block | undefined;

  /**
   * Set a block at an xyz coordinate.
   * @param pos The coordiante to update.
   * @param block The block to set at the coordinate.
   */
  setBlock(pos: Vector3, block: Block) : void;

  /**
   * Get the coordinate of this chunk.
   * @returns The coordinates of this chunk.
   */
  getCoordinate() : Vector3;

  /**
   * Get iterator for local-space positions of all non-air blocks in the chunk
   * @returns An iterator for blocks in the chunk.
   */
  getIterator() : Generator<[Vector3, Block]>;
}
