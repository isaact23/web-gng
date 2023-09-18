import { IClusterClient } from ".";
import { IAssetManager } from "@client/assets";
import { IClusterData } from "@share/cluster-data";
import { IChunkData } from "@share/cluster-data/chunk";
import { IGrid, Grid } from "@share/data/grid";
import { Face, Block } from "@share/utility";
import * as Utility from "@share/utility";

import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

/**
 * Manage ClusterData on the client side.
 */
export class ClusterClient implements IClusterClient {

  /**
   * Keep track of which chunks need to be re-meshed.
   */
  private dirtyChunks: IGrid<boolean> = new Grid<boolean>;

  /**
   * Keep track of chunk meshes.
   */
  private chunkMeshes: IGrid<Babylon.Mesh> = new Grid<Babylon.Mesh>;
    
  constructor(
    private clusterData: IClusterData,
    private readonly shadowGenerator: Babylon.ShadowGenerator,
    private readonly assetManager: IAssetManager,
  ) {

    // Initialize all chunks as needing update
    const chunkIt = clusterData.getIterator();
    for (let chunk of chunkIt) {
      const c = chunk.getCoordinate();
      this._flagDirty(c);
      console.log(this.dirtyChunks.get(c.x, c.y, c.z));
    }
  }

  // Get the chunk at a coordinate
  getChunk(coord: Vector3) : IChunkData | undefined {
    return this.clusterData.getChunk(coord);
  }

  // Get the block at an xyz coordinate
  getBlock(coord: Vector3) : Block | undefined {
    return this.clusterData.getBlock(coord);
  }

  // Add a new chunk. Replace any chunk in its spot.
  addChunk(chunk: IChunkData) : void {
    this.clusterData.addChunk(chunk);

    // Flag chunk for update
    const c = chunk.getCoordinate();
    this._flagDirty(c);
  }

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void {
    this.clusterData.setBlock(pos, block);

    // Flag this chunk for update
    this.dirtyChunks.set(pos.x, pos.y, pos.z, true);

    // Flag adjacent chunks for update
    const chunkSize = this.clusterData.getChunkSize();
    const flagAdj = (vec: Vector3) => {
      this._flagDirty(pos.add(vec));
    }
    if (block == Block.Air) {
      if (pos.x == 0)               flagAdj(Vector3.Left());
      if (pos.y == 0)               flagAdj(Vector3.Down());
      if (pos.z == 0)               flagAdj(Vector3.Backward());
      if (pos.x >= chunkSize - 1)   flagAdj(Vector3.Right());
      if (pos.y >= chunkSize - 1)   flagAdj(Vector3.Up());
      if (pos.z >= chunkSize - 1)   flagAdj(Vector3.Forward());
    }
  }

  // Get iterator for all chunks in the world
  getIterator(): Generator<IChunkData> {
    return this.clusterData.getIterator();
  }
  
  // Get chunk size
  getChunkSize(): number {
    return this.clusterData.getChunkSize();
  }

  // Load or reload chunk meshes in the world.
  remesh(): void {
    const shadowMap = this.shadowGenerator.getShadowMap();
    
    // Iterate through each chunk
    const chunkIt = this.getIterator();
    for (let chunk of chunkIt) {

      // Check if each chunk needs to be updated
      const c = chunk.getCoordinate();
      if (this.dirtyChunks.get(c.x, c.y, c.z)) {
        
        // Replace mesh
        const oldMesh = this.chunkMeshes.get(c.x, c.y, c.z);
        const newMesh = this._generateChunkMesh(chunk);

        shadowMap?.renderList?.push(newMesh);
        if (oldMesh != undefined) {
          oldMesh.dispose();
        }
        this.chunkMeshes.set(c.x, c.y, c.z, newMesh);
        this.dirtyChunks.set(c.x, c.y, c.z, false);
      }
    }
  }

  // Convert block data for a chunk into a mesh
  _generateChunkMesh(chunk: IChunkData): Babylon.Mesh {

    const blockIterator = chunk.getIterator();
    const size = chunk.getSize();
    const chunkGlobalCoord = chunk.getCoordinate().multiplyByFloats(size, size, size);

    // Initialize arrays for mesh data
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
        const adjCoord = coord.add(faceVector).add(chunkGlobalCoord);
        let adjacentBlock = this.getBlock(adjCoord);

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

  // Flag a chunk for re-meshing.
  _flagDirty(coord: Vector3) {
    this.dirtyChunks.set(coord.x, coord.y, coord.z, true);
  }
}