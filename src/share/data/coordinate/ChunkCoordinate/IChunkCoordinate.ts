import { IAbsoluteCoordinate } from "../AbsoluteCoordinate";
import { IRelativeCoordinate } from "../RelativeCoordinate";

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
   * Get the relative coordinate of an absolute coordinate with
   * respect to this chunk.
   * 
   * @param absoluteCoordinate The absolute coordinate to convert.
   * @returns The relative coordinate of the absolute coordinate with
   * respect to this chunk, or undefined if the absolute coordinate is
   * not within this chunk.
   */
  getRelativeCoordinate(absoluteCoordinate: IAbsoluteCoordinate): IRelativeCoordinate | undefined;
}