import { Biome, Block } from ".";

export class BiomeBlocks {
  public static getBlockFromBiome(biome: Biome): Block {
    switch (biome) {
      case Biome.Grasslands:
        return Block.Grass;
      case Biome.Desert:
        return Block.Sand;
      default:
        return Block.Stone;
    }
  }
}
