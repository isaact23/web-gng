/**
 * The base interface for any type of immutable coordinate.
 */
export interface ICoordinate {
  new (x: number, y: number, z: number): ICoordinate;
  readonly x: number;
  readonly y: number;
  readonly z: number;
}