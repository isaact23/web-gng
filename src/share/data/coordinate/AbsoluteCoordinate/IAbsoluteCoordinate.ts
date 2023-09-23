import { IChunkCoordinate } from "../ChunkCoordinate";
import { IRelativeCoordinate } from "../RelativeCoordinate";

/**
 * Interface for absolute coordinate in world space,
 * not relative to any chunk.
 */
export interface IAbsoluteCoordinate {
  get x(): number;
  get y(): number;
  get z(): number;

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
   * Determine if this coordinate is equal to another IAbsoluteCoordiante.
   * 
   * @returns True if the coordinates are equal, false otherwise.
   */
  equals(other: IAbsoluteCoordinate): boolean;
}