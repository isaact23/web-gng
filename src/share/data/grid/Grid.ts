import { IGrid } from ".";
import { Vector3 } from "babylonjs"

/**
 * Store generic objects in 3D coordinates.
 * @param <T> The type of object to store.
 */
export class Grid<T> implements IGrid<T> {

  private data = new Map<number, Map<number, Map<number, T>>>;

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  public get(coord: Vector3): T | undefined {

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
  public set(coord: Vector3, value: T): void {

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
   * Get iterator for all set items in the grid.
   * @returns An iterator that iterates through all set values in the grid.
   */ 
  *getIterator(): Generator<[Vector3, T]> {
    for (let [x, sliceX] of this.data) {
      for (let [y, sliceY] of sliceX) {
        for (let [z, value] of sliceY) {
          yield [new Vector3(x, y, z), value];
        }
      }
    }
  }
}