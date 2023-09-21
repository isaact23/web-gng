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
}