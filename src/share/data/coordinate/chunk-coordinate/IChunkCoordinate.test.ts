import { ChunkData } from "@share/data/cluster-data/chunk-data";
import { ChunkCoordinate, IChunkCoordinate } from ".";
import { AbsoluteCoordinate } from "../absolute-coordinate";
import { Vector3 } from "babylonjs";
import { Settings } from "@share/config/Settings";

// Store all implementations
const implementations: [string, new (x: number, y: number, z: number) => IChunkCoordinate][] = [
  ["ChunkCoordinate", ChunkCoordinate]
];

// Iterate through and test implementations
for (const [name, coord] of implementations) {
  describe('Testing ' + name, () => {

    const chunkSize = Settings.CHUNK_SIZE;
    
    test("Get values", () => {
      const c = new coord(1, 2, 3);
      expect(c.x).toBe(1);
      expect(c.y).toBe(2);
      expect(c.z).toBe(3);
    });

    test("Get absolute coordinate from chunk coordinate", () => {
      const c = new coord(1, 2, 3);
      expect(c.getAbsoluteCoordinate()).toEqual({ x: chunkSize, y: chunkSize * 2, z: chunkSize * 3 });

      const c2 = new coord(-2, 0, -1);
      expect(c2.getAbsoluteCoordinate()).toEqual({ x: chunkSize * -2, y: 0, z: chunkSize * -1 });
    });

    test("Add chunk coordinates", () => {
      const c1 = new coord(1, 2, 3);
      const c2 = new coord(-2, 0, -1);
      expect(c1.add(c2)).toEqual({ x: -1, y: 2, z: 2 });
    });

    test("Add scalars", () => {
      const c1 = new coord(5, 0, -5);
      const c2 = c1.addScalars(-5, 3, 15);
      expect(c2.equals(new coord(0, 3, 10))).toBe(true);
    });

    test("Test equality", () => {
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

    test("Ensure decimals are not allowed", () => {
      expect(() => {let a = new coord(0.5, 2, 1)}).toThrowError();
      expect(() => {let a = new coord(5, -0.2, -1)}).toThrowError();
      expect(() => {let a = new coord(5, 2, 0.1)}).toThrowError();
      expect(() => {let a = new coord(0.5, 0.2, -0.1)}).toThrowError();
    });
  });
}
