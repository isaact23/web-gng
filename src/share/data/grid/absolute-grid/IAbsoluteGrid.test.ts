import { AbsoluteCoordinate } from "@share/data/coordinate";
import { AbsoluteGrid, IAbsoluteGrid } from ".";

// Store all implementations
const implementations: [string, new () => IAbsoluteGrid<number>][] = [
  ["AbsoluteGrid", AbsoluteGrid<number>]
];

// Iterate through and test implementations
for (const [name, grid] of implementations) {
  describe("Testing " + name, () => {
    test("Get and set", () => {
      const grid1 = new grid();
      const coord1 = new AbsoluteCoordinate(0, 1, 2);
      expect(grid1.get(coord1)).toBeUndefined();

      grid1.set(coord1, 3);
      expect(grid1.get(coord1)).toEqual(3);

      const coord2 = new AbsoluteCoordinate(0, 1, 3);
      grid1.set(coord2, -16);
      expect(grid1.get(coord2)).toEqual(-16);
    });

    test("Get iterator", () => {
      expect(true).toBe(false);
    });
  });
}