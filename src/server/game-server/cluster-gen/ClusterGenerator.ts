import { Vector3 } from "babylonjs";
import { Block } from "share/utility";
import { ClusterData, IClusterData } from "@share/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";

/**
 * Generator for cluster data.
 */
export class ClusterGenerator implements IClusterGenerator {
  
  /**
   * Create an island cluster.
   */
  createIsleCluster(): IClusterData {

    const cluster = new ClusterData();
  
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

  /**
   * Create a cluster with sine waves.
   */
  createSineCluster(): IClusterData {

    const cluster = new ClusterData();
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
