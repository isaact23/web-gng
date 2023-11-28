import * as Babylon from "babylonjs";

import { IChunkData } from "@share/data/cluster-data/chunk-data";
import { IChunkMesher } from ".";
import { IClusterData } from "@share/data/cluster-data";
import { IAssetManager } from "@client/assets";
import { Vector3 } from "babylonjs";

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

    throw new Error("GreedyChunkMesher generateChunkMesh() not implemented");

    const vertices = new Array<number>(
      0, 0, 0, 0, 0, 10, 10, 0, 10, 10, 0, 0
    );
    const triangles = new Array<number>(
      0, 1, 2, 2, 3, 0
    );
    const normals = new Array<number>(
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
    );
    const uvs = new Array<number>(
      0,0,0,0,0,0,0,0,0,0,0,0
    );

    const mesh = new Babylon.Mesh("chunk");

    const vertexData = new Babylon.VertexData();
    vertexData.positions = vertices;
    vertexData.indices = triangles;
    vertexData.normals = normals;
    vertexData.uvs = uvs;
    vertexData.applyToMesh(mesh);

    const mat = new Babylon.StandardMaterial("Grass");
    mat.diffuseColor = new Babylon.Color3(0.2, 0.8, 0.1);
    mesh.material = mat;

    mesh.position = new Vector3(0, 0, 0);

    return mesh;
  }
}