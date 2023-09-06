/**
 * Store generic objects in 3D coordinates.
 * @param <T> The type of object to store.
 */
export interface IGrid<T> {
  /**
   * Get a value at a coordinate in this grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  get(x: number, y: number, z: number): T | undefined;

  /**
   * Set a value at a coordinate in this grid.
   */
  set(x: number, y: number, z: number, value: T): void;
}