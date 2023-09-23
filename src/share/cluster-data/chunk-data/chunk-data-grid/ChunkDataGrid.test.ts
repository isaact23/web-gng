import { ChunkCoordinate } from "@share/data/coordinate";
import { ChunkDataGrid, IChunkDataGrid } from ".";
import { ChunkData } from "../ChunkData";

// Store all implementations
const implementations: [string, new () => IChunkDataGrid][] = [
  ["ChunkDataGrid", ChunkDataGrid]
];

// Iterate through and test implementations
for (const [name, grid] of implementations) {
  describe("Testing " + name, () => {

    test("Get and add chunks", () => {
      const grid1 = new grid();
      const coord1 = new ChunkCoordinate(0, 0, 0);
      expect(grid1.get(coord1)).toBeUndefined();

      const data1 = new ChunkData(coord1);
      grid1.add(data1);
      expect(grid1.get(coord1)).toBe(data1);
    });

    test("Iterator", () => {
      const grid2 = new grid();

      const c2 = new ChunkCoordinate(0, 0, 0);
      const c3 = new ChunkCoordinate(1, 0, 0);

      const data2 = new ChunkData(c2);
      const data3 = new ChunkData(c3);

      grid2.add(data2);
      grid2.add(data3);

      const it = grid2.getIterator();

      expect(it.next().value).toBeDefined();
      expect(it.next().value).toBeDefined();
      expect(it.next().value).toBeUndefined();
    })
  });
}