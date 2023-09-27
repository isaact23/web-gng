import { ChunkData } from "@share/data/cluster-data/chunk-data";
import { AbsoluteCoordinate, IAbsoluteCoordinate } from ".";
import { Vector3 } from "babylonjs";

// Store all implementations
const implementations: [string, new (x: number, y: number, z: number) => IAbsoluteCoordinate][] = [
  ["AbsoluteCoordinate", AbsoluteCoordinate]
];

// Iterate through and test implementations
for (const [name, coord] of implementations) {
  describe('Testing ' + name, () => {

    const chunkSize = 16;
  
    test("Get values", () => {
      const absCoord = new coord(1, 2, 3);

      expect(absCoord.x).toBe(1);
      expect(absCoord.y).toBe(2);
      expect(absCoord.z).toBe(3);
    });
  
    test("Get chunk coordinates from absolute coordinate", () => {
      const absCoord1 = new coord(1, 2, 3);
      expect(absCoord1.getChunkCoordinate()).toEqual({ x: 0, y: 0, z: 0 });
  
      const absCoord2 = new coord(chunkSize + 3, -5, 4);
      expect(absCoord2.getChunkCoordinate()).toEqual({ x: 1, y: -1, z: 0 });

      const absCoord3 = new coord(chunkSize, chunkSize - 1, -1);
      expect(absCoord3.getChunkCoordinate()).toEqual({ x: 1, y: 0, z: -1 });

      const absCoord4 = new coord(0, -chunkSize, -chunkSize - 1);
      expect(absCoord4.getChunkCoordinate()).toEqual({ x: 0, y: -1, z: -2 });
    });

    test("Get relative coordinates from absolute coordinate", () => {
      const absCoord1 = new coord(0, 0, 0);
      const rel1 = absCoord1.getRelativeCoordinate();
      expect(rel1.x).toBe(0);
      expect(rel1.y).toBe(0);
      expect(rel1.z).toBe(0);
      expect(rel1.chunkCoordinate).toEqual({ x: 0, y: 0, z: 0 });

      const absCoord2 = new coord(1, chunkSize - 1, chunkSize);
      const rel2 = absCoord2.getRelativeCoordinate();
      expect(rel2.x).toBe(1);
      expect(rel2.y).toBe(chunkSize - 1);
      expect(rel2.z).toBe(0);
      expect(rel2.chunkCoordinate).toEqual({ x: 0, y: 0, z: 1 });

      const absCoord3 = new coord(chunkSize + 8, (-2 * chunkSize) + 4, 6);
      const rel3 = absCoord3.getRelativeCoordinate();
      expect(rel3.x).toBe(8);
      expect(rel3.y).toBe(4);
      expect(rel3.z).toBe(6);
      expect(rel3.chunkCoordinate).toEqual({ x: 1, y: -2, z: 0 });

      const absCoord4 = new coord(-1, -chunkSize, -chunkSize - 1);
      const rel4 = absCoord4.getRelativeCoordinate();
      expect(rel4.x).toBe(chunkSize - 1);
      expect(rel4.y).toBe(0);
      expect(rel4.z).toBe(chunkSize - 1);
      expect(rel4.chunkCoordinate).toEqual({ x: -1, y: -1, z: -2 });
    });

    test("Add absolute coordinates", () => {
      const c1 = new coord(4, 10, -5);
      const c2 = new coord(2, 15, 52);
      expect(c1.add(c2)).toEqual({ x: 6, y: 25, z: 47});

      const c3 = new coord(5, -5, 0);
      expect(c1.add(c3)).toEqual({ x: 9, y: 5, z: -5});
    });

    test("Add scalars", () => {
      const c1 = new coord(5, -100, 60);
      const c2 = c1.addScalars(10, 99, -60);
      expect(c2.equals(new coord(15, -1, 0))).toBe(true);
    })

    test("Check coordinate equality", () => {
      const c1 = new coord(1, 2, 3);
      const c2 = new coord(1, 2, 3);
      const c3 = new coord(3, 2, 1);
      expect(c1.equals(c2)).toBe(true);
      expect(c1.equals(c3)).toBe(false);
    });

    test("Multiply coordinate", () => {
      const c1 = new coord(1, 2, 3);
      const c2 = c1.multiply(2);
      expect(c2.equals(new coord(2, 4, 6))).toBe(true);
    });

    test("Get Vector3", () => {
      const c1 = new coord(1, 2, 3);
      expect(c1.vec().equals(new Vector3(1, 2, 3))).toBeTruthy();
    });
  });
}
