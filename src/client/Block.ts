import { Vector3 } from "babylonjs";

export enum Block {
  Air,
  Stone,
  Grass
}

export enum Face {
  Front,
  Left,
  Back,
  Right,
  Top,
  Bottom
}

export function getFaceVectors() : [Face, Vector3][] {
  return [
    [Face.Front, Vector3.Forward()],
    [Face.Left, Vector3.Left()],
    [Face.Back, Vector3.Backward()],
    [Face.Right, Vector3.Right()],
    [Face.Top, Vector3.Up()],
    [Face.Bottom, Vector3.Down()]
  ];
}