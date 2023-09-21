import { IAbsoluteCoordinate } from "../AbsoluteCoordinate";

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
}