import { Vector3 } from "babylonjs";
import { IGrid } from ".";
import { ICoordinate } from "../coordinate/ICoordinate";

/**
 * Store generic objects in 3D coordinates.
 * @template T The type of object to store.
 * @template C The coordinate type.
 */
export class Grid<T, C extends ICoordinate> implements IGrid<T, C> {

  protected constructor(protected data: Map<number, Map<number, Map<number, T>>>) {}

  /**
   * Create a new empty grid.
   */
  static new<T, C extends ICoordinate>(): Grid<T, C> {
    return new Grid<T, C>(new Map<number, Map<number, Map<number, T>>>());
  }

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  public get(coord: C): T | undefined {

    return this.getNum(coord.x, coord.y, coord.z);
  }

  /**
   * Get a value at a coordinate in this grid.
   * @param x x coordinate of block to access.
   * @param y y coordinate of block to access.
   * @param z z coordinate of block to access.
   * @returns The value at the coordinate, or undefined if none found.
   */
  protected getNum(x: number, y: number, z: number): T | undefined {
    const row = this.data.get(x);
    if (row == undefined) return undefined;

    const col = row.get(y);
    if (col == undefined) return undefined;

    return col.get(z);
  }

  /**
   * Set a value at a coordinate in this grid.
   * @param coord The coordinate to update in the grid.
   * @param value The value to set at the specified coordinate in the grid.
   */
  public set(coord: C, value: T): void {

    this.setNum(coord.x, coord.y, coord.z, value);
  }

  /**
   * Set a value at a coordinate in this grid.
   * @param x x coordinate of block to set.
   * @param y y coordinate of block to set.
   * @param z z coordinate of block to set.
   * @param value The value to set at the specified coordinate in the grid.
   */
  protected setNum(x: number, y: number, z: number, value: T): void {

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
