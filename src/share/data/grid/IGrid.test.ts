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
      expect(true).toBe(false);
    });
  });
}
