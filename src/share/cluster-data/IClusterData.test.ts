import { Block } from "@share/utility";
import { ClusterData, IClusterData } from ".";
import { ChunkData } from "./chunk-data";
import { AbsoluteCoordinate, ChunkCoordinate } from "@share/data/coordinate";

// Store all implementations
const implementations: [string, new () => IClusterData][] = [
  ["ClusterData", ClusterData]
];

// Iterate through and test implementations
for (const [name, clusterData] of implementations) {

  describe('Testing ' + name, () => {

    // Lambda for creating coordinates
    const a = (x: number, y: number, z: number) => new AbsoluteCoordinate(x, y, z);
    const c = (x: number, y: number, z: number) => new ChunkCoordinate(x, y, z);

    test("Ensure chunk size is 32", () => {
      expect(ChunkData.CHUNK_SIZE).toBe(32);
    });

    test("Add and get chunks", () => {
      const cluster1 = new clusterData();
      const chunkCoord1 = new ChunkCoordinate(0, 0, 0);
      expect(cluster1.getChunk(chunkCoord1)).toBeUndefined();
      
      const chunk1 = new ChunkData(chunkCoord1);
      cluster1.addChunk(chunk1);
      expect(cluster1.getChunk(chunkCoord1)).toBe(chunk1);

      const chunkCoord2 = new ChunkCoordinate(4, 0, 0);
      const chunk2 = new ChunkData(chunkCoord2);
      cluster1.addChunk(chunk2);
      expect(cluster1.getChunk(chunkCoord2)).toBe(chunk2);

      const chunk3 = new ChunkData(chunkCoord1);
      cluster1.addChunk(chunk3);
      expect(cluster1.getChunk(chunkCoord1)).toBe(chunk3);
    });

    test("Get and set blocks", () => {
      const cluster2 = new clusterData();

      expect(cluster2.getBlock(a(0, 0, 0))).toBeUndefined();
      expect(cluster2.getBlock(a(400, 600, -300))).toBeUndefined();

      cluster2.setBlock(a(0, 0, 0), Block.Stone);
      expect(cluster2.getBlock(a(0, 0, 0))).toBe(Block.Stone);

      cluster2.setBlock(a(-503, 706, 20), Block.Grass);
      expect(cluster2.getBlock(a(-503, 706, 20))).toBe(Block.Grass);

      cluster2.setBlock(a(204, -16, 0), Block.Dirt);
      expect(cluster2.getBlock(a(204, -16, 0))).toBe(Block.Dirt);

      cluster2.setBlock(a(0, 0, 0), Block.Air);
      expect(cluster2.getBlock(a(0, 0, 0))).toBe(Block.Air);
    });

    test("Cluster chunk iterator", () => {
      const cluster3 = new clusterData();

      const it1 = cluster3.getIterator();
      expect(it1.next().done).toBeTruthy();

      cluster3.addChunk(new ChunkData(c(0, 0, 0)));
      cluster3.addChunk(new ChunkData(c(4, 0, 0)));

      const it2 = cluster3.getIterator();

      expect(it2.next().done).toBeFalsy();
      expect(it2.next().done).toBeFalsy();
      expect(it2.next().done).toBeTruthy();
    });
  });
}
