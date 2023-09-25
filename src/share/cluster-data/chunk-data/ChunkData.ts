import { Block } from "@share/utility";
import { IChunkData } from ".";

import { ChunkCoordinate, IChunkCoordinate } from "@share/data/coordinate/chunk-coordinate";
import { IRelativeCoordinate, RelativeCoordinate } from "@share/data/coordinate/relative-coordinate";
import { IRelativeGrid, RelativeGrid } from "@share/data/grid/relative-grid";

// TODO: Implement greedy meshing

/**
 * Store data for a single chunk, a cubic region of blocks.
 */
export class ChunkData implements IChunkData {

  /**
   * The chunk size in blocks, universal across the entire program.
   */
  public static readonly CHUNK_SIZE = 32;

  private blocks: IRelativeGrid<Block>;

  // Create an empty chunk
  constructor(
    private readonly coordinate: IChunkCoordinate
  ) {
    this.blocks = new RelativeGrid<Block>(coordinate);

    for (var x = 0; x < ChunkData.CHUNK_SIZE; x++) {
      for (var y = 0; y < ChunkData.CHUNK_SIZE; y++) {
        for (var z = 0; z < ChunkData.CHUNK_SIZE; z++) {
          this.blocks.set(new RelativeCoordinate(x, y, z, coordinate), Block.Air);
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
   * @throws Error if the coordinate is not relative to this chunk.
   */
  getBlock(coord: IRelativeCoordinate): Block {

    // Ensure relative coordinate is relative to this chunk
    if (!coord.chunkCoordinate.equals(this.coordinate)) {
      throw new Error("Cannot get a block outside this chunk");
    }

    const block = this.blocks.get(coord);
    if (block == undefined) {
      throw new Error("Tried to access a block but it was undefined");
    }

    return block;
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

    this.blocks.set(coord, block);
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
    return this.blocks.getIterator();
  }
}
