import * as Babylon from "babylonjs";
import { IMesh } from "./IMesh";

export class BasicMesh implements IMesh {

  private nextIndex: number;
  private vertexData: Babylon.VertexData;
  private mesh: Babylon.Mesh;

  private vertexIndexMapping: {[x: number]: {[y: number]: {[z: number]: number}}};
  private positions: Array<number>;
  private indices: Array<number>;

  constructor() {
    this.nextIndex = -1;
    this.vertexData = new Babylon.VertexData();
    this.mesh = new Babylon.Mesh("chunk");

    this.vertexIndexMapping = {};
    this.positions = [];
    this.indices = [];
  }

  // Add a vertex to the mesh (unless it already exists) and return its index.
  addVertex(x: number, y: number, z: number) : number {
    if (this.vertexIndexMapping[x] === undefined) {
      this.vertexIndexMapping[x] = {};
    }
    if (this.vertexIndexMapping[x][y] === undefined) {
      this.vertexIndexMapping[x][y] = {};
    }
    if (this.vertexIndexMapping[x][y][z] === undefined) {
      this.nextIndex++;
      this.vertexIndexMapping[x][y][z] = this.nextIndex;

      this.positions.push(x);
      this.positions.push(y);
      this.positions.push(z);

      return this.nextIndex;
    }

    return this.vertexIndexMapping[x][y][z];
  }

  // Add a triangle between three vertex indices.
  addTriangle(a: number, b: number, c: number) : void {
    this.indices.push(a);
    this.indices.push(b);
    this.indices.push(c);
  }

  // Return the generated mesh.
  getMesh() : Babylon.Mesh {
    this.vertexData.positions = this.positions;
    this.vertexData.indices = this.indices;
    this.vertexData.applyToMesh(this.mesh);
    return this.mesh;
  }
}