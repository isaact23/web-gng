import { Vector3 } from "babylonjs";
import { Face } from ".";

// Vertices for each face in a cube
const cubeVerts = [
  new Vector3(0,0,0),
  new Vector3(0,0,1),
  new Vector3(0,1,0),
  new Vector3(0,1,1),
  new Vector3(1,0,0),
  new Vector3(1,0,1),
  new Vector3(1,1,0),
  new Vector3(1,1,1)
];
const faceVerts = new Map<Face, number[]>();
faceVerts.set(Face.Front,  [1, 3, 7, 5]);
faceVerts.set(Face.Right,  [5, 7, 6, 4]);
faceVerts.set(Face.Back,   [4, 6, 2, 0]);
faceVerts.set(Face.Left,   [0, 2, 3, 1]);
faceVerts.set(Face.Top,    [3, 2, 6, 7]);
faceVerts.set(Face.Bottom, [1, 5, 4, 0]);

export { cubeVerts, faceVerts }