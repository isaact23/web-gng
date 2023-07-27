import {Block} from "./block";
import {Vector3} from "babylonjs";

// A world holds block data
export class World {
  blocks: {[x: number]: {[y: number]: {[z: number]: Block}}};

  constructor() {
    this.blocks = {}
  }

  getBlock(x: number, y: number, z: number) {
    return this.blocks[x][y][z];
  }

  setBlock(x: number, y: number, z: number, block: Block) {
    if (this.blocks[x] === undefined) { this.blocks[x] = {}};
    if (this.blocks[x][y] === undefined) { this.blocks[x][y] = {}};

    this.blocks[x][y][z] = block;
  }

  *getIterator(): Generator<[Vector3, Block], any, unknown> {
    for (const x in this.blocks) {
      for (const y in this.blocks[x]) {
        for (const z in this.blocks[x][y]) {
          yield [new Vector3(x, y, z), this.blocks[x][y][z]];
        }
      }
    }
  }
}
