// A world holds block data

export class World {
  blocks: {[x: number]: {[y: number]: {[z: number]: number}}};

  constructor() {
    this.blocks = {}
  }

  getBlock(x: number, y: number, z: number) {
    return this.blocks[x][y][z];
  }

  setBlock(x: number, y: number, z: number, block: number) {
    if (this.blocks[x] === undefined) { this.blocks[x] = {}};
    if (this.blocks[x][y] === undefined) { this.blocks[x][y] = {}};

    this.blocks[x][y][z] = block;
  }
}
