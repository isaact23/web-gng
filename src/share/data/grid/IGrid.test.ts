import { Grid } from "./Grid";
import { IGrid } from "./IGrid";

// Test an implementing class of IGrid
function testGrid(grid: IGrid<boolean>) {
  test("Unset values should be undefined", () => {
    expect(grid.get(0, 0, 0)).toBe(undefined);
    expect(grid.get(-1, -2, -3)).toBe(undefined);
    expect(grid.get(20, 60, 4000)).toBe(undefined);
  });

  grid.set(2, 5, 3, true);
  grid.set(2, 5, 7, false);

  test("Get true/false/undefined values from grid", () => {
    expect(grid.get(2, 5, 3)).toBe(true);
    expect(grid.get(2, 5, 7)).toBe(false);
    expect(grid.get(4, 5, 7)).toBe(undefined);
  });
}

// Test grid implementations
describe('Testing IGrid implementations', () => {
  testGrid(new Grid<boolean>());
});