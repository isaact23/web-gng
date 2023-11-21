import { ChunkData } from "@share/data/cluster-data/chunk-data";
import { IAbsoluteCoordinate } from ".";
import { ChunkCoordinate, IChunkCoordinate } from "../chunk-coordinate";
import { IRelativeCoordinate, RelativeCoordinate } from "../relative-coordinate";
import { Vector3 } from "babylonjs";
import { Settings } from "@share/config/Settings";

/**
 * Absolute coordinate in world space,
 * not relative to any chunk.
 */
export class AbsoluteCoordinate implements IAbsoluteCoordinate {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {
    // Ensure coordinates are not decimals
    if (x % 1 != 0 || y % 1 != 0 || z % 1 != 0) {
      throw new Error("Cannot use decimals in AbsoluteCoordinate initialization");
    }
  }

  /**
   * Get the chunk coordinate of the chunk that contains this absolute coordinate.
   * 
   * @returns The chunk coordinate of the chunk that contains this absolute coordinate.
   */
  getChunkCoordinate(): IChunkCoordinate {
    const chunkSize = Settings.CHUNK_SIZE;

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
    const chunkSize = Settings.CHUNK_SIZE;

    const x = this.x - chunkCoord.x * chunkSize;
    const y = this.y - chunkCoord.y * chunkSize;
    const z = this.z - chunkCoord.z * chunkSize;

    return new RelativeCoordinate(x, y, z, chunkCoord);
  }

  /**
   * Add this coordinate to another coordinate and return the result.
   * 
   * @param other The other coordinate to add to this coordinate.
   * @return The sum of this coordinate and the other coordinate.
   */
  add(other: IAbsoluteCoordinate): IAbsoluteCoordinate {
    return this.addScalars(other.x, other.y, other.z);
  }

  /**
   * Add this coordinate to three scalars and return the result.
   * 
   * @param x The x scalar to add to this coordinate.
   * @param y The y scalar to add to this coordinate.
   * @param z The z scalar to add to this coordinate.
   * @return The sum of this coordinate and the three scalars.
   */
  addScalars(x: number, y: number, z: number): IAbsoluteCoordinate {
    return (
      new AbsoluteCoordinate(
        this.x + x,
        this.y + y,
        this.z + z
      )
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

  /**
   * Multiply this coordinate by a scalar value and return the result.
   * 
   * @returns The product of this coordinate and the scalar value.
   */
  multiply(scalar: number): IAbsoluteCoordinate {
    return new AbsoluteCoordinate(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar
    );
  }

  /**
   * Get the Vector3 representation of this absolute coordinate.
   * 
   * @returns The Vector3 representation of this absolute coordinate.
   */
  vec(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }
}