import { IChunkCoordinate } from ".";

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
}