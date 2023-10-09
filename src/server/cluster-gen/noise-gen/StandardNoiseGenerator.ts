import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";
import { INoiseGenerator } from "./INoiseGenerator";

/**
 * A noise generator that generates random coordinates to guide world generation.
 */
export class StandardNoiseGenerator implements INoiseGenerator {

  private coords: IAbsoluteCoordinate[];

  constructor
  (
    worldWidth: number,
    hillDensity: number,
    hillAltitude: number,
    hillSpan: number
  ) {
    // Generate random particles to represent hills
    this.coords = [];
    const hillCount = Math.floor(worldWidth * worldWidth / hillDensity);
    for (let i = 0; i < hillCount; i++) {
      let x = Math.floor(Math.random() * worldWidth);
      let y = Math.floor(Math.random() * hillSpan + hillAltitude);
      let z = Math.floor(Math.random() * worldWidth);
      this.coords.push(new AbsoluteCoordinate(x, y, z));
    }
  }

  /**
   * Get iterator for all noise blocks that will ever spawn within a
   * certain radius of a coordinate.
   * @param origin The origin from which to seek noise blocks.
   * @param radius The maximum distance from the origin to select noise blocks from.
   * @returns An iterator of IAbsoluteCoordinates of noise blocks that fall
   * within the specified radius of the specified origin, as well as their distances
   * from the origin.
   */
  *getIterator(origin: IAbsoluteCoordinate, radius?: number): Generator<[IAbsoluteCoordinate, number]> {
    for (let coord of this.coords) {
      let distance = Math.sqrt(
        Math.pow(origin.x - coord.x, 2) + 
        Math.pow(origin.y - coord.y, 2) + 
        Math.pow(origin.z - coord.z, 2)
      );
      if (radius == undefined || distance <= radius) {
        yield [coord, distance];
      }
    }
  }
}