/**
 * Interface for hill generators.
 */
export interface IHillGenerator {
  /**
   * Given x and z coordinates, get the y coordinate of the hills.
   */
  getYFromXZ(x: number, z: number): number;
}