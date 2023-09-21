import { IRelativeCoordinate } from ".";
import { IAbsoluteCoordinate } from "../AbsoluteCoordinate";
import { IChunkCoordinate } from "../ChunkCoordinate";

/**
 * A relative coordinate, which stores the
 * position of a block relative to its chunk.
 */
export class RelativeCoordinate implements IRelativeCoordinate {
  
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number,
    public readonly chunkCoordinate: IChunkCoordinate
  ) {}

  /**
   * Convert this relative coordinate to an absolute coordinate.
   * 
   * @returns The absolute coordinate of this relative coordinate.
   */
  getAbsoluteCoordinate(): IAbsoluteCoordinate {
    throw "Not implemented";
  }
}