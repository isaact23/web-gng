import { Vector3 } from "babylonjs";
import { IChunkCoordinate } from "../chunk-coordinate";
import { IRelativeCoordinate } from "../relative-coordinate";
import { ICoordinate } from "../ICoordinate";

/**
 * Interface for absolute coordinate in world space,
 * not relative to any chunk.
 */
export interface IAbsoluteCoordinate extends ICoordinate {

  /**
   * Get the chunk coordinate of the chunk that contains this absolute coordinate.
   * 
   * @returns The chunk coordinate of the chunk that contains this absolute coordinate.
   */
  getChunkCoordinate(): IChunkCoordinate;

  /**
   * Get the relative coordinate of this absolute coordinate within its chunk.
   * 
   * @returns The relative coordinate of this absolute coordinate within its chunk.
   */
  getRelativeCoordinate(): IRelativeCoordinate;

  /**
   * Add this coordinate to another coordinate and return the result.
   * 
   * @param other The other coordinate to add to this coordinate.
   * @return The sum of this coordinate and the other coordinate.
   */
  add(other: IAbsoluteCoordinate): IAbsoluteCoordinate;

  /**
   * Add three scalars to this coordinate and return the result.
   * 
   * @param x The x scalar to add to this coordinate.
   * @param y The y scalar to add to this coordinate.
   * @param z The z scalar to add to this coordinate.
   * @return The sum of this coordinate and the three scalars.
   */
  addScalars(x: number, y: number, z: number): IAbsoluteCoordinate;

  /**
   * Determine if this coordinate is equal to another IAbsoluteCoordiante.
   * 
   * @returns True if the coordinates are equal, false otherwise.
   */
  equals(other: IAbsoluteCoordinate): boolean;

  /**
   * Multiply this coordinate by a scalar value and return the result.
   * 
   * @returns The product of this coordinate and the scalar value.
   */
  multiply(scalar: number): IAbsoluteCoordinate;

  /**
   * Get the Vector3 representation of this absolute coordinate.
   * 
   * @returns The Vector3 representation of this absolute coordinate.
   */
  vec(): Vector3;

  /**
   * Get a string representation of this absolute coordinate.
   * @returns String representation of this absolute coordinate.
   */
  toString(): string;
}