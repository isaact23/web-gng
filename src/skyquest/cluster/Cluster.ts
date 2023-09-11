import { Vector3 } from "babylonjs";
import { IChunk, Chunk } from "./chunk";
import { ICluster } from "./ICluster";
import { Block } from "src/skyquest/utility";
import { IAssetManager } from "src/skyquest/assets";
import * as Babylon from "babylonjs";

/**
 * Manage multiple chunks, generating their meshes and loading them
 * into the Babylon scene.
 */
export class Cluster implements ICluster {

  private chunks: Map<number, Map<number, Map<number, IChunk>>>;

  constructor(
    private readonly shadowGenerator: Babylon.ShadowGenerator,
    private readonly assetManager: IAssetManager,
    private readonly chunkSize = 32
  ) {
    this.chunks = new Map<number, Map<number, Map<number, IChunk>>>();
  }

  // Add a new chunk. Replace any chunk in its spot.
  addChunk(chunk: IChunk): void {
    if (chunk.getSize() != this.chunkSize) {
      throw "Chunk size is incompatible with world";
    }

    const coord = chunk.getCoordinate();

    let sliceX = this.chunks.get(coord.x);
    if (sliceX === undefined) {
      sliceX = new Map<number, Map<number, IChunk>>()
      this.chunks.set(coord.x, sliceX);
    }

    let sliceY = sliceX.get(coord.y);
    if (sliceY === undefined) {
      sliceY = new Map<number, IChunk>();
      sliceX.set(coord.y, sliceY);
    }

    sliceY.set(coord.z, chunk);
  }

  // Get the chunk at a coordinate
  getChunk(pos: Vector3): IChunk | undefined {
    return this.chunks.get(pos.x)?.get(pos.y)?.get(pos.z);
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
      chunk = new Chunk(this.assetManager, this, this.shadowGenerator, chunkCoord);
      this.addChunk(chunk);
    }

    // Set the block from the chunk
    const blockCoord = this._worldToBlockCoord(pos);
    chunk.setBlock(blockCoord, block);
  }

  // Get iterator for all chunks in the world
  *getIterator(): Generator<IChunk> {
    for (let [x, sliceX] of this.chunks) {
      for (let [y, sliceY] of sliceX) {
        for (let [z, chunk] of sliceY) {
          yield chunk;
        }
      }
    }
  }

  // Load or reload chunk meshes in the world.
  remesh(): void {
    let chunkIterator = this.getIterator();
    for (let chunk of chunkIterator) {
      chunk.remesh();
    }
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
