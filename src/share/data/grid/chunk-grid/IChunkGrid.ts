import { IChunkCoordinate } from "@share/data/coordinate";

/**
 * An interface for a grid indexed by chunk coordinates.
 * @param <T> The type of object to store.
 */
export interface IChunkGrid<T> extends Iterable<[IChunkCoordinate, T]> {

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The chunk coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
    get(coord: IChunkCoordinate): T | undefined;

    /**
     * Set a value at a coordinate in this grid.
     * @param coord The chunk coordinate to update in the grid.
     * @param value The value to set at the specified coordinate in the grid.
     */
    set(coord: IChunkCoordinate, value: T): void;
    
    /**
     * Get iterator for all set items in the grid and their coordinates
     * in order by coordinates in x, y, z order.
     * @returns An iterator that iterates through all set values in the grid
     * and their coordinates in x, y, z order.
     */
    [Symbol.iterator](): Iterator<[IChunkCoordinate, T]>;
}