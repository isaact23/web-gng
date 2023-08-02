import {Face, Block} from "../Block";
import {BasicChunk} from "./BasicChunk";

import * as TextureManager from "../TextureManager";
import * as Babylon from "babylonjs";

// TODO: Implement greedy meshing

// A MeshGeneratorChunk can generate a Babylon mesh with UV data from its block data.
export class MeshGeneratorChunk extends BasicChunk {

  generateMesh() : Babylon.Mesh {

    const blockIterator = this.getIterator();
    const chunkGlobalCoord = this.coordinate.multiplyByFloats(this.size, this.size, this.size);

    const vertices = new Array<number>;
    const triangles = new Array<number>;
    const uvs = new Array<number>;

    let vIndex = 0;

    // Generate vertex and triangle data.
    // For each block in the chunk,
    for (let [coord, block] of blockIterator) {

      const aboveBlock = this.getBlock(coord.x, coord.y + 1, coord.z);
      if (aboveBlock == Block.Air || aboveBlock === undefined) {

        const uvBlock = TextureManager.getTextureUvs(block, Face.Top);

        vertices.push(coord.x, coord.y + 1, coord.z);
        vertices.push(coord.x + 1, coord.y + 1, coord.z);
        vertices.push(coord.x + 1, coord.y + 1, coord.z + 1);
        vertices.push(coord.x, coord.y + 1, coord.z + 1);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        uvs.push(uvBlock[0], uvBlock[1]); // Bottom left
        uvs.push(uvBlock[2], uvBlock[1]); // Bottom right
        uvs.push(uvBlock[2], uvBlock[3]); // Top right
        uvs.push(uvBlock[0], uvBlock[3]); // Top left

        vIndex += 4;
      }

      const belowBlock = this.getBlock(coord.x, coord.y - 1, coord.z);
      if (belowBlock == Block.Air || belowBlock === undefined) {

        const uvBlock = TextureManager.getTextureUvs(block, Face.Bottom);

        vertices.push(coord.x, coord.y, coord.z);
        vertices.push(coord.x, coord.y, coord.z + 1);
        vertices.push(coord.x + 1, coord.y, coord.z + 1);
        vertices.push(coord.x + 1, coord.y, coord.z);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        uvs.push(uvBlock[0], uvBlock[1]); // Bottom left
        uvs.push(uvBlock[2], uvBlock[1]); // Bottom right
        uvs.push(uvBlock[2], uvBlock[3]); // Top right
        uvs.push(uvBlock[0], uvBlock[3]); // Top left

        vIndex += 4;
      }

      const frontBlock = this.getBlock(coord.x + 1, coord.y, coord.z);
      if (frontBlock == Block.Air || frontBlock === undefined) {

        const uvBlock = TextureManager.getTextureUvs(block, Face.Front);

        vertices.push(coord.x + 1, coord.y, coord.z);
        vertices.push(coord.x + 1, coord.y, coord.z + 1);
        vertices.push(coord.x + 1, coord.y + 1, coord.z + 1);
        vertices.push(coord.x + 1, coord.y + 1, coord.z);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        uvs.push(uvBlock[0], uvBlock[1]); // Bottom left
        uvs.push(uvBlock[2], uvBlock[1]); // Bottom right
        uvs.push(uvBlock[2], uvBlock[3]); // Top right
        uvs.push(uvBlock[0], uvBlock[3]); // Top left

        vIndex += 4;
      }

      const backBlock = this.getBlock(coord.x - 1, coord.y, coord.z);
      if (backBlock == Block.Air || backBlock === undefined) {

        const uvBlock = TextureManager.getTextureUvs(block, Face.Back);

        vertices.push(coord.x, coord.y, coord.z);
        vertices.push(coord.x, coord.y + 1, coord.z);
        vertices.push(coord.x, coord.y + 1, coord.z + 1);
        vertices.push(coord.x, coord.y, coord.z + 1);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        uvs.push(uvBlock[0], uvBlock[1]); // Bottom left
        uvs.push(uvBlock[2], uvBlock[1]); // Bottom right
        uvs.push(uvBlock[2], uvBlock[3]); // Top right
        uvs.push(uvBlock[0], uvBlock[3]); // Top left

        vIndex += 4;
      }

      const leftBlock = this.getBlock(coord.x, coord.y, coord.z - 1);
      if (leftBlock == Block.Air || leftBlock === undefined) {

        const uvBlock = TextureManager.getTextureUvs(block, Face.Left);

        vertices.push(coord.x, coord.y, coord.z); // Bottom left
        vertices.push(coord.x + 1, coord.y, coord.z); // Bottom right
        vertices.push(coord.x + 1, coord.y + 1, coord.z); // Top right
        vertices.push(coord.x, coord.y + 1, coord.z); // Top left
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        uvs.push(uvBlock[0], uvBlock[1]); // Bottom left
        uvs.push(uvBlock[2], uvBlock[1]); // Bottom right
        uvs.push(uvBlock[2], uvBlock[3]); // Top right
        uvs.push(uvBlock[0], uvBlock[3]); // Top left

        vIndex += 4;
      }

      const rightBlock = this.getBlock(coord.x, coord.y, coord.z + 1);
      if (rightBlock == Block.Air || rightBlock === undefined) {

        const uvBlock = TextureManager.getTextureUvs(block, Face.Back);

        vertices.push(coord.x, coord.y, coord.z + 1);
        vertices.push(coord.x, coord.y + 1, coord.z + 1);
        vertices.push(coord.x + 1, coord.y + 1, coord.z + 1);
        vertices.push(coord.x + 1, coord.y, coord.z + 1);
        
        triangles.push(vIndex, vIndex + 1, vIndex + 2);
        triangles.push(vIndex + 2, vIndex + 3, vIndex);

        uvs.push(uvBlock[0], uvBlock[1]); // Bottom left
        uvs.push(uvBlock[2], uvBlock[1]); // Bottom right
        uvs.push(uvBlock[2], uvBlock[3]); // Top right
        uvs.push(uvBlock[0], uvBlock[3]); // Top left

        vIndex += 4;
      }
    }

    // Generate the actual mesh object
    const mesh = new Babylon.Mesh("chunk");

    const vertexData = new Babylon.VertexData();
    vertexData.positions = vertices;
    vertexData.indices = triangles;
    vertexData.uvs = uvs;
    vertexData.applyToMesh(mesh);

    mesh.position = chunkGlobalCoord;

    const mat = new Babylon.StandardMaterial("tilemap");
    const tex = new Babylon.Texture("img/tilemap.png");
    tex.updateSamplingMode(Babylon.Texture.NEAREST_NEAREST);
    mat.diffuseTexture = tex;
    mesh.material = mat;

    return mesh;
  }
}
