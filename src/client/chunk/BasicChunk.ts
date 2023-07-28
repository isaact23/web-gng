import {Block} from "../Block";
import {IChunk} from "./IChunk";
import {Vector3} from "babylonjs";

const CHUNK_SIZE = 32;

// A chunk holds block data
export class BasicChunk implements IChunk {

  private blocks : Block[][][];

  // Create an empty chunk
  constructor(private coordinate: Vector3) {
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

  // Get the size (width, length, height) of a chunk in blocks
  getSize() {
    return CHUNK_SIZE;
  }

  // Get the block at an xyz coordinate
  getBlock(x: number, y: number, z: number) : Block | undefined {
    // Ensure the coordinates are within the bounds of the chunk
    if (x < 0 || y < 0 || z < 0) return undefined;
    if (x >= CHUNK_SIZE || y >= CHUNK_SIZE || z >= CHUNK_SIZE) return undefined;

    return this.blocks[x][y][z];
  }

  // Set a block at an xyz coordinate
  setBlock(x: number, y: number, z: number, block: Block) : void {
    this.blocks[x][y][z] = block;
  }

  // Get the coordinate of this chunk.
  getCoordinate() : Vector3 {
    return this.coordinate;
  }

  // Get iterator for local-space positions of all non-air blocks in the chunk
  *getLocalSpaceIterator() : Generator<[Vector3, Block], any, unknown> {
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

  // Get iterator for world-space positions of all non-air blocks in the chunk
  *getWorldSpaceIterator() : Generator<[Vector3, Block], any, unknown> {
    const offset = this.coordinate.multiplyByFloats(CHUNK_SIZE, CHUNK_SIZE, CHUNK_SIZE);

    for (var x = 0; x < CHUNK_SIZE; x++) {
      for (var y = 0; y < CHUNK_SIZE; y++) {
        for (var z = 0; z < CHUNK_SIZE; z++) {
          const block = this.blocks[x][y][z];
          if (block != Block.Air) {
            yield [new Vector3(x, y, z).add(offset), block];
          }
        }
      }
    }
  }
}
