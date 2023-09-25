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
      expect(true).toBe(false);
    });
  });
}