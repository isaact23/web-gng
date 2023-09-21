import { Block } from "@share/utility";
import { ChunkData } from ".";
import { IChunkData} from ".";
import { Vector3 } from "babylonjs";
import { ChunkCoordinate } from "@share/data/coordinate/ChunkCoordinate";


describe('Testing ChunkData', () => {

  // Lambda to generate Vector3's
  const v = (x: number, y: number, z: number) => new Vector3(x, y, z);
  
  const chunkData1: IChunkData = new ChunkData(new ChunkCoordinate(0, 5, -2));

  test("Get ChunkData size", () => {
    expect(chunkData1.getSize()).toBe(32);
  });

  test("Ensure no out-of-bounds block getting or setting", () => {

    let errFuncs = new Array<() => void>;
    errFuncs.push(() => { chunkData1.setBlock(v(-1, 0, 0),  Block.Stone) });
    errFuncs.push(() => { chunkData1.setBlock(v(5, -6, 2),  Block.Air)   });
    errFuncs.push(() => { chunkData1.setBlock(v(5, 16, -8), Block.Grass) });
    errFuncs.push(() => { chunkData1.setBlock(v(32, 0, 0),  Block.Air)   });
    errFuncs.push(() => { chunkData1.setBlock(v(5, 35, 3),  Block.Stone) });
    errFuncs.push(() => { chunkData1.setBlock(v(5, 15, 40), Block.Stone) });
    
    errFuncs.push(() => { chunkData1.getBlock(v(-1, 0, 0))  });
    errFuncs.push(() => { chunkData1.getBlock(v(5, -6, 2))  });
    errFuncs.push(() => { chunkData1.getBlock(v(5, 16, -8)) });
    errFuncs.push(() => { chunkData1.getBlock(v(32, 0, 0))  });
    errFuncs.push(() => { chunkData1.getBlock(v(5, 35, 3))  });
    errFuncs.push(() => { chunkData1.getBlock(v(5, 15, 40)) });

    for (let errFunc of errFuncs) {
      expect(errFunc).toThrow(RangeError);
    }
  });

  test("Set and get blocks", () => {

    expect(chunkData1.getBlock(v(5, 0, 2))).toBe(Block.Air);
    chunkData1.setBlock(v(5, 0, 2), Block.Stone);
    expect(chunkData1.getBlock(v(5, 0, 2))).toBe(Block.Stone);

    expect(chunkData1.getBlock(v(16, 4, 31))).toBe(Block.Air);
    chunkData1.setBlock(v(16, 4, 31), Block.Grass);
    expect(chunkData1.getBlock(v(16, 4, 31))).toBe(Block.Grass);
  });

  test("Get chunk coordinate", () => {
    const c = chunkData1.getCoordinate();
    expect(c.x).toBe(0);
    expect(c.y).toBe(5);
    expect(c.z).toBe(-2);
  });


  const chunkData2: IChunkData = new ChunkData(new ChunkCoordinate(4, -5, 8));
  chunkData2.setBlock(v(0, 0, 0), Block.Stone);
  chunkData2.setBlock(v(31, 0, 0), Block.Grass);
  chunkData2.setBlock(v(0, 0, 15), Block.Dirt);
  chunkData2.setBlock(v(0, 12, 0), Block.Stone);
  chunkData2.setBlock(v(5, 4, 3), Block.Stone);
  chunkData2.setBlock(v(5, 5, 3), Block.Stone);
  chunkData2.setBlock(v(5, 5, 6), Block.Stone);

  test("ChunkData iterator", () => {

    const it1 = chunkData2.getIterator();
    expect(it1.next().value).toEqual([v(0, 0, 0), Block.Stone]);
    expect(it1.next().value).toEqual([v(31, 0, 0), Block.Grass]);
    expect(it1.next().value).toEqual([v(0, 12, 0), Block.Stone]);
    expect(it1.next().value).toEqual([v(5, 4, 3), Block.Stone]);
    expect(it1.next().value).toEqual([v(5, 5, 3), Block.Stone]);
    expect(it1.next().value).toEqual([v(5, 5, 6), Block.Stone]);
    expect(it1.next().value).toEqual([v(0, 0, 15), Block.Dirt]);
  });
});
