import { Vector3 } from "babylonjs";
import { IGrid } from ".";
import { ICoordinate } from "../coordinate/ICoordinate";

/**
 * Store generic objects in 3D coordinates.
 * @template T The type of object to store.
 * @template C The coordinate type.
 */
export class Grid<T, C extends ICoordinate> implements IGrid<T, C> {

  private data = new Map<number, Map<number, Map<number, T>>>;

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  public get(coord: C): T | undefined {

    const row = this.data.get(coord.x);
    if (row == undefined) return undefined;

    const col = row.get(coord.y);
    if (col == undefined) return undefined;

    return col.get(coord.z);
  }

  /**
  * Set a value at a coordinate in this grid.
  * @param coord The coordinate to update in the grid.
  * @param value The value to set at the specified coordinate in the grid.
  */
  public set(coord: C, value: T): void {

    let row = this.data.get(coord.x);
    if (row == undefined) {
      row = new Map<number, Map<number, T>>;
      this.data.set(coord.x, row);
    }

    let col = row.get(coord.y);
    if (col == undefined) {
      col = new Map<number, T>;
      row.set(coord.y, col);
    }

    col.set(coord.z, value);
  }

  /**
   * Get iterator for all set items in the grid and their coordinates
   * in order by coordinates in an arbitrary order.
   * @returns An iterator that iterates through all set values in the grid
   * and their coordinates in an arbitrary order.
   */
  public *[Symbol.iterator](): Iterator<[Vector3, T]> {
    for (const [x, row] of this.data) {
      for (const [y, col] of row) {
        for (const [z, value] of col) {
          const coord = new Vector3(x, y, z); // Type assertion
          yield [coord, value];
        }
      }
    }
  }
}