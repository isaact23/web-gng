/**
 * Interface for absolute coordinate in world space,
 * not relative to any chunk.
 */
export interface IAbsoluteCoordinate {
  get x(): number;
  get y(): number;
  get z(): number;
}