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

  /**
   * Add this chunk coordinate to another chunk coordinate and return the result.
   * 
   * @param other The other chunk coordinate to add to this chunk coordinate.
   * @return The sum of this chunk coordinate and the other chunk coordinate.
   */
  add(other: IChunkCoordinate): IChunkCoordinate {
    return new ChunkCoordinate(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    );
  }
}