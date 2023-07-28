import * as Babylon from "babylonjs";

export interface IMesh {
  // Add a vertex to the mesh (unless it already exists) and return its index.
  addVertex(x: number, y: number, z: number) : number;

  // Add a triangle between three vertex indices.
  addTriangle(a: number, b: number, c: number) : void;

  // Return the generated mesh.
  getMesh() : Babylon.Mesh;
}