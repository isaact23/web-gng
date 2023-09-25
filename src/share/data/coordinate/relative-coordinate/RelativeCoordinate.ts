import { ChunkData } from "@share/cluster-data/chunk-data";
import { IRelativeCoordinate } from ".";
import { AbsoluteCoordinate, IAbsoluteCoordinate } from "../absolute-coordinate";
import { IChunkCoordinate } from "../chunk-coordinate";
import { Vector3 } from "babylonjs";

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
    public readonly chunkCoordinate: IChunkCoordinate,
    public readonly chunkSize: number = ChunkData.CHUNK_SIZE
  ) {

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

  /**
   * Add to this relative coordinate and return the result, or
   * undefined if the result is not within the chunk.
   */
  add(x: number, y: number, z: number): IRelativeCoordinate | undefined {
    const newX = this.x + x;
    const newY = this.y + y;
    const newZ = this.z + z;

    // Ensure new relative coordinates are within the bounds of the chunk
    if (newX < 0 || newY < 0 || newZ < 0 ||
      newX >= this.chunkSize || newY >= this.chunkSize || newZ >= this.chunkSize)
    {
      return undefined;
    }

    return new RelativeCoordinate(newX, newY, newZ, this.chunkCoordinate, this.chunkSize);
  }

  /**
   * Get the Vector3 representation of this relative coordinate,
   * excluding the chunk coordinate.
   * 
   * @returns The Vector3 representation of this relative coordinate,
   * excluding the chunk coordinate.
   */
  vec(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }
}