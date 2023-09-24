import { ChunkData } from "@share/cluster-data/chunk-data";
import { IRelativeCoordinate } from ".";
import { AbsoluteCoordinate, IAbsoluteCoordinate } from "../absolute-coordinate";
import { IChunkCoordinate } from "../chunk-coordinate";

/**
 * Interface for a relative coordinate, which stores the
 * position of a block relative to its chunk.
 * 
 * The x, y and z coordinates must be within 0 and the chunk size minus 1.
 * @throws {RangeError} If the x, y or z coordinate is not within 0 and the chunk size minus 1.
 */
export class RelativeCoordinate implements IRelativeCoordinate {
  
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number,
    public readonly chunkCoordinate: IChunkCoordinate
  ) {
    const chunkSize = ChunkData.CHUNK_SIZE;

    if (x < 0 || y < 0 || z < 0 ||
      x >= chunkSize || y >= chunkSize || z >= chunkSize)
    {
      throw new RangeError("Relative coordinate must be within 0 and the chunk size minus 1.");
    }
  }

  /**
   * Convert this relative coordinate to an absolute coordinate.
   * 
   * @returns The absolute coordinate of this relative coordinate.
   */
  getAbsoluteCoordinate(): IAbsoluteCoordinate {
    const chunkSize = ChunkData.CHUNK_SIZE;

    const x = this.x + this.chunkCoordinate.x * chunkSize;
    const y = this.y + this.chunkCoordinate.y * chunkSize;
    const z = this.z + this.chunkCoordinate.z * chunkSize;

    return new AbsoluteCoordinate(x, y, z);
  }

  /**
   * Determine if this relative coordiante is equal to another IRelativeCoordinate.
   * 
   * @returns True if the coordinates are equal, false otherwise.
   */
  equals(other: IRelativeCoordinate): boolean {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.z === other.z &&
      this.chunkCoordinate.equals(other.chunkCoordinate)
    );
  }
}