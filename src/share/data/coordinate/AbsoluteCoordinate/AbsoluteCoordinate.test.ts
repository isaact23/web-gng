import { ChunkData } from "@share/cluster-data/chunk";
import { AbsoluteCoordinate, IAbsoluteCoordinate } from ".";

// Store all implementations
const implementations: [string, new (x: number, y: number, z: number) => IAbsoluteCoordinate][] = [
  ["AbsoluteCoordinate", AbsoluteCoordinate]
];

// Iterate through and test implementations
for (const [name, coord] of implementations) {
  describe('Testing ' + name, () => {
  
    test("Ensure chunk size is 32", () => {
      expect(ChunkData.CHUNK_SIZE).toBe(32);
    });
  
    test("Get values", () => {
      const absCoord = new coord(1, 2, 3);

      expect(absCoord.x).toBe(1);
      expect(absCoord.y).toBe(2);
      expect(absCoord.z).toBe(3);
    });
  
    test("Get chunk coordinates from absolute coordinate", () => {
      const absCoord1 = new coord(1, 2, 3);
      expect(absCoord1.getChunkCoordinate()).toEqual({ x: 0, y: 0, z: 0 });
  
      const absCoord2 = new coord(35, -5, 4);
      expect(absCoord2.getChunkCoordinate()).toEqual({ x: 1, y: -1, z: 0 });

      const absCoord3 = new coord(32, 31, -1);
      expect(absCoord3.getChunkCoordinate()).toEqual({ x: 1, y: 0, z: -1 });

      const absCoord4 = new coord(0, -31, -32);
      expect(absCoord4.getChunkCoordinate()).toEqual({ x: 0, y: -1, z: -2 });
    });

    test("Get relative coordinates from absolute coordinate", () => {
      const absCoord1 = new coord(0, 0, 0);
      const rel1 = absCoord1.getRelativeCoordinate();
      expect(rel1).toEqual({ x: 0, y: 0, z: 0 });
      expect(rel1.chunkCoordinate).toEqual({ x: 0, y: 0, z: 0 });

      const absCoord2 = new coord(1, 31, 32);
      const rel2 = absCoord2.getRelativeCoordinate();
      expect(rel2).toEqual({ x: 1, y: 31, z: 0 });
      expect(rel2.chunkCoordinate).toEqual({ x: 0, y: 0, z: 1 });

      const absCoord3 = new coord(40, -40, -70);
      const rel3 = absCoord3.getRelativeCoordinate();
      expect(rel3).toEqual({ x: 8, y: 24, z: 26 });
      expect(rel3.chunkCoordinate).toEqual({ x: 1, y: -2, z: -3 });

      const absCoord4 = new coord(-1, -31, -32);
      const rel4 = absCoord4.getRelativeCoordinate();
      expect(rel4).toEqual({ x: 31, y: 1, z: 0 });
      expect(rel4.chunkCoordinate).toEqual({ x: -1, y: -1, z: -2 });
    });
  });
}
