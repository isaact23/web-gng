import { Face, Block } from "../Block";
import { Vector3 } from "babylonjs";
import { ICluster } from "../cluster/ICluster";
import { getVectorFromFace } from "../Block";
import { TextureUvCalculator } from "../TextureUvCalculator";

import * as Babylon from "babylonjs";
import { IAssetManager } from "../assets/IAssetManager";

// TODO: Implement greedy meshing

// A MeshGeneratorChunk can generate a Babylon mesh with UV data from its block data.
export class BasicChunk {

  private blocks : Block[][][];

  // Create an empty chunk
  constructor(
    private readonly coordinate: Vector3 = new Vector3(0, 0, 0),
    private readonly size: number = 32
  ) {
    this.blocks = [];

    for (var x = 0; x < this.size; x++) {
      this.blocks[x] = [];
      for (var y = 0; y < this.size; y++) {
        this.blocks[x][y] = [];
        for (var z = 0; z < this.size; z++) {
          this.blocks[x][y][z] = Block.Air;
        }
      }
    }
  }

  // Get the size (width, length, height) of a chunk in blocks
  getSize() {
    return this.size;
  }

  // Get the block at an xyz coordinate
  getBlock(pos: Vector3) : Block | undefined {
    // Ensure the coordinates are within the bounds of the chunk
    if (pos.x < 0 || pos.y < 0 || pos.z < 0) return undefined;
    if (pos.x >= this.size || pos.y >= this.size || pos.z >= this.size) return undefined;

    return this.blocks[pos.x][pos.y][pos.z];
  }

  // Set a block at an xyz coordinate
  setBlock(pos: Vector3, block: Block) : void {
    this.blocks[pos.x][pos.y][pos.z] = block;
  }

  // Get the coordinate of this chunk.
  getCoordinate() : Vector3 {
    return this.coordinate;
  }

  // Get iterator for local-space positions of all non-air blocks in the chunk
  *getIterator() : Generator<[Vector3, Block], any, unknown> {
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        for (var z = 0; z < this.size; z++) {
          const block = this.blocks[x][y][z];
          if (block != Block.Air) {
            yield [new Vector3(x, y, z), block];
          }
        }
      }
    }
  }

  // Convert block data into a mesh
  generateMesh(cluster?: ICluster): Babylon.Mesh {

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
        const faceVector = getVectorFromFace(face);
        if (faceVector === undefined) continue;
        const adjCoord = coord.add(faceVector);
        let adjacentBlock = this.getBlock(adjCoord);

        // If block was not found in this chunk, look in the cluster.
        if (adjacentBlock === undefined && cluster !== undefined) {
          const adjacentGlobalCoord = adjCoord.add(chunkGlobalCoord);
          adjacentBlock = cluster.getBlock(adjacentGlobalCoord);
        }

        // If the adjacent block is empty,
        if (adjacentBlock == Block.Air || adjacentBlock === undefined) {
          // Then render the face.

          // Get texture UVs
          const uvBlock = TextureUvCalculator.getTextureUvs(block, face);

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
