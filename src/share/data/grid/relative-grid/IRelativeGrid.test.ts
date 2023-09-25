import { ChunkData } from "@share/cluster-data/chunk-data";
import { IRelativeGrid, RelativeGrid } from ".";
import { ChunkCoordinate, IChunkCoordinate, RelativeCoordinate } from "@share/data/coordinate";

// Store all implementations
const implementations: [string, new (chunkCoord: IChunkCoordinate) => IRelativeGrid<number>][] = [
  ["RelativeGrid", RelativeGrid<number>]
];

// Iterate through and test implementations
for (const [name, grid] of implementations) {
  describe("Testing " + name, () => {
    test("Ensure chunk size is 32", () => {
      expect(ChunkData.CHUNK_SIZE).toBe(32);
    });

    test("Get and set", () => {
      const chunkCoord1 = new ChunkCoordinate(2, -5, 3);
      const grid1 = new grid(chunkCoord1);
      const relCoord1 = new RelativeCoordinate(4, 2, 5, chunkCoord1);
      
      expect(grid1.get(relCoord1)).toBeUndefined();
      grid1.set(relCoord1, 1);
      expect(grid1.get(relCoord1)).toBe(1);

      const relCoord2 = new RelativeCoordinate(3, 4, 6, chunkCoord1);
      expect(grid1.get(relCoord2)).toBeUndefined();
      grid1.set(relCoord2, -5);
      expect(grid1.get(relCoord2)).toBe(-5);
    });

    test("Disallow setting relative coordinates with different chunk coordinates", () => {
      const chunkCoord1 = new ChunkCoordinate(2, -5, 3);
      const chunkCoord2 = new ChunkCoordinate(0, 3, 4);
      const grid1 = new grid(chunkCoord1);
      const relCoord1 = new RelativeCoordinate(4, 2, 5, chunkCoord2);

      expect(() => grid1.get(relCoord1)).toThrow();
      expect(() => grid1.set(relCoord1, 5)).toThrow();
    });

    test("Get iterator", () => {
      expect(true).toBe(false);
    });

    test("Relative grid iterator", () => {
      const chunkCoord1 = new ChunkCoordinate(2, -5, 3);
      const grid1 = new grid(chunkCoord1);

      const relCoord1 = new RelativeCoordinate(4, 2, 5, chunkCoord1);
      const relCoord2 = new RelativeCoordinate(3, 4, 6, chunkCoord1);
      const relCoord3 = new RelativeCoordinate(1, 2, 3, chunkCoord1);
      grid1.set(relCoord1, 1);
      grid1.set(relCoord2, -5);
      grid1.set(relCoord3, 10);

      const it = grid1[Symbol.iterator]();

      const val1 = it.next();
      expect(val1.value[0].equals(relCoord3)).toBe(true);
      expect(val1.value[1]).toEqual(10);
      expect(val1.done).toBe(false);

      const val2 = it.next();
      expect(val2.value[0].equals(relCoord2)).toBe(true);
      expect(val2.value[1]).toEqual(-5);
      expect(val2.done).toBe(false);

      const val3 = it.next();
      expect(val3.value[0].equals(relCoord1)).toBe(true);
      expect(val3.value[1]).toEqual(1);
      expect(val3.done).toBe(false);

      const val4 = it.next();
      expect(val4.value).toBeUndefined();
      expect(val4.done).toBe(true);
    })
  });
}