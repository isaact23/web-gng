import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

import { IChunkMesher } from ".";
import { IChunkData } from "@share/data/cluster-data/chunk-data";
import { IClusterData } from "@share/data/cluster-data";

import { Block, Face } from "@share/utility";
import * as Utility from "@share/utility";
import { IAssetManager } from "@client/assets";
import { cubeVerts, faceVerts } from "@share/utility/CubeVerts";

/**
 * A chunk mesher implementation that combines redundant faces.
 */
export class GreedyChunkMesher implements IChunkMesher {

  /**
   * Convert block data for a chunk from a cluster into a mesh.
   */
  generateChunkMesh(
    chunk: IChunkData,
    cluster: IClusterData,
    assetManager: IAssetManager
  ): Babylon.Mesh {

    // Initialize arrays for mesh data
    const vertices = new Array<number>;
    const normals = new Array<number>;
    const triangles = new Array<number>;
    const uvs = new Array<number>;

    vertices.push(0, 0, 0, 50, 0, 0, 50, 0, 50, 0, 0, 50);
    normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
    triangles.push(0, 1, 2, 2, 3, 0);

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

    mesh.position = chunk.getCoordinate().getAbsoluteCoordinate().vec();
    mesh.material = mat;

    mesh.checkCollisions = true;
    mesh.receiveShadows = true;

    return mesh;
  }
}