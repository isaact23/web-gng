import { Biome } from "@share/utility/Biome";
import { IDiscreteBiomeGenerator } from "../biome-gen/discrete-biome-gen";
import { IHillGenerator } from "./IHillGenerator";

const GRASSLANDS_HEIGHT = 10;
const DESERT_HEIGHT = 20;
const DEFAULT_HEIGHT = 0;

/**
 * A hill generator that generates different heights for different biomes.
 */
export class IndicatorHillGenerator implements IHillGenerator {

  constructor(private biomeGen: IDiscreteBiomeGenerator) {}

  getYFromXZ(x: number, z: number): number {

    const biome = this.biomeGen.getBiomeFromXZ(x, z);
    switch (biome) {
      case (Biome.Grasslands): return GRASSLANDS_HEIGHT;
      case (Biome.Desert):     return DESERT_HEIGHT;
      default:                 return DEFAULT_HEIGHT;
    }
  }
}
