import { ChunkData } from "@share/data/cluster-data/chunk-data";
import { RelativeCoordinate, IRelativeCoordinate } from ".";
import { ChunkCoordinate, IChunkCoordinate } from "../chunk-coordinate";
import { Vector3 } from "babylonjs";
import { Settings } from "@share/config/Settings";

// Store all implementations
const implementations:
  [string, new (x: number, y: number, z: number, chunkData: IChunkCoordinate) => IRelativeCoordinate][] =
[
  ["RelativeCoordinate", RelativeCoordinate]
];

// Iterate through and test implementations
for (const [name, coord] of implementations) {
  describe('Testing ' + name, () => {

    const chunkSize = Settings.CHUNK_SIZE;

    test("Ensure relative coordinates are initialized correctly", () => {
      const chunkCoord = new ChunkCoordinate(1, 0, -1);
      expect(() => new coord(-1, 0, 0, chunkCoord)).toThrow(RangeError);
      expect(() => new coord(0, -1, 0, chunkCoord)).toThrow(RangeError);
      expect(() => new coord(0, 0, -1, chunkCoord)).toThrow(RangeError);
      expect(() => new coord(chunkSize, 0, 0, chunkCoord)).toThrow(RangeError);
      expect(() => new coord(0, chunkSize, 0, chunkCoord)).toThrow(RangeError);
      expect(() => new coord(0, 0, chunkSize, chunkCoord)).toThrow(RangeError);

      expect(() => new coord(0, 0, 0, chunkCoord)).not.toThrow(RangeError);
    });

    test("Get values", () => {
      const chunkCoord = new ChunkCoordinate(40, 7, -105);
      const relCoord = new coord(1, 2, 3, chunkCoord);
      expect(relCoord.x).toBe(1);
      expect(relCoord.y).toBe(2);
      expect(relCoord.z).toBe(3);
      expect(relCoord.chunkCoordinate).toBe(chunkCoord);
    });

    test("Get absolute coordinates", () => {
      const chunkCoord1 = new ChunkCoordinate(-1, 0, 2);
      const relCoord1 = new coord(15, 4, 7, chunkCoord1);
      expect(relCoord1.getAbsoluteCoordinate()).toEqual({ x: -chunkSize + 15, y: 4, z: (2 * chunkSize) + 7 });

      const chunkCoord2 = new ChunkCoordinate(4, 2, -3);
      expect(() => new coord(-2, 32, 5, chunkCoord2)).toThrow(RangeError);
    });

    test("Check equality between relative coordinates", () => {
      const chunkCoord1 = new ChunkCoordinate(1, 2, 3);
      const relCoord1 = new coord(1, 2, 3, chunkCoord1);
      const relCoord2 = new coord(1, 2, 3, chunkCoord1);
      const relCoord3 = new coord(3, 2, 1, chunkCoord1);
      expect(relCoord1.equals(relCoord2)).toBe(true);
      expect(relCoord1.equals(relCoord3)).toBe(false);

      const chunkCoord2 = new ChunkCoordinate(4, 5, 6);
      const relCoord4 = new coord(1, 2, 3, chunkCoord2);
      expect(relCoord1.equals(relCoord4)).toBe(false);
    });

    test("Adding to relative coordinates", () => {
      const chunkCoord1 = new ChunkCoordinate(-4, 0, 2);
      const relCoord1 = new coord(0, 0, 0, chunkCoord1);
      const relCoord2 = relCoord1.add(1, 2, 3);
      expect(relCoord2).toBeDefined();
      expect(relCoord2!.equals(new coord(1, 2, 3, chunkCoord1))).toBe(true);

      const relCoord3 = relCoord1.add(chunkSize - 1, chunkSize - 1, chunkSize - 1);
      expect(relCoord3).toBeDefined();
      expect(relCoord3!.equals(new coord(chunkSize - 1, chunkSize - 1, chunkSize - 1, chunkCoord1))).toBe(true);

      const relCoord4 = relCoord1.add(chunkSize, 0, 0);
      expect(relCoord4).toBeUndefined();
      const relCoord5 = relCoord1.add(0, chunkSize, 0);
      expect(relCoord5).toBeUndefined();
      const relCoord6 = relCoord1.add(0, 0, chunkSize);
      expect(relCoord6).toBeUndefined();

      const relCoord7 = relCoord1.add(-1, 0, 0);
      expect(relCoord7).toBeUndefined();
      const relCoord8 = relCoord1.add(0, -1, 0);
      expect(relCoord8).toBeUndefined();
      const relCoord9 = relCoord1.add(0, 0, -1);
      expect(relCoord9).toBeUndefined();
      
    });
    
    test("Get Vector3", () => {
      const chunkCoord1 = new ChunkCoordinate(5, 0, -1);
      const relCoord1 = new coord(1, 2, 3, chunkCoord1);
      expect(relCoord1.vec().equals(new Vector3(1, 2, 3))).toBe(true);
    });
  });
}
