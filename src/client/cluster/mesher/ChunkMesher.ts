import * as Babylon from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core";

import { IChunkData } from "@share/data/cluster-data/chunk-data";
import { IClusterData } from "@share/data/cluster-data";

import { Block, Face } from "@share/utility";
import * as Utility from "@share/utility";
import { cubeVerts, faceVerts } from "@share/utility/CubeVerts";
import { AssetManager } from "@client/assets";
import { IChunkMesher } from "./IChunkMesher";

/**
 * A naive chunk mesher algorithm.
 */
export class ChunkMesher implements IChunkMesher {

  /**
   * Convert block data for a chunk from a cluster into a mesh.
   * TODO: Add await calls
   */
  async generateChunkMesh(
    chunk: IChunkData,
    cluster: IClusterData,
    assetManager: AssetManager
  ): Promise<Babylon.Mesh> {
    
    // Initialize arrays for mesh data
    const vertices = new Array<number>;
    const normals = new Array<number>;
    const triangles = new Array<number>;
    const uvs = new Array<number>;

    let vIndex = 0;

    // Generate vertex and triangle data.
    // For each block in the chunk,
    for (let [coord, block] of chunk) {

      const absoluteCoord = coord.getAbsoluteCoordinate();

      // For each face in the block,
      for (let face of Object.values(Face)) {
        if (typeof(face) === "string") continue;

        // Get adjacent block
        const faceVector = Utility.FaceVectorConverter.getVectorFromFace(face);
        if (faceVector === undefined) continue;

        const adjCoord = absoluteCoord.addScalars(faceVector.x, faceVector.y, faceVector.z);
        const adjBlock = cluster.getBlock(adjCoord);

        // If the adjacent block is empty,
        if (adjBlock == Block.Air || adjBlock === undefined) {
          // Then render the face.

          // Get texture UVs
          const uvBlock = Utility.TextureUvCalculator.getTextureUvs(block, face);

          // Add vertices and normals
          const vertIndices = faceVerts.get(face);
          if (vertIndices === undefined) continue;
          for (let i = 0; i < 4; i++) {
            const offset = cubeVerts[vertIndices[i]];
            const vertCoord = coord.vec().add(offset);
            vertices.push(vertCoord.x, vertCoord.y, vertCoord.z);
            normals.push(faceVector.x, faceVector.y, faceVector.z);
          }
          
          // Add triangles
          triangles.push(vIndex, vIndex + 1, vIndex + 2);
          triangles.push(vIndex + 2, vIndex + 3, vIndex);
          vIndex += 4;

          // Add UVs
          uvs.push(uvBlock[0], uvBlock[1]); // Bottom left
          uvs.push(uvBlock[0], uvBlock[3]); // Top left
          uvs.push(uvBlock[2], uvBlock[3]); // Top right
          uvs.push(uvBlock[2], uvBlock[1]); // Bottom Right
        }
      }
    }

    // Generate the mesh object
    const mesh = new Babylon.Mesh("chunk");

    const vertexData = new Babylon.VertexData();
    vertexData.positions = vertices;
    vertexData.normals = normals;
    vertexData.indices = triangles;
    vertexData.uvs = uvs;
    vertexData.applyToMesh(mesh);

    mesh.position = chunk.getCoordinate().getAbsoluteCoordinate().vec();
    mesh.material = assetManager.materialManager.getTilemapMaterial();

    mesh.checkCollisions = true;
    mesh.receiveShadows = true;

    return mesh;
  }
}
