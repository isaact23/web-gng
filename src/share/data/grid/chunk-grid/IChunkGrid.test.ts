import { ChunkCoordinate } from "@share/data/coordinate";
import { ChunkGrid, IChunkGrid } from ".";

// Store all implementations
const implementations: [string, new () => IChunkGrid<number>][] = [
  ["ChunkGrid", ChunkGrid<number>]
];

// Iterate through and test implementations
for (const [name, grid] of implementations) {
  describe("Testing " + name, () => {
    test("Get and set", () => {
      const grid1 = new grid();
      const coord1 = new ChunkCoordinate(0, 1, 2);
      expect(grid1.get(coord1)).toBeUndefined();

      grid1.set(coord1, 3);
      expect(grid1.get(coord1)).toEqual(3);

      const coord2 = new ChunkCoordinate(0, 1, 3);
      grid1.set(coord2, -16);
      expect(grid1.get(coord2)).toEqual(-16);
    });

    test("Get iterator", () => {
      const grid1 = new grid();
      const coord1 = new ChunkCoordinate(0, 1, 2);
      const coord2 = new ChunkCoordinate(2, 1, 3);
      const coord3 = new ChunkCoordinate(0, 1, 3);
      const coord4 = new ChunkCoordinate(1, 1, 3);
      const coord5 = new ChunkCoordinate(0, 1, 0);
      grid1.set(coord1, 3);
      grid1.set(coord2, -16);
      grid1.set(coord3, 7);
      grid1.set(coord4, 0);
      grid1.set(coord5, 4);

      const it = grid1[Symbol.iterator]();

      const val1 = it.next();
      expect(val1.value[0].equals(coord5)).toBe(true);
      expect(val1.value[1]).toEqual(4);
      expect(val1.done).toBe(false);

      const val2 = it.next();
      expect(val2.value[0].equals(coord1)).toBe(true);
      expect(val2.value[1]).toEqual(3);
      expect(val2.done).toBe(false);

      const val3 = it.next();
      expect(val3.value[0].equals(coord3)).toBe(true);
      expect(val3.value[1]).toEqual(7);
      expect(val3.done).toBe(false);

      const val4 = it.next();
      expect(val4.value[0].equals(coord4)).toBe(true);
      expect(val4.value[1]).toEqual(0);
      expect(val4.done).toBe(false);

      const val5 = it.next();
      expect(val5.value[0].equals(coord2)).toBe(true);
      expect(val5.value[1]).toEqual(-16);
      expect(val5.done).toBe(false);

      const val6 = it.next();
      expect(val6.value).toBeUndefined();
      expect(val6.done).toBe(true);
    });
  });
}