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
    private readonly chunkSize = 32
  ) {
    this.chunks = new Grid<IChunkData>();
  }

  // Add a new chunk. Replace any chunk in its spot.
  addChunk(chunk: IChunkData): void {
    if (chunk.getSize() != this.chunkSize) {
      throw "Chunk size is incompatible with world";
    }

    const coord = chunk.getCoordinate();
    this.chunks.set(coord, chunk);
  }

  // Get the chunk at a coordinate
  getChunk(pos: Vector3): IChunkData | undefined {
    return this.chunks.get(pos);
  }

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3): Block | undefined {

    // Get the chunk that the block is in
    const chunkCoord = this._worldToChunkCoord(pos);
    const chunk = this.getChunk(chunkCoord);
    if (chunk === undefined) return undefined;

    // Get the block from the chunk
    const blockCoord = this._worldToBlockCoord(pos);
    return chunk.getBlock(blockCoord);
  }

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block): void {

    // Get the chunk that the block is in
    const chunkCoord = this._worldToChunkCoord(pos);
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

  // Get iterator for all chunks in the world
  *getIterator(): Generator<IChunkData> {
    return this.chunks.getIterator();
  }

  // Get chunk size
  getChunkSize(): number {
    return this.chunkSize;
  }

  // Convert world coordinates to chunk coordinates
  _worldToChunkCoord(pos: Vector3): Vector3 {
    return new Vector3(
      Math.floor(pos.x / this.chunkSize),
      Math.floor(pos.y / this.chunkSize),
      Math.floor(pos.z / this.chunkSize)
    );
  }

  // Convert world coordinates to block coordinates within a chunk
  _worldToBlockCoord(pos: Vector3): Vector3 {
    return new Vector3(
      pos.x % this.chunkSize,
      pos.y % this.chunkSize,
      pos.z % this.chunkSize
    );
  }
}
