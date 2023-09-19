import * as Utility from "@share/utility";
import { Face, Block } from "@share/utility";

import { Vector3 } from "babylonjs";
import { IClusterData } from "../IClusterData";

import * as Babylon from "babylonjs";
import { IAssetManager } from "@client/assets";
import { IChunkData } from ".";

// TODO: Implement greedy meshing

/**
 * Store data for a single chunk, a cubic region of blocks.
 */
export class ChunkData implements IChunkData {

  private blocks: Block[][][];
  private mesh: Babylon.Mesh | null = null;

  // Create an empty chunk
  constructor(
    private readonly coordinate: Vector3 = new Vector3(0, 0, 0),
    private readonly size: number = 32
  ) {
    this.blocks = [];

    for (var x = 0; x < this.size; x++) {
      this.blocks[x] = [];
      for (var y = 0; y < this.size; y++) {
        this.blocks[x][y] = [];
        for (var z = 0; z < this.size; z++) {
          this.blocks[x][y][z] = Block.Air;
        }
      }
    }
  }

  // Get the size (width, length, height) of a chunk in blocks
  getSize() {
    return this.size;
  }

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3) : Block | undefined {
    // Ensure the coordinates are within the bounds of the chunk
    if (pos.x < 0 || pos.y < 0 || pos.z < 0) return undefined;
    if (pos.x >= this.size || pos.y >= this.size || pos.z >= this.size) return undefined;

    return this.blocks[pos.x][pos.y][pos.z];
  }

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void {
    // Ensure set block is within the bounds of this chunk
    if (pos.x < 0 || pos.y < 0 || pos.z < 0 || pos.x >= this.size || pos.y >= this.size || pos.z >= this.size) {
      throw new RangeError("Cannot set a block outside this chunk");
    }

    this.blocks[pos.x][pos.y][pos.z] = block;
  }

  // Get the coordinate of this chunk.
  getCoordinate() : Vector3 {
    return this.coordinate;
  }

  // Get iterator for local-space positions of all non-air blocks in the chunk
  *getIterator() : Generator<[Vector3, Block], any, unknown> {
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        for (var z = 0; z < this.size; z++) {
          const block = this.blocks[x][y][z];
          if (block != Block.Air) {
            yield [new Vector3(x, y, z), block];
          }
        }
      }
    }
  }
}
