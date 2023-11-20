import { Biome } from "@share/utility/Biome";
import { logistic } from "../../Logistic";
import { IContinuousBiomeGenerator } from "./IContinuousBiomeGenerator";

/**
 * Class for biome placement generator
 */
export class ContinuousBiomeGenerator implements IContinuousBiomeGenerator {

  public points: [number, number, Biome][]

  constructor (
    WORLD_WIDTH: number,
    BIOME_WIDTH: number,
    private readonly BORDER_GRADE = 0.3
  ) {
    this.points = [];
    const biomeCount = Math.floor((WORLD_WIDTH * WORLD_WIDTH) / (BIOME_WIDTH * BIOME_WIDTH));
    const biomes = Object.values(Biome).filter(v => typeof(v) !== "string") as Biome[];

    for (let i = 0; i < biomeCount; i++) {
      this.points.push([
        Math.floor(Math.random() * WORLD_WIDTH),
        Math.floor(Math.random() * WORLD_WIDTH),
        biomes[Math.floor(Math.random() * biomes.length)]
      ]);
    }
  }

  /**
   * Given an x and z value, get the biome.
   */
  getBiomeFromXZ(x: number, z: number): Biome {

    let biomeInfluences = new Map<Biome, number>();

    // Calculate biome influence on this point
    for (let point of this.points) {

      const distance = Math.sqrt(Math.pow(point[0] - x, 2) + Math.pow(point[1] - z, 2));
      let influence = logistic(distance, 1, -this.BORDER_GRADE, 0);

      if (influence == undefined) {
        influence = 0;
      }

      const biome = point[2];
      const oldInfluence = biomeInfluences.get(biome)
      if (oldInfluence == undefined) {
        biomeInfluences.set(biome, influence);
      } else {
        biomeInfluences.set(biome, oldInfluence + influence);
      }
    }

    // Determine which biome has the most influence
    let topBiome: Biome | undefined;
    let maxInfluence = 0;

    for (let biome of biomeInfluences.keys()) {
      const influence = biomeInfluences.get(biome);
      if (influence != undefined && influence > maxInfluence) {
        maxInfluence = influence;
        topBiome = biome;
      }
    }

    // Return results
    if (topBiome == undefined) {
      return Biome.Grasslands;
    }
    return topBiome;
  }
}
