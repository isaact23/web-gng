import { IAbsoluteCoordinate } from "../AbsoluteCoordinate";
import { IChunkCoordinate } from "../ChunkCoordinate";

/**
 * Interface for a relative coordinate, which stores the
 * position of a block relative to its chunk.
 * 
 * The x, y and z coordinates must be within 0 and the chunk size minus 1.
 * @throws {RangeError} If the x, y or z coordinate is not within 0 and the chunk size minus 1.
 */
export interface IRelativeCoordinate {
  get x(): number;
  get y(): number;
  get z(): number;
  get chunkCoordinate(): IChunkCoordinate;

  /**
   * Convert this relative coordinate to an absolute coordinate.
   * 
   * @returns The absolute coordinate of this relative coordinate.
   */
  getAbsoluteCoordinate(): IAbsoluteCoordinate;
}
