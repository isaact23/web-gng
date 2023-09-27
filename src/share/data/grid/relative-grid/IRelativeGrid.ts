import { IRelativeCoordinate } from "@share/data/coordinate";

/**
 * An interface for a grid indexed by relative coordinates.
 * @param <T> The type of object to store.
 */
export interface IRelativeGrid<T> extends Iterable<[IRelativeCoordinate, T]> {

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The relative coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   * @throws An error if the relative coordinate is not in the same chunk as this grid.
   */
    get(coord: IRelativeCoordinate): T | undefined;

    /**
     * Set a value at a coordinate in this grid.
     * @param coord The relative coordinate to update in the grid.
     * @param value The value to set at the specified coordinate in the grid.
     * @throws An error if the relative coordinate is not in the same chunk as this grid.
     */
    set(coord: IRelativeCoordinate, value: T): void;
    
    /**
     * Get iterator for all set items in the grid and their coordinates
     * in order by coordinates in an arbitrary order.
     * @returns An iterator that iterates through all set values in the grid
     * and their coordinates in an arbitrary order.
     */
    [Symbol.iterator](): Iterator<[IRelativeCoordinate, T]>;
}