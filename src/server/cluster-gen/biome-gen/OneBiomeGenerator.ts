import { Biome } from "@share/utility";
import { IContinuousBiomeGenerator } from ".";
import { BiomeComposition, IBiomeComposition } from "./biome-composition";

/**
 * A biome generator that always returns the same biome
 */
export class OneBiomeGenerator implements IContinuousBiomeGenerator {
  constructor(private biome: Biome) {}

  /**
   * Given an x and z value, get the biomes and percentage compositions.
   */
  getBiomesFromXZ(x: number, z: number): IBiomeComposition {
    const comp = new BiomeComposition();
    comp.addBiomePercentage(this.biome, 1);
    return comp;
  }
}