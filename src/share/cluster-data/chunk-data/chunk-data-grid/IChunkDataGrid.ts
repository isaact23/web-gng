import { IChunkCoordinate } from "@share/data/coordinate";
import { IChunkData } from "..";

/**
 * A chunk grid is a wrapper for the grid class that uses
 * IChunkCoordiantes to index a grid of chunks.
 */
export interface IChunkDataGrid {
  /**
   * Get chunk data at a coordinate in this grid.
   * @param coord The coordinate to access in the grid.
   * @returns The chunk data at the coordinate, or undefined if none found.
   */
  get(coord: IChunkCoordinate): IChunkData | undefined;

  /**
   * Add a chunk to the grid. The coordinate is contained in IChunkData.
   * @param value The chunk to add to the grid.
   */
  add(chunk: IChunkData): void;
  
  /**
   * Get iterator for all chunks in the grid.
   * @returns An iterator that iterates through all chunks in the grid.
   */ 
  getIterator(): Generator<IChunkData>;
}