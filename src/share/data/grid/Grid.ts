import { IGrid } from ".";

/**
 * Store generic objects in 3D coordinates.
 * @param <T> The type of object to store.
 */
export class Grid<T> implements IGrid<T> {
  private data = new Map<number, Map<number, Map<number, T>>>;

  /**
   * Get a value at a coordinate in this grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  get(x: number, y: number, z: number): T | undefined {

    const row = this.data.get(x);
    if (row == undefined) return undefined;

    const col = row.get(y);
    if (col == undefined) return undefined;

    return col.get(z);
  }

  /**
   * Set a value at a coordinate in this grid.
   */
  set(x: number, y: number, z: number, value: T): void {

    let row = this.data.get(x);
    if (row == undefined) {
      row = new Map<number, Map<number, T>>;
      this.data.set(x, row);
    }

    let col = row.get(y);
    if (col == undefined) {
      col = new Map<number, T>;
      row.set(y, col);
    }

    col.set(z, value);
  }
}