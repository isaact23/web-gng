import { IChunkCoordinate } from "@share/data/coordinate/chunk-coordinate";
import { IRelativeCoordinate } from "@share/data/coordinate/relative-coordinate";
import { Block } from "@share/utility";

/**
 * Store data for a single chunk, a cubic region of blocks.
 */
export interface IChunkData extends Iterable<[IRelativeCoordinate, Block]> {
  /**
   * Get the size (width, length, height) of a chunk in blocks.
   * @return The width of the chunk.
   */
  getSize(): number;

  /**
   * Get the block at a relative coordinate
   * @param coord The position of the block to access.
   * @returns The block.
   * @throws Error if the coordinate is not relative to this chunk.
   */
  getBlock(coord: IRelativeCoordinate): Block;

  /**
   * Set a block at a relative coordinate.
   * @param coord The coordiante to update.
   * @param block The block to set at the coordinate.
   */
  setBlock(coord: IRelativeCoordinate, block: Block): void;

  /**
   * Get the coordinate of this chunk.
   * @returns The coordinates of this chunk.
   */
  getCoordinate(): IChunkCoordinate;

  /**
   * Get iterator for relative coordinates of all non-air blocks in the chunk
   * @returns An iterator for blocks in the chunk.
   */
  [Symbol.iterator](): Iterator<[IRelativeCoordinate, Block], any, unknown>;
}
