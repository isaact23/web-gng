import { ChunkData } from "@share/cluster-data/chunk";
import { ChunkCoordinate, IChunkCoordinate } from ".";
import { AbsoluteCoordinate } from "../AbsoluteCoordinate";

// Store all implementations
const implementations: [string, new (x: number, y: number, z: number) => IChunkCoordinate][] = [
  ["ChunkCoordinate", ChunkCoordinate]
];

// Iterate through and test implementations
for (const [name, coord] of implementations) {
  describe('Testing ' + name, () => {

    test("Ensure chunk size is 32", () => {
      expect(ChunkData.CHUNK_SIZE).toBe(32);
    });
    
    test("Get values", () => {
      const c = new coord(1, 2, 3);
      expect(c.x).toBe(1);
      expect(c.y).toBe(2);
      expect(c.z).toBe(3);
    });

    test("Get absolute coordinate from chunk coordinate", () => {
      const c = new coord(1, 2, 3);
      expect(c.getAbsoluteCoordinate()).toEqual([32, 64, 96]);

      const c2 = new coord(-2, 0, -1);
      expect(c2.getAbsoluteCoordinate()).toEqual([-64, 0, -32]);
    });

    test("Get relative coordinate from chunk coordinate", () => {
      const chunkCoord1 = new coord(0, 0, 0);
      const absCoord1 = new AbsoluteCoordinate(31, 16, 0);
      const rel1 = chunkCoord1.getRelativeCoordinate(absCoord1);
      expect(rel1).toBeDefined();
      expect(rel1).toEqual({ x: 31, y: 16, z: 0 });
      expect(rel1!.chunkCoordinate).toBe(chunkCoord1);

      const chunkCoord2 = new coord(1, 1, 1);
      const absCoord2 = new AbsoluteCoordinate(32, 63, 40);
      const rel2 = chunkCoord2.getRelativeCoordinate(absCoord2);
      expect(rel2).toBeDefined();
      expect(rel2).toEqual({ x: 0, y: 31, z: 8 });
      expect(rel2!.chunkCoordinate).toBe(chunkCoord2);

      const chunkCoord3 = new coord(-1, -1, -1);
      const absCoord3 = new AbsoluteCoordinate(-32, -1, -4);
      const rel3 = chunkCoord3.getRelativeCoordinate(absCoord3);
      expect(rel3).toBeDefined();
      expect(rel3).toEqual({ x: 0, y: 31, z: 28 });
      expect(rel3!.chunkCoordinate).toBe(chunkCoord3);

      const chunkCoord4 = new coord(1, 0, -1);
      const absCoord4 = new AbsoluteCoordinate(40, 0, 0);
      const rel4 = chunkCoord4.getRelativeCoordinate(absCoord4);
      expect(rel4).toBeUndefined();

      const chunkCoord5 = new coord(-2, -1, 1);
      const absCoord5 = new AbsoluteCoordinate(-65, -1, 32);
      const rel5 = chunkCoord5.getRelativeCoordinate(absCoord5);
      expect(rel5).toBeUndefined();
    });
  });
}
