import { ICoordinate } from "../coordinate/ICoordinate";

/**
 * Store generic objects in 3D coordinates.
 * @template T The type of object to store.
 * @template C The coordinate type.
 */
export interface IGrid<T, C extends ICoordinate> extends Iterable<[C, T]> {

  /**
   * Get a string representation of this Grid's contents.
   * This string can be used to create an identical Grid
   * using Grid.fromStringRep(rep).
   * @return A string representation of this Grid.
   */
  toStringRep(): string;

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  get(coord: C): T | undefined;

  /**
   * Set a value at a coordinate in this grid.
   * @param coord The coordinate to update in the grid.
   * @param value The value to set at the specified coordinate in the grid.
   */
  set(coord: C, value: T): void;

  /**
   * Get iterator for all set items in the grid and their coordinates
   * in order by coordinates in an arbitrary order.
   * @returns An iterator that iterates through all set values in the grid
   * and their coordinates in an arbitrary order.
   */
  [Symbol.iterator](): Iterator<[C, T]>;
}