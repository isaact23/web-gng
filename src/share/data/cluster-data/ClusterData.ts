import { IChunkData, ChunkData } from "./chunk-data";
import { IClusterData } from "./IClusterData";
import { Block } from "@share/utility";
import { ChunkCoordinate, IAbsoluteCoordinate, IChunkCoordinate } from "@share/data/coordinate";
import { Settings } from "@share/config/Settings";
import { Grid, IGrid } from "../grid";

/**
 * Manage multiple chunks, generating their meshes and loading them
 * into the Babylon scene.
 */
export class ClusterData implements IClusterData {

  private constructor(private chunks: IGrid<IChunkData, IChunkCoordinate>) {}

  /**
   * Create a new ClusterData with no chunks yet.
   * @returns An empty ClusterData.
   */
  static new(): ClusterData {
    const grid = new Grid<IChunkData, IChunkCoordinate>()
    return new ClusterData(grid);
  }

  /**
   * Add a new chunk. Replace any chunk in its spot.
   * @param chunk The chunk to add.
   */
  addChunk(chunk: IChunkData): void {
    const coord = chunk.getCoordinate();
    this.chunks.set(coord, chunk);
  }

  /**
   * Get the chunk at a coordinate.
   * @param coord The coordinate of the chunk to access.
   * @returns The chunk at the specified coordinate, or undefined if there is no chunk.
   */
  getChunk(coord: IChunkCoordinate): IChunkData | undefined {
    return this.chunks.get(coord);
  }

  /**
   * Get the block at an absolute coordinate.
   * @param coord The coordinate to access.
   * @returns The block at the coordinate, or undefined if there is no block.
   */
  getBlock(coord: IAbsoluteCoordinate) : Block | undefined {

    // Get the chunk that the block is in
    const relCoord = coord.getRelativeCoordinate();
    const chunk = this.getChunk(relCoord.chunkCoordinate);
    if (chunk === undefined) return undefined;

    // Get the block from the chunk
    return chunk.getBlock(relCoord);
  }

  /**
   * Set a block at an absolute coordinate.
   * @param coord The coordinate to update.
   * @param block The block to set at the specified coordinate.
   */
  setBlock(coord: IAbsoluteCoordinate, block: Block) : void {

    // Get the chunk that the block is in
    const relCoord = coord.getRelativeCoordinate();
    let chunk = this.getChunk(relCoord.chunkCoordinate);
    if (chunk === undefined) {

      // Create a new chunk if it doesn't already exist
      chunk = ChunkData.new(relCoord.chunkCoordinate);
      this.addChunk(chunk);
    }

    // Set the block from the chunk
    chunk.setBlock(relCoord, block);
  }

  /**
   * Get iterator for all chunks in the cluster and
   * corresponding chunk coordinates.
   * @returns An iterator for all chunks in this cluster and
   * corresponding chunk coordinates.
   */
  *[Symbol.iterator](): Iterator<[IChunkCoordinate, IChunkData]> {
    for (let chunk of this.chunks) {
      const coord = chunk[0];
      const chunkCoord = new ChunkCoordinate(coord.x, coord.y, coord.z);
      const data = chunk[1];
      
      yield [chunkCoord, data];
    }
  }

  /**
   * Get chunk size.
   * @returns The chunk width in blocks.
   */
  getChunkSize(): number {
    return Settings.CHUNK_SIZE;
  }
}
