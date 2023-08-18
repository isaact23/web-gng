import { Vector3 } from "babylonjs";

export enum Block {
  Air,
  Stone,
  Grass,
  Dirt
}

export enum Face {
  Front,
  Left,
  Back,
  Right,
  Top,
  Bottom
}

// Vectors for each face (to get adjacent block)
const faceVectors = new Map<Face, Vector3>();
faceVectors.set(Face.Front, Vector3.Forward());
faceVectors.set(Face.Right, Vector3.Right());
faceVectors.set(Face.Top, Vector3.Up());
faceVectors.set(Face.Back, Vector3.Backward());
faceVectors.set(Face.Left, Vector3.Left());
faceVectors.set(Face.Bottom, Vector3.Down());

// Get the Vector3 corresponding to a face.
export function getVectorFromFace(face: Face): Vector3 {
  const vec = faceVectors.get(face);
  if (vec === undefined) {
    throw "Failed to get vector from face";
  }
  return vec;
}

// Get the face corresponding to a Vector3.
// The vector must be perpendicular to the face.
export function getFaceFromVector(vec: Vector3): Face | undefined {
  for (let face of Object.values(Face)) {
    if (typeof(face) === "string") continue;

    const dot = Vector3.Dot(vec, getVectorFromFace(face));
    if (dot > 0.999) return face;
  }

  return undefined;
}