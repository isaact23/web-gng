import { Vector3 } from "babylonjs";
import { IChunkData, ChunkData } from "./chunk";
import { IClusterData } from "./IClusterData";
import { Block } from "@share/utility";
import { Grid, IGrid } from "@share/data/grid";

/**
 * Manage multiple chunks, generating their meshes and loading them
 * into the Babylon scene.
 */
export class ClusterData implements IClusterData {

  private chunks: IGrid<IChunkData>;

  constructor(

  ) {
    this.chunks = new Grid<IChunkData>();
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
   * @param pos The coordinate of the chunk to access.
   * @returns The chunk at the specified coordinate, or undefined if there is no chunk.
   */
  getChunk(pos: Vector3): IChunkData | undefined {
    return this.chunks.get(pos);
  }

  /**
   * Get the block at an xyz coordinate.
   * @param pos The coordinate to access.
   * @returns The block at the coordinate, or undefined if there is no block.
   */
  getBlock(pos: Vector3): Block | undefined {

    // Get the chunk that the block is in
    const chunk = this.getChunk(pos);
    if (chunk === undefined) return undefined;

    // Get the block from the chunk
    const blockCoord = this._chunkToBlockCoord(pos);
    return chunk.getBlock(blockCoord);
  }

  /**
   * Set a block at an xyz coordinate.
   * @param pos The coordinate to update.
   * @param block The block to set at the specified coordinate.
   */
  setBlock(pos: Vector3, block: Block): void {

    // Get the chunk that the block is in
    const chunkCoord = this._blockToChunkCoord(pos);
    let chunk = this.getChunk(chunkCoord);
    if (chunk === undefined) {

      // Create a new chunk if it doesn't already exist
      chunk = new ChunkData(chunkCoord);
      this.addChunk(chunk);
    }

    // Set the block from the chunk
    const blockCoord = this._worldToBlockCoord(pos);
    chunk.setBlock(blockCoord, block);
  }

  /**
   * Get iterator for all chunks in the cluster.
   * @returns An iterator for all chunks in this cluster.
   */
  *getIterator(): Generator<IChunkData> {
    return this.chunks.getIterator();
  }

  /**
   * Get chunk size.
   * @returns The chunk width in blocks.
   */
  getChunkSize(): number {
    return ChunkData.CHUNK_SIZE;
  }
}
