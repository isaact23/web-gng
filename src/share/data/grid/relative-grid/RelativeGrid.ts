import { IChunkCoordinate, IRelativeCoordinate, RelativeCoordinate } from "@share/data/coordinate";
import { IRelativeGrid } from ".";
import { Grid, IGrid } from "..";
import { Vector3 } from "babylonjs";

/**
 * A grid indexed by relative coordinates.
 * @param <T> The type of object to store.
 */
export class RelativeGrid<T> implements IRelativeGrid<T> {
  /**
   * Store an internal grid.
   */
  private grid: IGrid<T> = new Grid<T>();

  /**
   * Initialize a relative grid with a chunk coordinate.
   */
  constructor(private readonly chunkCoordinate: IChunkCoordinate) { }

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The relative coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   * @throws An error if the relative coordinate is not in the same chunk as this grid.
   */
  get(coord: IRelativeCoordinate): T | undefined {

    this._ensureSameChunk(coord);

    const vec = new Vector3(coord.x, coord.y, coord.z);
    return this.grid.get(vec);
  }

  /**
   * Set a value at a coordinate in this grid.
   * @param coord The relative coordinate to update in the grid.
   * @param value The value to set at the specified coordinate in the grid.
   * @throws An error if the relative coordinate is not in the same chunk as this grid.
   */
  set(coord: IRelativeCoordinate, value: T): void {

    this._ensureSameChunk(coord);

    const vec = new Vector3(coord.x, coord.y, coord.z);
    this.grid.set(vec, value);
  }

  /**
     * Get iterator for all set items in the grid and their coordinates
     * in order by coordinates in an arbitrary order.
     * @returns An iterator that iterates through all set values in the grid
     * and their coordinates in an arbitrary order.
     */
  *[Symbol.iterator](): Iterator<[IRelativeCoordinate, T]> {
    for (const [vec, value] of this.grid) {
      yield [new RelativeCoordinate(vec.x, vec.y, vec.z, this.chunkCoordinate), value];
    }
  }

  /**
   * Ensure the relative coordinate in the parameter is in the same chunk as this grid.
   * @throws An error if the relative coordinate is not in the same chunk as this grid.
   */
  private _ensureSameChunk(coord: IRelativeCoordinate): void {
    if (!coord.chunkCoordinate.equals(this.chunkCoordinate)) {
      throw new Error("Relative coordinate is not in the same chunk as this grid.");
    }
  }
}
