import { Vector3 } from "babylonjs";
import { IAbsoluteCoordinate } from "../absolute-coordinate";
import { IChunkCoordinate } from "../chunk-coordinate";
import { ICoordinate } from "../ICoordinate";

/**
 * Interface for a relative coordinate, which stores the
 * position of a block relative to its chunk.
 */
export interface IRelativeCoordinate extends ICoordinate {
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

  /**
   * Add to this relative coordinate and return the result, or
   * undefined if the result is not within the chunk.
   */
  add(x: number, y: number, z: number): IRelativeCoordinate | undefined;

  /**
   * Get the Vector3 representation of this relative coordinate,
   * excluding the chunk coordinate.
   * 
   * @returns The Vector3 representation of this relative coordinate,
   * excluding the chunk coordinate.
   */
  vec(): Vector3;

  /**
   * Get a string representation of this relative coordinate.
   * @returns String representation of this relative coordinate.
   */
  toString(): string;
}
