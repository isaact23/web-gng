import { ChunkCoordinate, IChunkCoordinate } from "@share/data/coordinate";
import { IGrid, Grid } from "..";
import { Vector3 } from "babylonjs";
import { IChunkGrid } from ".";

/**
 * A grid indexed by chunk coordinates.
 * @param <T> The type of object to store.
 */
export class ChunkGrid<T> implements IChunkGrid<T> {

  /**
   * Store an internal grid.
   */
  private grid: IGrid<T> = new Grid<T>();

  /**
   * Get a value at a coordinate in this grid.
   * @param coord The chunk coordinate to access in the grid.
   * @returns The value at the coordinate, or undefined if none found.
   */
  get(coord: IChunkCoordinate): T | undefined {
    const vec = new Vector3(coord.x, coord.y, coord.z);
    return this.grid.get(vec);
  }

  /**
   * Set a value at a coordinate in this grid.
   * @param coord The chunk coordinate to update in the grid.
   * @param value The value to set at the specified coordinate in the grid.
   */
  set(coord: IChunkCoordinate, value: T): void {
    const vec = new Vector3(coord.x, coord.y, coord.z);
    this.grid.set(vec, value);
  }
  
  /**
   * Get iterator for all set items in the grid and their coordinates
   * in order by coordinates in x, y, z order.
   * @returns An iterator that iterates through all set values in the grid
   * and their coordinates in x, y, z order.
   */
  *[Symbol.iterator](): Iterator<[IChunkCoordinate, T]> {
    for (const [vec, value] of this.grid) {
      yield [new ChunkCoordinate(vec.x, vec.y, vec.z), value];
    }
  }
}
