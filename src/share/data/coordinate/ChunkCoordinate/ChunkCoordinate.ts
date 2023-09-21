import { IChunkCoordinate } from ".";
import { IAbsoluteCoordinate } from "../AbsoluteCoordinate";
import { IRelativeCoordinate } from "../RelativeCoordinate";

/**
 * Chunk coordinates. An increment of 1 shifts
 * to an adjacent chunk.
 */
export class ChunkCoordinate implements IChunkCoordinate {
  
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) { }

  /**
   * Get the absolute coordinate of the block at the origin of this chunk.
   * 
   * @returns The absolute coordinate of the block at the origin of this chunk.
   */
  getAbsoluteCoordinate(): IAbsoluteCoordinate {
    throw "Not implemented";
  }

  /**
   * Get the relative coordinate of an absolute coordinate with
   * respect to this chunk.
   * 
   * @param absoluteCoordinate The absolute coordinate to convert.
   * @returns The relative coordinate of the absolute coordinate with
   * respect to this chunk, or undefined if the absolute coordinate is
   * not within this chunk.
   */
  getRelativeCoordinate(absoluteCoordinate: IAbsoluteCoordinate): IRelativeCoordinate | undefined {
    throw "Not implemented";
  }
}