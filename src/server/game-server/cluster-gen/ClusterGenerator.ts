import { Vector3 } from "babylonjs";
import { Block } from "@share/utility";
import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { IClusterGenerator } from "./IClusterGenerator";
import { AbsoluteCoordinate } from "@share/data/coordinate";

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
  
          cluster.setBlock(new AbsoluteCoordinate(x, y, z), block);
        }
      }
    }
  
    return cluster;
  }

  /**
   * Create a cluster with sine waves.
   */
  createSineCluster(size: number = 100): IClusterData {

    const cluster = new ClusterData();

    // Lambda to create absolute coordinate
    const v = (x: number, y: number, z: number) => new AbsoluteCoordinate(x, y, z);
  
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        let height = Math.round(10 + 1.3 * Math.sin(x / 8) + 1.5 * Math.sin(z / 5) + (x / 20) + (z / 10));
        for (let i = 0; i < height - 5; i++) {
          cluster.setBlock(v(x, i, z), Block.Stone);
        }
        for (let i = height - 5; i < height; i++) {
          if (i < 0) continue;
          cluster.setBlock(v(x, i, z), Block.Dirt);
        }
        cluster.setBlock(v(x, height, z), Block.Grass);
      }
    }
  
    return cluster;
  }

  /**
   * Generate a standard world.
   */
  createWorldCluster(): IClusterData {
    const cluster = new ClusterData();

    /*const SIZE = 200;
    const HILL_COUNT = 250;
    const ALTITUDE = 2; // Distance between sea level and base of hills
    const SPAN = 10;
    const HILL_WIDTH = 5;
    const HILL_GRADE = 0.3;*/

    // Rugged hills
    const SIZE = 200;
    const HILL_COUNT = 250;
    const ALTITUDE = 2; // Distance between sea level and base of hills
    const SPAN = 30;
    const HILL_WIDTH = 10;
    const HILL_GRADE = 1.5;

    // Lambda to create absolute coordinate
    const v = (x: number, y: number, z: number) => new AbsoluteCoordinate(x, y, z);

    // Generate random particles to represent hills
    let coords: [number, number, number][] = [];
    for (let i = 0; i < HILL_COUNT; i++) {
      let x = Math.floor(Math.random() * SIZE);
      let y = Math.floor(Math.random() * SPAN + ALTITUDE);
      let z = Math.floor(Math.random() * SIZE);
      coords.push([x, y, z]);

      //cluster.setBlock(v(x, y, z), Block.Stone);
    }

    // Generate hills using weighted average of distance to particles
    for (let x = 0; x < SIZE; x++) {
      for (let z = 0; z < SIZE; z++) {

        // Determine how high this column should be based on surrounding particles
        let ySum = 0;
        let influenceSum = 0;
        for (let coord of coords) {
          let distance = Math.sqrt(Math.pow(x - coord[0], 2) + Math.pow(z - coord[2], 2));

          // Logistic curve
          let denom = (1 + Math.pow(Math.E, (HILL_GRADE * (distance - HILL_WIDTH))));
          let influence;
          if (denom == 0) {
            influence = 0;
          } else {
            influence = 1.0 / denom;
          }

          ySum += coord[1] * influence;
          influenceSum += influence;
        }

        // Calculate weighted average
        let y;
        if (influenceSum == 0) {
          y = 0;
        } else {
          y = Math.floor(ySum / influenceSum);
        }
        
        // Set block column
        cluster.setBlock(v(x, y, z), Block.Grass);
        for (let i = y - 1; i >= 0; i--) {
          let block = Block.Stone;
          if (y - i < 4) {
            block = Block.Dirt;
          }
          cluster.setBlock(v(x, i, z), block);
        }
      }
    }

    return cluster;
  }
}
