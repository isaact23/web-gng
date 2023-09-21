import { Block } from "@share/utility";
import { IChunkData } from ".";

import { Vector3 } from "babylonjs";
import * as Babylon from "babylonjs";
import { ChunkCoordinate, IChunkCoordinate } from "@share/data/coordinate/ChunkCoordinate";

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
  private mesh: Babylon.Mesh | null = null;

  // Create an empty chunk
  constructor(
    private readonly coordinate: IChunkCoordinate = new ChunkCoordinate(0, 0, 0)
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

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3) : Block {
    // Ensure the coordinates are within the bounds of the chunk
    if (pos.x < 0 || pos.y < 0 || pos.z < 0) {
      throw new RangeError("Cannot get a block outside this chunk");
    }
    if (pos.x >= ChunkData.CHUNK_SIZE || pos.y >= ChunkData.CHUNK_SIZE || pos.z >= ChunkData.CHUNK_SIZE) {
      throw new RangeError("Cannot get a block outside this chunk");
    }

    return this.blocks[pos.x][pos.y][pos.z];
  }

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void {
    // Ensure set block is within the bounds of this chunk
    if (pos.x < 0 || pos.y < 0 || pos.z < 0 || 
      pos.x >= ChunkData.CHUNK_SIZE || pos.y >= ChunkData.CHUNK_SIZE || pos.z >= ChunkData.CHUNK_SIZE)
    {
      throw new RangeError("Cannot set a block outside this chunk");
    }

    this.blocks[pos.x][pos.y][pos.z] = block;
  }

  // Get the coordinate of this chunk.
  getCoordinate(): IChunkCoordinate {
    return this.coordinate;
  }

  // Get iterator for local-space positions of all non-air blocks in the chunk
  *getIterator() : Generator<[Vector3, Block], any, unknown> {
    for (var z = 0; z < ChunkData.CHUNK_SIZE; z++) {
      for (var y = 0; y < ChunkData.CHUNK_SIZE; y++) {
        for (var x = 0; x < ChunkData.CHUNK_SIZE; x++) {
          const block = this.blocks[x][y][z];
          if (block != Block.Air) {
            yield [new Vector3(x, y, z), block];
          }
        }
      }
    }
  }
}
