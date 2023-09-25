import { Grid } from ".";
import { IGrid } from ".";
import { Vector3 } from "babylonjs";

// Store all implementations
const implementations: [string, new () => IGrid<number>][] = [
  ["Grid", Grid<number>]
];

// Iterate through and test implementations
for (const [name, grid] of implementations) {
  describe("Testing " + name, () => {

    // Lambda to generate Vector3's
    const v = (x: number, y: number, z: number) => new Vector3(x, y, z);

    test("Unset values should be undefined", () => {
      const grid1 = new grid();

      expect(grid1.get(v(0, 0, 0))).toBe(undefined);
      expect(grid1.get(v(-1, -2, -3))).toBe(undefined);
      expect(grid1.get(v(20, 60, 4000))).toBe(undefined);
    });

    test("Get/set values from grid", () => {
      const grid1 = new grid();

      grid1.set(v(2, 5, 3),  4);
      grid1.set(v(2, 5, 7),  7);
      grid1.set(v(2, 6, -2), 3);
      grid1.set(v(2, 5, 3),  0);

      expect(grid1.get(v(2, 5,  3))).toBe(0);
      expect(grid1.get(v(2, 5,  7))).toBe(7);
      expect(grid1.get(v(2, 6, -2))).toBe(3);
      expect(grid1.get(v(4, 5,  7))).toBe(undefined);
      expect(grid1.get(v(2, -4, 7))).toBe(undefined);
      expect(grid1.get(v(2, 5,  0))).toBe(undefined);
    });

    test("Test grid iterator", () => {
      const grid1 = new grid();

      grid1.set(v(1, 2, 3), 4);
      grid1.set(v(1, 0, 6), 10);
      grid1.set(v(5, 3, 1), 0);
      grid1.set(v(1, 0, 5), 3);

      const it1 = grid1[Symbol.iterator]();
      
      const val1 = it1.next();
      expect(val1.value.equals(v(1, 0, 5))).toBe(true);
      expect(val1.done).toBe(false);

      const val2 = it1.next();
      expect(val2.value.equals(v(1, 0, 6))).toBe(true);
      expect(val2.done).toBe(false);

      const val3 = it1.next();
      expect(val3.value.equals(v(1, 2, 3))).toBe(true);
      expect(val3.done).toBe(false);

      const val4 = it1.next();
      expect(val4.value.equals(v(5, 3, 1))).toBe(true);
      expect(val4.done).toBe(false);

      const val5 = it1.next();
      expect(val5.value).toBeUndefined();
      expect(val5.done).toBe(true);
    });
  });
}
