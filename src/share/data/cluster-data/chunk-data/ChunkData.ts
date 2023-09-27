import { Block } from "@share/utility";
import { IChunkData } from ".";

import { ChunkCoordinate, IChunkCoordinate } from "@share/data/coordinate/chunk-coordinate";
import { IRelativeCoordinate, RelativeCoordinate } from "@share/data/coordinate/relative-coordinate";
import { IRelativeGrid, RelativeGrid } from "@share/data/grid/relative-grid";
import { Settings } from "@share/config/Settings";

// TODO: Implement greedy meshing

/**
 * Store data for a single chunk, a cubic region of blocks.
 */
export class ChunkData implements IChunkData {

  private blocks: IRelativeGrid<Block>;

  // Create an empty chunk
  constructor(
    private readonly coordinate: IChunkCoordinate
  ) {
    this.blocks = new RelativeGrid<Block>(coordinate);
  }

  // Get the size (width, length, height) of a chunk in blocks
  getSize() {
    return Settings.CHUNK_SIZE;
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
      return Block.Air;
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
   * @returns An iterator for non-air blocks in the chunk.
   */
  *[Symbol.iterator](): Iterator<[IRelativeCoordinate, Block], any, unknown> {
    for (const [coord, block] of this.blocks) {
      if (block != Block.Air) {
        yield [coord, block];
      }
    }
  }
}
