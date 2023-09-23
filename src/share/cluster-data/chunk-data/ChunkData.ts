import { Block } from "@share/utility";
import { IChunkData } from ".";

import { ChunkCoordinate, IChunkCoordinate } from "@share/data/coordinate/ChunkCoordinate";
import { IRelativeCoordinate, RelativeCoordinate } from "@share/data/coordinate/RelativeCoordinate";

// TODO: Implement greedy meshing

/**
 * Store data for a single chunk, a cubic region of blocks.
 */
export class ChunkData implements IChunkData {

  /**
   * The chunk size in blocks, universal across the entire program.
   */
  public static readonly CHUNK_SIZE = 32;

  private blocks: Block[][][];

  // Create an empty chunk
  constructor(
    private readonly coordinate: IChunkCoordinate
  ) {
    this.blocks = [];

    for (var x = 0; x < ChunkData.CHUNK_SIZE; x++) {
      this.blocks[x] = [];
      for (var y = 0; y < ChunkData.CHUNK_SIZE; y++) {
        this.blocks[x][y] = [];
        for (var z = 0; z < ChunkData.CHUNK_SIZE; z++) {
          this.blocks[x][y][z] = Block.Air;
        }
      }
    }
  }

  // Get the size (width, length, height) of a chunk in blocks
  getSize() {
    return ChunkData.CHUNK_SIZE;
  }

  /**
   * Get the block at a relative coordinate
   * @param coord The position of the block to access.
   * @returns The block.
   */
  getBlock(coord: IRelativeCoordinate): Block {

    // Ensure relative coordinate is relative to this chunk
    if (!coord.chunkCoordinate.equals(this.coordinate)) {
      throw new Error("Cannot set a block outside this chunk");
    }

    return this.blocks[coord.x][coord.y][coord.z];
  }

  /**
   * Set a block at a relative coordinate.
   * @param coord The coordiante to update.
   * @param block The block to set at the coordinate.
   */
  setBlock(coord: IRelativeCoordinate, block: Block): void {

    // Ensure relative coordinate is relative to this chunk
    if (!coord.chunkCoordinate.equals(this.coordinate)) {
      throw new Error("Cannot set a block outside this chunk");
    }

    this.blocks[coord.x][coord.y][coord.z] = block;
  }

  // Get the coordinate of this chunk.
  getCoordinate(): IChunkCoordinate {
    return this.coordinate;
  }

  /**
   * Get iterator for relative coordinates of all non-air blocks in the chunk
   * @returns An iterator for blocks in the chunk.
   */
  *getIterator() : Generator<[IRelativeCoordinate, Block], any, unknown> {
    for (var z = 0; z < ChunkData.CHUNK_SIZE; z++) {
      for (var y = 0; y < ChunkData.CHUNK_SIZE; y++) {
        for (var x = 0; x < ChunkData.CHUNK_SIZE; x++) {
          const block = this.blocks[x][y][z];
          if (block != Block.Air) {
            const rel = new RelativeCoordinate(x, y, z, this.coordinate);
            yield [rel, block];
          }
        }
      }
    }
  }
}
