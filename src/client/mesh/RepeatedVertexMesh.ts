import * as Babylon from "babylonjs";
import { IMesh } from "./IMesh";

// A mesh that can have repeated vertices.
export class RepeatedVertexMesh implements IMesh {

  private nextVertexIndex: number;
  private vertexData: Babylon.VertexData;
  private mesh: Babylon.Mesh;
  private material: Babylon.Material | undefined;

  private positions: Array<number>;
  private indices: Array<number>;
  //private uvs: Array<number>;

  constructor() {
    this.nextVertexIndex = -1;
    this.vertexData = new Babylon.VertexData();
    this.mesh = new Babylon.Mesh("chunk");

    this.positions = [];
    this.indices = [];
    //this.uvs = [];
  }

  // Add a vertex to the mesh and return its index.
  addVertex(x: number, y: number, z: number) : number {

    this.nextVertexIndex++;

    this.positions.push(x);
    this.positions.push(y);
    this.positions.push(z);

    return this.nextVertexIndex;
  }

  // Add a triangle between three vertex indices.
  addTriangle(a: number, b: number, c: number) : void {
    this.indices.push(a);
    this.indices.push(b);
    this.indices.push(c);
  }

  // Add uvs to the mesh.
  addUvs() : void {
    //this.uvs = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
  }

  // Return the generated mesh.
  getMesh() : Babylon.Mesh {
    this.vertexData.positions = this.positions;
    this.vertexData.indices = this.indices;
    //this.vertexData.uvs = this.uvs;
    this.vertexData.applyToMesh(this.mesh);
    return this.mesh;
  }
}