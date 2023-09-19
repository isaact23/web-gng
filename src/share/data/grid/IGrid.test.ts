import { Grid } from ".";
import { IGrid } from ".";
import { Vector3 } from "babylonjs";

// Test an implementing class of IGrid
function testGrid(grid: IGrid<boolean>) {

  // Lambda to generate Vector3's
  const v = (x: number, y: number, z: number) => new Vector3(x, y, z);

  test("Unset values should be undefined", () => {
    expect(grid.get(v(0, 0, 0))).toBe(undefined);
    expect(grid.get(v(-1, -2, -3))).toBe(undefined);
    expect(grid.get(v(20, 60, 4000))).toBe(undefined);
  });

  grid.set(v(2, 5, 3),  true);
  grid.set(v(2, 5, 7),  false);
  grid.set(v(2, 6, -2), false);

  test("Get true/false/undefined values from grid", () => {
    expect(grid.get(v(2, 5, 3))).toBe(true);
    expect(grid.get(v(2, 5, 7))).toBe(false);
    expect(grid.get(v(2, 6, -2))).toBe(false);
    expect(grid.get(v(4, 5, 7))).toBe(undefined);
    expect(grid.get(v(2, -4, 7))).toBe(undefined);
    expect(grid.get(v(2, 5, 0))).toBe(undefined);
  });

  grid.set(v(-5, -10, -100), true);
  const it = grid.getIterator();

  test("Test grid iterator", () => {
    expect(it.next().value).toBe(true);
    expect(it.next().value).toBe(false);
    expect(it.next().value).toBe(false);

    const res1 = it.next();
    expect(res1.value).toBe(true);
    expect(res1.done).toBe(false);

    const res2 = it.next();
    expect(res2.value).toBe(undefined);
    expect(res2.done).toBe(true);
  });
}

// Test grid implementations
describe('Testing IGrid implementations', () => {
  testGrid(new Grid<boolean>());
});