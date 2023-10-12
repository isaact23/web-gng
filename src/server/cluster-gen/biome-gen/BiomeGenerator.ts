import { Biome } from "@share/utility/Biome";
import { IBiomeGenerator } from ".";

/**
 * Class for biome placement generator
 */
export class BiomeGenerator implements IBiomeGenerator {

  private points: [number, number, Biome][]

  constructor (
    WORLD_WIDTH: number,
    BIOME_WIDTH: number
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

    let closestBiome: Biome | undefined;
    let biomeDistance: number | undefined;

    // Find the closest point to the given point
    for (let point of this.points) {
      const distance = Math.sqrt(Math.pow(point[0] - x, 2) + Math.pow(point[1] - z, 2));

      if (biomeDistance == undefined || distance < biomeDistance) {
        closestBiome = point[2];
        biomeDistance = distance;
      }
    }

    if (closestBiome == undefined) {
      return Biome.Grasslands;
    }

    return closestBiome;
  }
}
