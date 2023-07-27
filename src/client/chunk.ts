import {Block} from "./block";
import {Vector3} from "babylonjs";

const CHUNK_SIZE = 16;

// A chunk holds block data
export class Chunk {

  private blocks : Block[][][];

  // Create an empty chunk
  constructor() {
    this.blocks = [];

    for (var x = 0; x < CHUNK_SIZE; x++) {
      this.blocks[x] = [];
      for (var y = 0; y < CHUNK_SIZE; y++) {
        this.blocks[x][y] = [];
        for (var z = 0; z < CHUNK_SIZE; z++) {
          this.blocks[x][y][z] = Block.Air;
        }
      }
    }
  }

  // Get the block at an xyz coordinate
  getBlock(x: number, y: number, z: number) : Block {
    return this.blocks[x][y][z];
  }

  // Set a block at an xyz coordinate
  setBlock(x: number, y: number, z: number, block: Block) {
    this.blocks[x][y][z] = block;
  }

  // Get iterator for all non-air blocks in the chunk
  *getIterator(): Generator<[Vector3, Block], any, unknown> {
    for (var x = 0; x < CHUNK_SIZE; x++) {
      for (var y = 0; y < CHUNK_SIZE; y++) {
        for (var z = 0; z < CHUNK_SIZE; z++) {
          const block = this.blocks[x][y][z];
          if (block != Block.Air) {
            yield [new Vector3(x, y, z), block];
          }
        }
      }
    }
  }
}
