import { ChunkData } from "@share/cluster-data/chunk-data";
import { IAbsoluteCoordinate } from ".";
import { ChunkCoordinate, IChunkCoordinate } from "../chunk-coordinate";
import { IRelativeCoordinate, RelativeCoordinate } from "../relative-coordinate";

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
    const chunkSize = ChunkData.CHUNK_SIZE;

    const x = Math.floor(this.x / chunkSize);
    const y = Math.floor(this.y / chunkSize);
    const z = Math.floor(this.z / chunkSize);

    return new ChunkCoordinate(x, y, z);
  }

  /**
   * Get the relative coordinate of this absolute coordinate within its chunk.
   * 
   * @returns The relative coordinate of this absolute coordinate within its chunk.
   */
  getRelativeCoordinate(): IRelativeCoordinate {
    const chunkCoord = this.getChunkCoordinate();

    const x = this.x - chunkCoord.x * ChunkData.CHUNK_SIZE;
    const y = this.y - chunkCoord.y * ChunkData.CHUNK_SIZE;
    const z = this.z - chunkCoord.z * ChunkData.CHUNK_SIZE;

    return new RelativeCoordinate(x, y, z, chunkCoord);
  }

  /**
   * Add this coordinate to another coordinate and return the result.
   * 
   * @param other The other coordinate to add to this coordinate.
   * @return The sum of this coordinate and the other coordinate.
   */
  add(other: IAbsoluteCoordinate): IAbsoluteCoordinate {
    return new AbsoluteCoordinate(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    );
  }

  /**
   * Determine if this coordinate is equal to another IAbsoluteCoordiante.
   * 
   * @returns True if the coordinates are equal, false otherwise.
   */
  equals(other: IAbsoluteCoordinate): boolean {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.z === other.z
    );
  }
}