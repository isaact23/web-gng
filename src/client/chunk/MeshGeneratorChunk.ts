import {Face, Block} from "../Block";
import {Vector3} from "babylonjs";
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

    // Vectors for each face (to get adjacent block)
    const faceVectors = new Map<Face, Vector3>();
    faceVectors.set(Face.Front, Vector3.Forward());
    faceVectors.set(Face.Right, Vector3.Right());
    faceVectors.set(Face.Back, Vector3.Backward());
    faceVectors.set(Face.Left, Vector3.Left());
    faceVectors.set(Face.Top, Vector3.Up());
    faceVectors.set(Face.Bottom, Vector3.Down());

    // Generate vertex and triangle data.
    // For each block in the chunk,
    for (let [coord, block] of blockIterator) {

      // For each face in the block,
      for (let face of Object.values(Face)) {
        if (typeof(face) === "string") continue;

        // Get adjacent block
        const faceVector = faceVectors.get(face);
        if (faceVector === undefined) continue;
        const adjCoord = coord.add(faceVector);
        const adjacentBlock = this.getBlock(adjCoord.x, adjCoord.y, adjCoord.z);

        // If the adjacent block is empty,
        if (adjacentBlock == Block.Air || adjacentBlock === undefined) {
          // Then render the face.

          // Get texture UVs
          const uvBlock = TextureManager.getTextureUvs(block, face);

          // Add vertices
          const vertIndices = faceVerts.get(face);
          if (vertIndices === undefined) continue;
          for (let i = 0; i < 4; i++) {
            const offset = cubeVerts[vertIndices[i]];
            const vertCoord = coord.add(offset);
            vertices.push(vertCoord.x, vertCoord.y, vertCoord.z);
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

    mesh.checkCollisions = true;

    return mesh;
  }
}
