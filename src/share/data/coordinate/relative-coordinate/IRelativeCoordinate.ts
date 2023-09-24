import { IAbsoluteCoordinate } from "../absolute-coordinate";
import { IChunkCoordinate } from "../chunk-coordinate";

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
  
  /**
   * Determine if this relative coordiante is equal to another IRelativeCoordinate.
   * 
   * @returns True if the coordinates are equal, false otherwise.
   */
  equals(other: IRelativeCoordinate): boolean;
}
