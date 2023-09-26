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

    test("Absolute grid iterator", () => {
      const coord1 = new AbsoluteCoordinate(0, 4, 3);
      const coord2 = new AbsoluteCoordinate(2, 1, 3);
      const coord3 = new AbsoluteCoordinate(1, 1, 3);

      const grid1 = new grid();
      grid1.set(coord1, 3);
      grid1.set(coord2, -16);
      grid1.set(coord3, 7);

      const it = grid1[Symbol.iterator]();

      const val1 = it.next();
      expect(val1.value[0].equals(coord1)).toBe(true);
      expect(val1.value[1]).toEqual(3);
      expect(val1.done).toBe(false);

      const val2 = it.next();
      expect(val2.value[0].equals(coord3)).toBe(true);
      expect(val2.value[1]).toEqual(7);
      expect(val2.done).toBe(false);

      const val3 = it.next();
      expect(val3.value[0].equals(coord2)).toBe(true);
      expect(val3.value[1]).toEqual(-16);
      expect(val3.done).toBe(false);

      const val4 = it.next();
      expect(val4.value).toBeUndefined();
      expect(val4.done).toBe(true);
    });
  });
}