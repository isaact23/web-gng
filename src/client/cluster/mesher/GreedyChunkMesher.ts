import * as Babylon from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core";

import { IChunkData } from "@share/data/cluster-data/chunk-data";
import { IClusterData } from "@share/data/cluster-data";

import { Block, Face } from "@share/utility";
import * as Utility from "@share/utility";
import { cubeVerts, faceVerts } from "@share/utility/CubeVerts";
import { IChunkMesher } from "./IChunkMesher";
import { AssetManager } from "@client/assets";

/**
 * A chunk mesher implementation that combines redundant faces.
 */
export class GreedyChunkMesher implements IChunkMesher {

  /**
   * Convert block data for a chunk from a cluster into a mesh.
   */
  async generateChunkMesh(
    chunk: IChunkData,
    cluster: IClusterData,
    assetManager: AssetManager
  ): Promise<Babylon.Mesh> {

    throw new Error("Not implemented");

    // Initialize arrays for mesh data
    const vertices = new Array<number>;
    const normals = new Array<number>;
    const triangles = new Array<number>;
    const uvs = new Array<number>;

    const chunkSize = chunk.getSize();

    let vIndex = 0;

    for (let x = 0; x < chunkSize; x++) {
      for (let z = 0; z < chunkSize; z++) {
        
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

    const mat = new Babylon.StandardMaterial("grass");
    mat.diffuseColor = new Babylon.Color3(0.4, 0.6, 0.3);
    mat.specularColor = Babylon.Color3.Black();
    mat.wireframe = true;

    mesh.position = chunk.getCoordinate().getAbsoluteCoordinate().vec();
    mesh.material = mat;

    mesh.checkCollisions = true;
    mesh.receiveShadows = true;

    return mesh;
  }
}