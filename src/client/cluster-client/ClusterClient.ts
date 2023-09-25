import { IClusterClient } from ".";
import { IAssetManager } from "@client/assets";
import { IClusterData } from "@share/cluster-data";
import { ChunkData, IChunkData } from "@share/cluster-data/chunk-data";
import { IAbsoluteCoordinate, IChunkCoordinate } from "@share/data/coordinate";
import { ChunkGrid, IChunkGrid } from "@share/data/grid/chunk-grid";
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
  private dirtyChunks: IChunkGrid<boolean> = new ChunkGrid<boolean>;

  /**
   * Keep track of chunk meshes.
   */
  private chunkMeshes: IChunkGrid<Babylon.Mesh> = new ChunkGrid<Babylon.Mesh>;
    
  constructor(
    private clusterData: IClusterData,
    private readonly shadowGenerator: Babylon.ShadowGenerator,
    private readonly assetManager: IAssetManager,
  ) {

    // Initialize all chunks as needing update
    const chunkIt = clusterData.getIterator();
    for (let [coord, chunk] of chunkIt) {
      this.dirtyChunks.set(coord, true);
    }
  }

  /**
   * Get the chunk at a chunk coordinate.
   * @returns The chunk, or undefined if it doesn't exist.
   */
  getChunk(coord: IChunkCoordinate) : IChunkData | undefined {
    return this.clusterData.getChunk(coord);
  }

  /**
   * Get the block at an absolute coordinate.
   * @returns The block, or undefined if it doesn't exist.
   */
  getBlock(coord: IAbsoluteCoordinate) : Block | undefined {
    return this.clusterData.getBlock(coord);
  }

  /**
   * Add a new chunk. Replace any chunk in its spot.
   * @param chunk The chunk to add.
   */
  addChunk(chunk: IChunkData) : void {
    this.clusterData.addChunk(chunk);

    // Flag chunk for update
    const c = chunk.getCoordinate();
    this.dirtyChunks.set(c, true);
  }

  /**
   * Set a block at an absolute coordinate.
   * @param coord The absolute coordinate.
   * @param block The block to set.
   */
  setBlock(coord: IAbsoluteCoordinate, block: Block) : void {
    this.clusterData.setBlock(coord, block);

    // Flag this chunk for update
    const chunkCoord = coord.getChunkCoordinate();
    this.dirtyChunks.set(chunkCoord, true);

    // Flag adjacent chunks for update
    const chunkSize = ChunkData.CHUNK_SIZE;
    const flagAdj = (offset: Vector3) => {
      this.dirtyChunks.set(chunkCoord.addScalars(offset.x, offset.y, offset.z), true);
    }
    if (block == Block.Air) {
      if (coord.x == 0)               flagAdj(Vector3.Left());
      if (coord.y == 0)               flagAdj(Vector3.Down());
      if (coord.z == 0)               flagAdj(Vector3.Backward());
      if (coord.x >= chunkSize - 1)   flagAdj(Vector3.Right());
      if (coord.y >= chunkSize - 1)   flagAdj(Vector3.Up());
      if (coord.z >= chunkSize - 1)   flagAdj(Vector3.Forward());
    }
  }

  /**
   * Get iterator for all chunks in the world.
   * @returns An iterator for all chunks in this world
   * with respective chunk coordinates.
   */
  [Symbol.iterator](): Iterator<[IChunkCoordinate, IChunkData]> {
    return this.clusterData[Symbol.iterator]();
  }

  /**
   * Load or reload chunk meshes in the world.
   */
  remesh(): void {
    console.log("Re-meshing");

    const shadowMap = this.shadowGenerator.getShadowMap();
    
    // Iterate through each chunk
    const chunkIt = this.getIterator();
    for (let [coord, chunk] of chunkIt) {

      // Check if each chunk needs to be updated
      if (this.dirtyChunks.get(coord)) {
        
        // Replace mesh
        const oldMesh = this.chunkMeshes.get(coord);
        const newMesh = this._generateChunkMesh(chunk);

        shadowMap?.renderList?.push(newMesh);
        if (oldMesh != undefined) {
          oldMesh.dispose();
        }
        this.chunkMeshes.set(coord, newMesh);
        this.dirtyChunks.set(coord, false);
      }
    }
  }

  /**
   * Convert block data for a chunk into a mesh.
   */
  _generateChunkMesh(chunk: IChunkData): Babylon.Mesh {

    const blockIterator = chunk.getIterator();

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

      const absoluteCoord = coord.getAbsoluteCoordinate();

      // For each face in the block,
      for (let face of Object.values(Face)) {
        if (typeof(face) === "string") continue;

        // Get adjacent block
        const faceVector = Utility.FaceVectorConverter.getVectorFromFace(face);
        if (faceVector === undefined) continue;

        const adjCoord = absoluteCoord.addScalars(faceVector.x, faceVector.y, faceVector.z);
        const adjBlock = this.clusterData.getBlock(adjCoord);

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
    mesh.material = this.assetManager.getMaterialManager().getTilemapMaterial();

    mesh.checkCollisions = true;
    mesh.receiveShadows = true;

    return mesh;
  }
}
