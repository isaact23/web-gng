import { Vector3 } from "babylonjs";
import { IAbsoluteCoordinate } from "../absolute-coordinate";

/**
 * Interface for chunk coordinates. An increment of 1 shifts
 * to an adjacent chunk.
 */
export interface IChunkCoordinate {
  get x(): number;
  get y(): number;
  get z(): number;

  /**
   * Get the absolute coordinate of the block at the origin of this chunk.
   * 
   * @returns The absolute coordinate of the block at the origin of this chunk.
   */
  getAbsoluteCoordinate(): IAbsoluteCoordinate;

  /**
   * Add this chunk coordinate to another chunk coordinate and return the result.
   * 
   * @param other The other chunk coordinate to add to this chunk coordinate.
   * @return The sum of this chunk coordinate and the other chunk coordinate.
   */
  add(other: IChunkCoordinate): IChunkCoordinate;

  /**
   * Determine if this coordinate is equal to another IChunkCoordinate.
   * 
   * @returns True if the coordinates are equal, false otherwise.
   */
  equals(other: IChunkCoordinate): boolean;

  /**
   * Multiply this coordinate by a scalar value and return the result.
   * 
   * @returns The product of this coordinate and the scalar value.
   */
  multiply(scalar: number): IChunkCoordinate;

  /**
   * Get the Vector3 representation of this chunk coordinate.
   * 
   * @returns The Vector3 representation of this chunk coordinate.
   */
  vec(): Vector3;
}