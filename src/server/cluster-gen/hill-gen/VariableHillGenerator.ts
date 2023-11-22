import { AbsoluteCoordinate, IAbsoluteCoordinate } from "@share/data/coordinate";
import { IHillGenerator } from "./IHillGenerator";

/**
 * A hill generator that has different magnitudes for different noise particles.
 */
export class VariableHillGenerator implements IHillGenerator {

  // An array of noise coordinates along with respective magnitudes.
  private coordMagnitudeArray: [IAbsoluteCoordinate, number][];

  constructor (
    WORLD_WIDTH: number = 100,
    HILL_DENSITY: number = 160,
    private readonly HILL_ALTITUDE: number = 2,
    private readonly HILL_SPAN: number = 20,
    private readonly HILL_GRADE: number = 0.3,
    private readonly HILL_WIDTH: number = 5
  ) {
    
    // Generate random particles to guide hill formation
    this.coordMagnitudeArray = [];
    const hillCount = Math.floor(WORLD_WIDTH * WORLD_WIDTH / HILL_DENSITY);
    for (let i = 0; i < hillCount; i++) {
      let x = Math.floor(Math.random() * WORLD_WIDTH);
      let y = Math.floor(Math.random() * HILL_SPAN + HILL_ALTITUDE);
      let z = Math.floor(Math.random() * WORLD_WIDTH);
      let magnitude = 1 + (Math.random() * 10);
      this.coordMagnitudeArray.push([new AbsoluteCoordinate(x, y, z), magnitude]);
    }
  }

  /**
   * Given x and z coordinates, get the y coordinate of the hills.
   */
  getYFromXZ(x: number, z: number): number {

    const origin = new AbsoluteCoordinate(x, this.HILL_ALTITUDE + Math.floor(this.HILL_SPAN / 2), z);

    // Determine how high this column should be based on surrounding particles
    let ySum = 0;
    let influenceSum = 0;
    for (let coordMagnitude of this.coordMagnitudeArray) {
      const coord = coordMagnitude[0];
      const magnitude = coordMagnitude[1];

      let distance = (coord.vec().subtract(origin.vec())).length();

      // Logistic curve
      let denom = (1 + Math.pow(Math.E, (this.HILL_GRADE * (distance - this.HILL_WIDTH))));
      let influence;
      if (denom == 0) {
        influence = 0;
      } else {
        influence = magnitude / denom;
      }

      ySum += coord.y * influence;
      influenceSum += influence;
    }

    // Calculate weighted average
    let y;
    if (influenceSum == 0) {
      y = 0;
    } else {
      y = Math.floor(ySum / influenceSum);
    }

    return y;
  }
}