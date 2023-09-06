import { IClusterManager } from "./IClusterManager";
import { IAssetManager } from "@client/assets";
import { IClusterData } from "@share/cluster/data";
import { Face, Block } from "@share/utility";

import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

export class ClusterManager implements IClusterManager {

  /**
   * Keep track of which chunks need to be re-meshed.
   */
  private dirtyChunks: Map<number, Map<number, Map<number, boolean>>>;
    
  constructor(
    private clusterData: IClusterData,
    private readonly shadowGenerator: Babylon.ShadowGenerator,
    private readonly assetManager: IAssetManager,
  ) {
    this.dirtyChunks = new Map<number, Map<number, Map<number, boolean>>>;

    // Initialize all chunks as needing update
    const chunkIt = clusterData.getIterator();
    for (let chunk of chunkIt) {
      let coord = chunk.getCoordinate();

      if (this.dirtyChunks.get(coord.x) == undefined) {
        this.dirtyChunks.set(coord.x, new Map<number, Map<number, boolean>>);
      }
      if (this.dirtyChunks.get(coord.x)!.get(coord.y) == undefined) {
        this.dirtyChunks.get(coord.x)!.set(coord.y, new Map<number, boolean>);
      }
      this.dirtyChunks.get(coord.x)!.get(coord.y)!.set(coord.z, true);
    }
  }

  // Add a new chunk. Replace any chunk in its spot.
  addChunk(chunk: IChunkData) : void {

  }

  // Get the chunk at a coordinate
  getChunk(pos: Vector3) : IChunkData | undefined {

  }

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3) : Block | undefined {

  }

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void {


    // Set dirty flags for affected chunks
    /*if (block == Block.Air) {
      if (pos.x == 0) this.parentCluster.getChunk(this.coordinate.add(Vector3.Left()))?.flagDirty();
      if (pos.y == 0) this.parentCluster.getChunk(this.coordinate.add(Vector3.Down()))?.flagDirty();
      if (pos.z == 0) this.parentCluster.getChunk(this.coordinate.add(Vector3.Backward()))?.flagDirty();
      if (pos.x >= this.size - 1) this.parentCluster.getChunk(this.coordinate.add(Vector3.Right()))?.flagDirty();
      if (pos.y >= this.size - 1) this.parentCluster.getChunk(this.coordinate.add(Vector3.Up()))?.flagDirty();
      if (pos.z >= this.size - 1) this.parentCluster.getChunk(this.coordinate.add(Vector3.Forward()))?.flagDirty();
    }*/
  }

  // Get iterator for all chunks in the world
  getIterator(): Generator<IChunkData> {

  }

  // Load or reload chunk meshes in the world.
  remesh(): void {
    let chunkIterator = this.clusterData.getIterator();
    for (let chunk of chunkIterator) {
      chunk.remesh();
    }
  }



  // Load or reload chunk meshes in the world.
  remesh(): void {
    if (!this.isDirty) return;

    const oldMesh = this.mesh;
    const shadowMap = this.shadowGenerator.getShadowMap();

    // Replace old mesh
    const newMesh = this._generateMesh();
    shadowMap?.renderList?.push(newMesh);
    if (oldMesh != null) {
      oldMesh.dispose();
    }
    this.mesh = newMesh;

    // Clear dirty flag - no remesh needed until next block change
    this.isDirty = false;
  }

  // Convert block data into a mesh
  _generateMesh(): Babylon.Mesh {

    const blockIterator = this.getIterator();
    const chunkGlobalCoord = this.coordinate.multiplyByFloats(this.size, this.size, this.size);

    const vertices = new Array<number>;
    const normals = new Array<number>;
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

    // Generate vertex and triangle data.
    // For each block in the chunk,
    for (let [coord, block] of blockIterator) {

      // For each face in the block,
      for (let face of Object.values(Face)) {
        if (typeof(face) === "string") continue;

        // Get adjacent block
        const faceVector = Utility.FaceVectorConverter.getVectorFromFace(face);

        if (faceVector === undefined) continue;
        const adjCoord = coord.add(faceVector);
        let adjacentBlock = this.getBlock(adjCoord);

        // If block was not found in this chunk, look in the cluster.
        if (adjacentBlock === undefined) {
          const adjacentGlobalCoord = adjCoord.add(chunkGlobalCoord);
          adjacentBlock = this.parentCluster.getBlock(adjacentGlobalCoord);
        }

        // If the adjacent block is empty,
        if (adjacentBlock == Block.Air || adjacentBlock === undefined) {
          // Then render the face.

          // Get texture UVs
          const uvBlock = Utility.TextureUvCalculator.getTextureUvs(block, face);

          // Add vertices
          const vertIndices = faceVerts.get(face);
          if (vertIndices === undefined) continue;
          for (let i = 0; i < 4; i++) {
            const offset = cubeVerts[vertIndices[i]];
            const vertCoord = coord.add(offset);
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

    mesh.position = chunkGlobalCoord;
    mesh.material = this.assetManager.getMaterialManager().getTilemapMaterial();

    mesh.checkCollisions = true;
    mesh.receiveShadows = true;

    return mesh;
  }
}