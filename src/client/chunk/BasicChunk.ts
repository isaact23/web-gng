import {Block} from "../Block";
import {IChunk} from "./IChunk";
import {Vector3} from "babylonjs";

// A chunk holds block data
export class BasicChunk implements IChunk {

  protected blocks : Block[][][];
  protected size: number;

  // Create an empty chunk
  constructor(private coordinate: Vector3, size: number = 32) {
    this.blocks = [];
    this.size = size;

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
  getBlock(x: number, y: number, z: number) : Block | undefined {
    // Ensure the coordinates are within the bounds of the chunk
    if (x < 0 || y < 0 || z < 0) return undefined;
    if (x >= this.size || y >= this.size || z >= this.size) return undefined;

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
