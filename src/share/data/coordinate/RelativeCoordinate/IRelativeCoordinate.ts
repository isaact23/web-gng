import { IAbsoluteCoordinate } from "../AbsoluteCoordinate";
import { IChunkCoordinate } from "../ChunkCoordinate";

/**
 * Interface for a relative coordinate, which stores the
 * position of a block relative to its chunk.
 */
export interface IRelativeCoordinate {

  /**
   * Convert this relative coordinate to an absolute coordinate.
   * 
   * @returns The absolute coordinate of this relative coordinate.
   */
  getAbsoluteCoordinate(): IAbsoluteCoordinate;

  /**
   * Get the chunk coordinate that contains this relative coordinate.
   * 
   * @returns The chunk coordinate that contains this relative coordinate.
   */
  getChunkCoordinate(): IChunkCoordinate;
}
