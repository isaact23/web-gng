import { ChunkData } from "@share/cluster-data/chunk";
import { IChunkCoordinate } from ".";
import { AbsoluteCoordinate, IAbsoluteCoordinate } from "../AbsoluteCoordinate";

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
    const chunkSize = ChunkData.CHUNK_SIZE;

    const x = this.x * chunkSize;
    const y = this.y * chunkSize;
    const z = this.z * chunkSize;

    return new AbsoluteCoordinate(x, y, z);
  }
}