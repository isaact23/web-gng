import { IChunkCoordinate } from "@share/data/coordinate";
import { IChunkDataGrid } from "./IChunkDataGrid";
import { IChunkData } from "..";
import { Grid, IGrid } from "@share/data/grid";
import { Vector3 } from "babylonjs";

/**
 * A chunk grid is a wrapper for the grid class that uses
 * IChunkCoordiantes to index a grid of chunks.
 */
export class ChunkDataGrid implements IChunkDataGrid {

  private chunks: IGrid<IChunkData> = new Grid<IChunkData>();

  constructor() {}

  /**
   * Get chunk data at a coordinate in this grid.
   * @param coord The coordinate to access in the grid.
   * @returns The chunk data at the coordinate, or undefined if none found.
   */
    get(coord: IChunkCoordinate): IChunkData | undefined {
      const vec = new Vector3(coord.x, coord.y, coord.z);
      return this.chunks.get(vec);
    }

    /**
     * Add a chunk to the grid. The coordinate is contained in IChunkData.
     * @param value The chunk to add to the grid.
     */
    add(chunk: IChunkData): void {
      const coord = chunk.getCoordinate();
      const vec = new Vector3(coord.x, coord.y, coord.z);
      this.chunks.set(vec, chunk);
    }
    
    /**
     * Get iterator for all chunks in the grid.
     * @returns An iterator that iterates through all chunks in the grid.
     */ 
    getIterator(): Generator<IChunkData> {
      return this.chunks.getIterator();
    }
}