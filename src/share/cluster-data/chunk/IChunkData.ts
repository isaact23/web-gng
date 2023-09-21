import { IAbsoluteCoordinate } from "@share/data/coordinate/AbsoluteCoordinate";
import { IChunkCoordinate } from "@share/data/coordinate/ChunkCoordinate";
import { IRelativeCoordinate } from "@share/data/coordinate/RelativeCoordinate";
import { Block } from "@share/utility";
import { Vector3 } from "babylonjs";

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
   * Get the block at an absolute coordinate
   * @param coord The position of the block to access.
   * @returns The block.
   */
  getBlock(coord: IAbsoluteCoordinate): Block;

  /**
   * Set a block at an absolute coordinate.
   * @param coord The coordiante to update.
   * @param block The block to set at the coordinate.
   */
  setBlock(coord: IAbsoluteCoordinate, block: Block): void;

  /**
   * Get the coordinate of this chunk.
   * @returns The coordinates of this chunk.
   */
  getCoordinate(): IChunkCoordinate;

  /**
   * Get iterator for relative coordinates of all non-air blocks in the chunk
   * @returns An iterator for blocks in the chunk.
   */
  getIterator(): Generator<[IRelativeCoordinate, Block]>;
}
