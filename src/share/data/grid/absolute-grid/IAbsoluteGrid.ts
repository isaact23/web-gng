import { IAbsoluteCoordinate } from "@share/data/coordinate";

/**
 * An interface for a grid indexed by absolute coordinates.
 * @param <T> The type of object to store.
 */
export interface IAbsoluteGrid<T> {
  
  /**
   * Get a value at a coordinate in this grid.
   * @param coord The absolute coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  get(coord: IAbsoluteCoordinate): T | undefined;

  /**
   * Set a value at a coordinate in this grid.
   * @param coord The absolute coordinate to update in the grid.
   * @param value The value to set at the specified coordinate in the grid.
   */
  set(coord: IAbsoluteCoordinate, value: T): void;
  
  /**
   * Get iterator for all set items in the grid.
   * @returns An iterator that iterates through all set values in the grid.
   */ 
  getIterator(): Generator<T>;
}