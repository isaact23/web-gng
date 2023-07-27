import {Block} from "./block";
import {Vector3} from "babylonjs";

// A world holds block data
export class World {

  private blocks = new Map<number, Map<number, Map<number, Block>>>;

  constructor() {}

  getBlock(x: number, y: number, z: number) {
    return this.blocks.get(x)?.get(y)?.get(z);
  }

  setBlock(x: number, y: number, z: number, block: Block) {

    // Add keys to dictionary
    if (!this.blocks.has(x)) {
      this.blocks.set(x, new Map<number, Map<number, Block>>)
    };
    if (!this.blocks.get(x)!.has(y)) {
      this.blocks.get(x)!.set(y, new Map<number, Block>);
    }

    this.blocks.get(x)!.get(y)!.set(z, block);
  }

  *getIterator(): Generator<[Vector3, Block], any, unknown> {
    for (const x of this.blocks) {
      for (const y in this.blocks.get(x)) {
        for (const z in this.blocks[x][y]) {
          yield [new Vector3(x, y, z), this.blocks[x][y][z]];
        }
      }
    }
  }
}
