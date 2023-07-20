// A world holds block data

class World {
  constructor() {
    this.blocks = {}
  }

  getBlock(x, y, z) {
    return this.blocks[x][y][z];
  }

  setBlock(x, y, z, block) {
    this.blocks[x][y][z] = block;
  }
}
