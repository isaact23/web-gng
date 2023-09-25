import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";
import { IAbsoluteGrid } from ".";
import { IGrid, Grid } from "..";
import { Vector3 } from "babylonjs";

/**
 * A grid indexed by absolute coordinates.
 * @param <T> The type of object to store.
 */
export class AbsoluteGrid<T> implements IAbsoluteGrid<T> {

  /**
   * Store an internal grid.
   */
  private grid: IGrid<T> = new Grid<T>();

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The absolute coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  get(coord: IAbsoluteCoordinate): T | undefined {
    const vec = new Vector3(coord.x, coord.y, coord.z);
    return this.grid.get(vec);
  }

  /**
   * Set a value at a coordinate in this grid.
   * @param coord The absolute coordinate to update in the grid.
   * @param value The value to set at the specified coordinate in the grid.
   */
  set(coord: IAbsoluteCoordinate, value: T): void {
    const vec = new Vector3(coord.x, coord.y, coord.z);
    this.grid.set(vec, value);
  }
  
  /**
   * Get iterator for all set items in the grid and their coordinates
   * in order by coordinates in x, y, z order.
   * @returns An iterator that iterates through all set values in the grid
   * and their coordinates in x, y, z order.
   */
  *[Symbol.iterator](): Iterator<[IAbsoluteCoordinate, T]> {
    for (const [vec, value] of this.grid) {
      yield [new AbsoluteCoordinate(vec.x, vec.y, vec.z), value];
    }
  }
}
