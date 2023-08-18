import { Vector3 } from "babylonjs";
import { Block } from "../Block";
import * as Chunk from "../chunk/Chunk";
import * as Cluster from "./Cluster";
import { IAssetManager } from "../assets/IAssetManager";

export class ClusterGenerator {
  constructor(private assetManager: IAssetManager) {}

  createIsleChunk(coord: Vector3) : Chunk.IChunk {
    const chunk = new Chunk.BasicChunk(this.assetManager, coord);
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        for (let z = 0; z < 32; z++) {
          let layerRadius = 0.01 * (y ** 2) - 1;
          if (Math.sqrt(((x - 16) ** 2) + ((z - 16) ** 2)) > layerRadius) continue;
  
          let block = Block.Dirt;
          if (y == 31) block = Block.Grass;
          if (y < 24) block = Block.Stone;
  
          chunk.setBlock(new Vector3(x, y, z), block);
        }
      }
    }
    return chunk;
  }
  
  createIsleCluster(): Cluster.ICluster {
    const cluster = new Cluster.BasicCluster(assetManager);
  
    for (let x = 0; x < 128; x++) {
      for (let y = 0; y < 128; y++) {
        for (let z = 0; z < 128; z++) {
          let layerRadius = 0.003 * (y ** 2) - 1;
          if (Math.sqrt(((x - 64) ** 2) + ((z - 64) ** 2)) > layerRadius) continue;
  
          let block = Block.Dirt;
          if (y == 127) block = Block.Grass;
          if (y < 75) block = Block.Stone;
  
          cluster.setBlock(new Vector3(x, y, z), block);
        }
      }
    }
  
    return cluster;
  }

  createSineCluster(): Cluster.ICluster {
    const cluster = new Cluster.BasicCluster(assetManager);
    const size = 100;
  
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        let height = Math.round(10 + 1.3 * Math.sin(x / 8) + 1.5 * Math.sin(z / 5) + (x / 20) + (z / 10));
        for (let i = 0; i < height - 5; i++) {
          cluster.setBlock(new Vector3(x, i, z), Block.Stone);
        }
        for (let i = height - 5; i < height; i++) {
          if (i < 0) continue;
          cluster.setBlock(new Vector3(x, i, z), Block.Dirt);
        }
        cluster.setBlock(new Vector3(x, height, z), Block.Grass);
      }
    }
  
    cluster.setBlock(new Vector3(25, 15, 25), Block.Stone);
  
    return cluster;
  }
}
