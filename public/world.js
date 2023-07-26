// A world holds block data

export class World {
  constructor() {
    this.blocks = {}
  }

  getBlock(x, y, z) {
    return this.blocks[x][y][z];
  }

  setBlock(x, y, z, block) {
    if (this.blocks[x] === undefined) { this.blocks[x] = {}};
    if (this.blocks[x][y] === undefined) { this.blocks[x][y] = {}};

    this.blocks[x][y][z] = block;
  }
}
