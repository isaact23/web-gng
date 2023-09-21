import { AbsoluteCoordinate, IAbsoluteCoordinate } from ".";

describe('Testing AbsoluteCoordinate', () => {
  
  const absCoord: IAbsoluteCoordinate = new AbsoluteCoordinate(1, 2, 3);

  test("Get values", () => {
    expect(absCoord.x).toBe(1);
    expect(absCoord.y).toBe(2);
    expect(absCoord.z).toBe(3);
  });
});