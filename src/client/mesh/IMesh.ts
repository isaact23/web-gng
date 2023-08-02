import * as Babylon from "babylonjs";

export interface IMesh {
  // Add a vertex to the mesh and return its index.
  addVertex(x: number, y: number, z: number) : number;

  // Add a triangle between three vertex indices.
  addTriangle(a: number, b: number, c: number) : void;

  // Add uvs to the mesh.
  addUvs() : void;

  // Return the generated mesh.
  getMesh() : Babylon.Mesh;
}