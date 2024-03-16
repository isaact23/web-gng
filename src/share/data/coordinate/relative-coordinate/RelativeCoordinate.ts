import { IRelativeCoordinate } from ".";
import { AbsoluteCoordinate, IAbsoluteCoordinate } from "../absolute-coordinate";
import { ChunkCoordinate, IChunkCoordinate } from "../chunk-coordinate";
import { Vector3 } from "babylonjs";
import { Settings } from "@share/config/Settings";

/**
 * Interface for a relative coordinate, which stores the
 * position of a block relative to its chunk.
 */

export class RelativeCoordinate implements IRelativeCoordinate {
  
  /**
   * Create a new RelativeCoordinate.
   * 
   * The x, y and z coordinates must be within 0 and the chunk size minus 1.
   * @throws {RangeError} If the x, y or z coordinate is not within 0 and the chunk size minus 1.
   * @throws {TypeError} If decimals are used as an input.
   */
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number,
    public readonly chunkCoordinate: IChunkCoordinate
  ) {

    const chunkSize = Settings.CHUNK_SIZE;

    // Ensure coordinates are within the range of the chunk
    if (x < 0 || y < 0 || z < 0 ||
      x >= chunkSize || y >= chunkSize || z >= chunkSize)
    {
      throw new RangeError("Relative coordinate must be within 0 and the chunk size minus 1.");
    }

    // Ensure coordinates are not decimals
    if (x % 1 != 0 || y % 1 != 0 || z % 1 != 0) {
      throw new TypeError(`Cannot use decimals in RelativeCoordinate initialization - got ${x} ${y} ${z}`);
    }
  }

  /**
   * Create a RelativeCoordinate from a string representation.
   * @param rep The string representation of the coordinate.
   * @returns A new RelativeCoordinate with values populated from rep.
   */
  static fromString(rep: string): RelativeCoordinate {

    let inner = rep.substring(1, rep.length - 1);
    let split = inner.split(",");

    let x = parseInt(split[0]);
    let y = parseInt(split[1]);
    let z = parseInt(split[2]);
    let cx = parseInt(split[3]);
    let cy = parseInt(split[4]);
    let cz = parseInt(split[5]);

    return new RelativeCoordinate(x, y, z, new ChunkCoordinate(cx, cy, cz));
  }

  /**
   * Get a string representation of this relative coordinate.
   * @returns String representation of this relative coordinate.
   */
  toString(): string {
    return "(" + this.x + "," + this.y + "," + this.z + "," +
      this.chunkCoordinate.x + "," + this.chunkCoordinate.y + "," + this.chunkCoordinate.z + ")";
  }

  /**
   * Convert this relative coordinate to an absolute coordinate.
   * 
   * @returns The absolute coordinate of this relative coordinate.
   */
  getAbsoluteCoordinate(): IAbsoluteCoordinate {
    const chunkSize = Settings.CHUNK_SIZE;

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

    const chunkSize = Settings.CHUNK_SIZE;

    // Ensure new relative coordinates are within the bounds of the chunk
    if (newX < 0 || newY < 0 || newZ < 0 ||
      newX >= chunkSize || newY >= chunkSize || newZ >= chunkSize)
    {
      return undefined;
    }

    return new RelativeCoordinate(newX, newY, newZ, this.chunkCoordinate);
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