import { Vector3 } from "@babylonjs/core";
import { IChunkCoordinate } from ".";
import { AbsoluteCoordinate, IAbsoluteCoordinate } from "../absolute-coordinate";
import { Settings } from "@share/config/Settings";

/**
 * Chunk coordinates. An increment of 1 shifts
 * to an adjacent chunk.
 * @throws {TypeError} If decimals are used as an input.
 */
export class ChunkCoordinate implements IChunkCoordinate {
  
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {
    // Ensure coordinates are not decimals
    if (x % 1 != 0 || y % 1 != 0 || z % 1 != 0) {
      throw new TypeError(`Cannot use decimals in ChunkCoordinate initialization - got ${x} ${y} ${z}`);
    }
  }

  /**
   * Create a ChunkCoordinate from a string representation.
   * @param rep The string representation of the coordinate.
   * @returns A new ChunkCoordinate with values populated from rep.
   */
  static fromString(rep: string): ChunkCoordinate {

    let inner = rep.substring(1, rep.length - 1);
    let split = inner.split(",");

    let x = parseInt(split[0]);
    let y = parseInt(split[1]);
    let z = parseInt(split[2]);

    return new ChunkCoordinate(x, y, z);
  }
  
  /**
   * Get a string representation of this chunk coordinate.
   * @returns String representation of this chunk coordinate.
   */
  toString(): string {
    return "(" + this.x + "," + this.y + "," + this.z + ")";
  }

  /**
   * Get the absolute coordinate of the block at the origin of this chunk.
   * 
   * @returns The absolute coordinate of the block at the origin of this chunk.
   */
  getAbsoluteCoordinate(): IAbsoluteCoordinate {
    const chunkSize = Settings.CHUNK_SIZE;

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
    return this.addScalars(
      other.x,
      other.y,
      other.z
    );
  }

  /**
   * Add three scalars to this chunk coordinate and return the result.
   * @param x The x scalar to add to this chunk coordinate.
   * @param y The y scalar to add to this chunk coordinate.
   * @param z The z scalar to add to this chunk coordinate.
   * @return The sum of this chunk coordinate and the three scalars.
   */
  addScalars(x: number, y: number, z: number): IChunkCoordinate {
    return new ChunkCoordinate(
      this.x + x,
      this.y + y,
      this.z + z
    );
  }

  /**
   * Determine if this coordinate is equal to another IChunkCoordinate.
   * 
   * @returns True if the coordinates are equal, false otherwise.
   */
  equals(other: IChunkCoordinate): boolean {
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
  multiply(scalar: number): IChunkCoordinate {
    return new ChunkCoordinate(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar
    );
  }

  /**
   * Get the Vector3 representation of this chunk coordinate.
   * 
   * @returns The Vector3 representation of this chunk coordinate.
   */
  vec(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }
}