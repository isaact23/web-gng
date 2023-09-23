import { Block } from "@share/utility";
import { ClusterData } from ".";
import { IClusterData} from ".";
import { Vector3 } from "babylonjs";
import { ChunkData } from "./chunk-data";


describe('Testing ClusterData', () => {

  // Lambda to generate Vector3's
  const v = (x: number, y: number, z: number) => new Vector3(x, y, z);
  
  const cluster1: IClusterData = new ClusterData(32);

  test("Get chunk size", () => {
    expect(cluster1.getChunkSize()).toBe(32);
  });

  test("Add and get chunks", () => {
      expect(cluster1.getChunk(v(0, 0, 0))).toBeUndefined();
      cluster1.addChunk(new ChunkData(v(0, 0, 0)));
      expect(cluster1.getChunk(v(0, 0, 0))).toBeDefined();
  
      expect(cluster1.getChunk(v(4, -5, 8))).toBeUndefined();
      cluster1.addChunk(new ChunkData(v(4, -5, 8)));
      expect(cluster1.getChunk(v(4, -5, 8))).toBeDefined();
  });

  const cluster2: IClusterData = new ClusterData(32);

  test("Get and set blocks", () => {
    expect(cluster2.getBlock(v(0, 0, 0))).toBeUndefined();
    expect(cluster2.getBlock(v(400, 600, -300))).toBeUndefined();

    cluster2.setBlock(v(0, 0, 0), Block.Stone);
    expect(cluster2.getBlock(v(0, 0, 0))).toBe(Block.Stone);

    cluster2.setBlock(v(-503, 706, 20), Block.Grass);
    expect(cluster2.getBlock(v(-503, 706, 20))).toBe(Block.Grass);

    cluster2.setBlock(v(204, -16, 0), Block.Dirt);
    expect(cluster2.getBlock(v(204, -16, 0))).toBe(Block.Dirt);
  });

  const cluster3 = new ClusterData(32);

  test("Cluster chunk iterator", () => {
    const it1 = cluster3.getIterator();
    expect(it1.next().done).toBeTruthy();

    cluster3.addChunk(new ChunkData(v(0, 0, 0)));
    cluster3.addChunk(new ChunkData(v(4, 0, 0)));

    const it2 = cluster3.getIterator();

    expect(it2.next().done).toBeFalsy();
    expect(it2.next().done).toBeFalsy();
    expect(it2.next().done).toBeTruthy();
  });
});