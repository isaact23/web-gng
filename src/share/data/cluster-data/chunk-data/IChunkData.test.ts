import { Block } from "@share/utility";
import { ChunkData } from ".";
import { IChunkData} from ".";
import { ChunkCoordinate, IChunkCoordinate } from "@share/data/coordinate/chunk-coordinate";
import { RelativeCoordinate, IRelativeCoordinate } from "@share/data/coordinate/relative-coordinate";
import { Settings } from "@share/config/Settings";

// Store all implementations
const implementations: [string, (coord: IChunkCoordinate) => IChunkData][] = [
  ["ChunkData", ChunkData.new]
];

// Iterate through and test implementations
for (const [name, chunkData] of implementations) {

  describe('Testing ' + name, () => {

    // Lambda to generate relative coordinates
    const r: (x: number, y: number, z: number, c: IChunkCoordinate) => IRelativeCoordinate = 
            (x: number, y: number, z: number, c: IChunkCoordinate) => new RelativeCoordinate(x, y, z, c); 
    
    const chunkSize = Settings.CHUNK_SIZE;

    test("Ensure no out-of-bounds block getting or setting", () => {

      const chunkData1: IChunkData = chunkData(new ChunkCoordinate(0, 5, -2));
      const c = chunkData1.getCoordinate();

      let errFuncs = new Array<() => void>;
      errFuncs.push(() => { chunkData1.setBlock(r(-1, 0, 0, c),  Block.Stone) });
      errFuncs.push(() => { chunkData1.setBlock(r(5, -6, 2, c),  Block.Air)   });
      errFuncs.push(() => { chunkData1.setBlock(r(5, 16, -8, c), Block.Grass) });
      errFuncs.push(() => { chunkData1.setBlock(r(chunkSize, 0, 0, c),  Block.Air)   });
      errFuncs.push(() => { chunkData1.setBlock(r(5, chunkSize + 3, 3, c),  Block.Stone) });
      errFuncs.push(() => { chunkData1.setBlock(r(5, 15, chunkSize + 5, c), Block.Stone) });
      
      errFuncs.push(() => { chunkData1.getBlock(r(-1, 0, 0, c))  });
      errFuncs.push(() => { chunkData1.getBlock(r(5, -6, 2, c))  });
      errFuncs.push(() => { chunkData1.getBlock(r(5, 16, -8, c)) });
      errFuncs.push(() => { chunkData1.getBlock(r(chunkSize, 0, 0, c))  });
      errFuncs.push(() => { chunkData1.getBlock(r(5, chunkSize + 3, 3, c))  });
      errFuncs.push(() => { chunkData1.getBlock(r(5, 15, chunkSize + 5, c)) });

      for (let errFunc of errFuncs) {
        expect(errFunc).toThrow(RangeError);
      }
    });

    test("Set and get blocks", () => {

      const chunkData1: IChunkData = chunkData(new ChunkCoordinate(0, 5, -2));
      const c = chunkData1.getCoordinate();

      expect(chunkData1.getBlock(r(5, 0, 2, c))).toBe(Block.Air);
      chunkData1.setBlock(r(5, 0, 2, c), Block.Stone);
      expect(chunkData1.getBlock(r(5, 0, 2, c))).toBe(Block.Stone);

      expect(chunkData1.getBlock(r(8, 4, 9, c))).toBe(Block.Air);
      chunkData1.setBlock(r(8, 4, 9, c), Block.Grass);
      expect(chunkData1.getBlock(r(8, 4, 9, c))).toBe(Block.Grass);
    });

    test("Get chunk coordinate", () => {
      const chunkData1: IChunkData = chunkData(new ChunkCoordinate(0, 5, -2));
      const c = chunkData1.getCoordinate();

      expect(c.x).toBe(0);
      expect(c.y).toBe(5);
      expect(c.z).toBe(-2);
    });

    test("ChunkData iterator", () => {

      const chunkData2: IChunkData = chunkData(new ChunkCoordinate(4, -5, 8));
      const c2 = chunkData2.getCoordinate();
      chunkData2.setBlock(r(0, 0, 0, c2), Block.Stone);
      chunkData2.setBlock(r(5, 0, 0, c2), Block.Grass);

      const it1 = chunkData2[Symbol.iterator]();
      expect(it1.next().done).toBeFalsy();
      expect(it1.next().done).toBeFalsy();
      expect(it1.next().done).toBeTruthy();

      const it2 = chunkData2[Symbol.iterator]();
      expect(it2.next().done).toBeFalsy();
      expect(it2.next().done).toBeFalsy();
      expect(it2.next().done).toBeTruthy();

      chunkData2.setBlock(r(0, 0, 0, c2), Block.Air);
      chunkData2.setBlock(r(5, 0, 0, c2), Block.Air);
      const it3 = chunkData2[Symbol.iterator]();
      expect(it3.next().done).toBeTruthy();
    });
  });
}
