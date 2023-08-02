import {Block} from "../Block";
import {BasicChunk} from "./BasicChunk";

import * as Babylon from "babylonjs";

// A MeshGeneratorChunk can generate a Babylon mesh with UV data from its block data.
export class MeshGeneratorChunk extends BasicChunk {

  generateMesh() : Babylon.Mesh {

    const blockIterator = this.getIterator();
    const chunkGlobalCoord = this.coordinate.multiplyByFloats(this.size, this.size, this.size);

    const vertices = new Array<number>;
    const triangles = new Array<number>;

    let vIndex = 0;

    // TODO: Consolidate the redundant code blocks

    // Generate vertex and triangle data
    for (let [coord, block] of blockIterator) {

      const aboveBlock = this.getBlock(coord.x, coord.y + 1, coord.z);
      if (aboveBlock == Block.Air || aboveBlock === undefined) {

        vertices.push(coord.x, coord.y + 1, coord.z);
        vertices.push(coord.x + 1, coord.y + 1, coord.z);
        vertices.push(coord.x + 1, coord.y + 1, coord.z + 1);
        vertices.push(coord.x, coord.y + 1, coord.z + 1);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        vIndex += 4;
      }

      const belowBlock = this.getBlock(coord.x, coord.y - 1, coord.z);
      if (belowBlock == Block.Air || belowBlock === undefined) {

        vertices.push(coord.x, coord.y, coord.z);
        vertices.push(coord.x, coord.y, coord.z + 1);
        vertices.push(coord.x + 1, coord.y, coord.z + 1);
        vertices.push(coord.x + 1, coord.y, coord.z);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        vIndex += 4;
      }

      const frontBlock = this.getBlock(coord.x + 1, coord.y, coord.z);
      if (frontBlock == Block.Air || frontBlock === undefined) {

        vertices.push(coord.x + 1, coord.y, coord.z);
        vertices.push(coord.x + 1, coord.y, coord.z + 1);
        vertices.push(coord.x + 1, coord.y + 1, coord.z + 1);
        vertices.push(coord.x + 1, coord.y + 1, coord.z);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        vIndex += 4;
      }

      const backBlock = this.getBlock(coord.x - 1, coord.y, coord.z);
      if (backBlock == Block.Air || backBlock === undefined) {

        vertices.push(coord.x, coord.y, coord.z);
        vertices.push(coord.x, coord.y + 1, coord.z);
        vertices.push(coord.x, coord.y + 1, coord.z + 1);
        vertices.push(coord.x, coord.y, coord.z + 1);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        vIndex += 4;
      }

      const leftBlock = this.getBlock(coord.x, coord.y, coord.z - 1);
      if (leftBlock == Block.Air || leftBlock === undefined) {

        vertices.push(coord.x, coord.y, coord.z);
        vertices.push(coord.x + 1, coord.y, coord.z);
        vertices.push(coord.x + 1, coord.y + 1, coord.z);
        vertices.push(coord.x, coord.y + 1, coord.z);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        vIndex += 4;
      }

      const rightBlock = this.getBlock(coord.x, coord.y, coord.z + 1);
      if (rightBlock == Block.Air || rightBlock === undefined) {

        vertices.push(coord.x, coord.y, coord.z + 1);
        vertices.push(coord.x, coord.y + 1, coord.z + 1);
        vertices.push(coord.x + 1, coord.y + 1, coord.z + 1);
        vertices.push(coord.x + 1, coord.y, coord.z + 1);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        vIndex += 4;
      }
    }

    // Generate the actual mesh object
    const mesh = new Babylon.Mesh("chunk");

    const vertexData = new Babylon.VertexData();
    vertexData.positions = vertices;
    vertexData.indices = triangles;
    vertexData.applyToMesh(mesh);

    mesh.position = chunkGlobalCoord;

    const mat = new Babylon.StandardMaterial("stone");
    mat.diffuseTexture = new Babylon.Texture("img/stone.png");
    mesh.material = mat;

    return mesh;
  }
}
