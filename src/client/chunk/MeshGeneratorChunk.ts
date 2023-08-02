import {Block} from "../Block";
import {BasicChunk} from "./BasicChunk";

import * as Mesh from "../mesh/Mesh";
import * as Babylon from "babylonjs";

// A MeshGeneratorChunk can generate a Babylon mesh with UV data from its block data.
export class MeshGeneratorChunk extends BasicChunk {

  generateMesh() : Babylon.Mesh {

    const blockIterator = this.getIterator();
    const chunkGlobalCoord = this.coordinate.multiplyByFloats(this.size, this.size, this.size);

    const mesh: Mesh.IMesh = new Mesh.RepeatedVertexMesh();

    for (let [coord, block] of blockIterator) {

      const aboveBlock = this.getBlock(coord.x, coord.y + 1, coord.z);
      if (aboveBlock == Block.Air || aboveBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y + 1, coord.z);
        const v2 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z);
        const v3 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z + 1);
        const v4 = mesh.addVertex(coord.x, coord.y + 1, coord.z + 1);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const belowBlock = this.getBlock(coord.x, coord.y - 1, coord.z);
      if (belowBlock == Block.Air || belowBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y, coord.z);
        const v2 = mesh.addVertex(coord.x, coord.y, coord.z + 1);
        const v3 = mesh.addVertex(coord.x + 1, coord.y, coord.z + 1);
        const v4 = mesh.addVertex(coord.x + 1, coord.y, coord.z);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const frontBlock = this.getBlock(coord.x + 1, coord.y, coord.z);
      if (frontBlock == Block.Air || frontBlock === undefined) {

        const v1 = mesh.addVertex(coord.x + 1, coord.y, coord.z);
        const v2 = mesh.addVertex(coord.x + 1, coord.y, coord.z + 1);
        const v3 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z + 1);
        const v4 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const backBlock = this.getBlock(coord.x - 1, coord.y, coord.z);
      if (backBlock == Block.Air || backBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y, coord.z);
        const v2 = mesh.addVertex(coord.x, coord.y + 1, coord.z);
        const v3 = mesh.addVertex(coord.x, coord.y + 1, coord.z + 1);
        const v4 = mesh.addVertex(coord.x, coord.y, coord.z + 1);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const leftBlock = this.getBlock(coord.x, coord.y, coord.z - 1);
      if (leftBlock == Block.Air || leftBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y, coord.z);
        const v2 = mesh.addVertex(coord.x + 1, coord.y, coord.z);
        const v3 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z);
        const v4 = mesh.addVertex(coord.x, coord.y + 1, coord.z);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }

      const rightBlock = this.getBlock(coord.x, coord.y, coord.z + 1);
      if (rightBlock == Block.Air || rightBlock === undefined) {

        const v1 = mesh.addVertex(coord.x, coord.y, coord.z + 1);
        const v2 = mesh.addVertex(coord.x, coord.y + 1, coord.z + 1);
        const v3 = mesh.addVertex(coord.x + 1, coord.y + 1, coord.z + 1);
        const v4 = mesh.addVertex(coord.x + 1, coord.y, coord.z + 1);
        
        mesh.addTriangle(v1, v2, v3);
        mesh.addTriangle(v3, v4, v1);
      }
    }

    const builtMesh = mesh.getMesh();
    builtMesh.position = chunkGlobalCoord;

    const mat = new Babylon.StandardMaterial("stone");
    mat.diffuseTexture = new Babylon.Texture("img/stone.png");
    builtMesh.material = mat;

    return builtMesh;
  }
}
