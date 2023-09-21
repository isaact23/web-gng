import { ChunkData } from "@share/cluster-data/chunk";
import { RelativeCoordinate, IRelativeCoordinate } from ".";
import { ChunkCoordinate, IChunkCoordinate } from "../ChunkCoordinate";

// Store all implementations
const implementations:
  [string, new (x: number, y: number, z: number, chunkData: IChunkCoordinate) => IRelativeCoordinate][] =
[
  ["RelativeCoordinate", RelativeCoordinate]
];

// Iterate through and test implementations
for (const [name, coord] of implementations) {
  describe('Testing ' + name, () => {

    test("Ensure chunk size is 32", () => {
      expect(ChunkData.CHUNK_SIZE).toBe(32);
    });

    test("Get values", () => {
      const chunkCoord = new ChunkCoordinate(40, 7, -105);
      const relCoord = new coord(1, 2, 3, chunkCoord);
      expect(relCoord.x).toBe(1);
      expect(relCoord.y).toBe(2);
      expect(relCoord.z).toBe(3);
      expect(relCoord.chunkCoordinate).toBe(chunkCoord);
    });

    test("Get absolute coordinates", () => {
      const chunkCoord1 = new ChunkCoordinate(-1, 0, 2);
      const relCoord1 = new coord(15, 4, 7, chunkCoord1);
      expect(relCoord1.getAbsoluteCoordinate()).toEqual({ x: -17, y: 4, z: 71 });

      const chunkCoord2 = new ChunkCoordinate(4, 2, -3);
      expect(new coord(-2, 32, 5, chunkCoord2)).toThrow(RangeError);
    });
  });
}
