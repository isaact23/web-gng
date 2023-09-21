import { IAbsoluteCoordinate } from ".";
import { IChunkCoordinate } from "../ChunkCoordinate";
import { IRelativeCoordinate } from "../RelativeCoordinate";

/**
 * Absolute coordinate in world space,
 * not relative to any chunk.
 */
export class AbsoluteCoordinate implements IAbsoluteCoordinate {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) { }

  /**
   * Get the chunk coordinate of the chunk that contains this absolute coordinate.
   * 
   * @returns The chunk coordinate of the chunk that contains this absolute coordinate.
   */
  getChunkCoordinate(): IChunkCoordinate {
    throw "Not implemented";
  }

  /**
   * Get the relative coordinate of this absolute coordinate within its chunk.
   * 
   * @returns The relative coordinate of this absolute coordinate within its chunk.
   */
  getRelativeCoordinate(): IRelativeCoordinate {
    throw "Not implemented";
  }
}