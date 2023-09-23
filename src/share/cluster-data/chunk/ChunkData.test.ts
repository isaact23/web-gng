import { Block } from "@share/utility";
import { ChunkData } from ".";
import { IChunkData} from ".";
import { Vector3 } from "babylonjs";
import { ChunkCoordinate, IChunkCoordinate } from "@share/data/coordinate/ChunkCoordinate";
import { RelativeCoordinate, IRelativeCoordinate } from "@share/data/coordinate/RelativeCoordinate";


describe('Testing ChunkData', () => {

  // Lambda to generate relative coordinates
  const r: (x: number, y: number, z: number, c: IChunkCoordinate) => IRelativeCoordinate = 
           (x: number, y: number, z: number, c: IChunkCoordinate) => new RelativeCoordinate(x, y, z, c); 
  
  const chunkData1: IChunkData = new ChunkData(new ChunkCoordinate(0, 5, -2));
  const c = chunkData1.getCoordinate();

  test("Get ChunkData size", () => {
    expect(chunkData1.getSize()).toBe(32);
  });

  test("Ensure no out-of-bounds block getting or setting", () => {

    let errFuncs = new Array<() => void>;
    errFuncs.push(() => { chunkData1.setBlock(r(-1, 0, 0, c),  Block.Stone) });
    errFuncs.push(() => { chunkData1.setBlock(r(5, -6, 2, c),  Block.Air)   });
    errFuncs.push(() => { chunkData1.setBlock(r(5, 16, -8, c), Block.Grass) });
    errFuncs.push(() => { chunkData1.setBlock(r(32, 0, 0, c),  Block.Air)   });
    errFuncs.push(() => { chunkData1.setBlock(r(5, 35, 3, c),  Block.Stone) });
    errFuncs.push(() => { chunkData1.setBlock(r(5, 15, 40, c), Block.Stone) });
    
    errFuncs.push(() => { chunkData1.getBlock(r(-1, 0, 0, c))  });
    errFuncs.push(() => { chunkData1.getBlock(r(5, -6, 2, c))  });
    errFuncs.push(() => { chunkData1.getBlock(r(5, 16, -8, c)) });
    errFuncs.push(() => { chunkData1.getBlock(r(32, 0, 0, c))  });
    errFuncs.push(() => { chunkData1.getBlock(r(5, 35, 3, c))  });
    errFuncs.push(() => { chunkData1.getBlock(r(5, 15, 40, c)) });

    for (let errFunc of errFuncs) {
      expect(errFunc).toThrow(RangeError);
    }
  });

  test("Set and get blocks", () => {

    expect(chunkData1.getBlock(r(5, 0, 2, c))).toBe(Block.Air);
    chunkData1.setBlock(r(5, 0, 2, c), Block.Stone);
    expect(chunkData1.getBlock(r(5, 0, 2, c))).toBe(Block.Stone);

    expect(chunkData1.getBlock(r(16, 4, 31, c))).toBe(Block.Air);
    chunkData1.setBlock(r(16, 4, 31, c), Block.Grass);
    expect(chunkData1.getBlock(r(16, 4, 31, c))).toBe(Block.Grass);
  });

  test("Get chunk coordinate", () => {
    expect(c.x).toBe(0);
    expect(c.y).toBe(5);
    expect(c.z).toBe(-2);
  });


  const chunkData2: IChunkData = new ChunkData(new ChunkCoordinate(4, -5, 8));
  const c2 = chunkData2.getCoordinate();
  chunkData2.setBlock(r(0, 0, 0, c2), Block.Stone);
  chunkData2.setBlock(r(31, 0, 0, c2), Block.Grass);
  chunkData2.setBlock(r(0, 0, 15, c2), Block.Dirt);
  chunkData2.setBlock(r(0, 12, 0, c2), Block.Stone);
  chunkData2.setBlock(r(5, 4, 3, c2), Block.Stone);
  chunkData2.setBlock(r(5, 5, 3, c2), Block.Stone);
  chunkData2.setBlock(r(5, 5, 6, c2), Block.Stone);

  test("ChunkData iterator", () => {

    const it1 = chunkData2.getIterator();
    expect(it1.next().value).toEqual([r(0, 0, 0, c2), Block.Stone]);
    expect(it1.next().value).toEqual([r(31, 0, 0, c2), Block.Grass]);
    expect(it1.next().value).toEqual([r(0, 12, 0, c2), Block.Stone]);
    expect(it1.next().value).toEqual([r(5, 4, 3, c2), Block.Stone]);
    expect(it1.next().value).toEqual([r(5, 5, 3, c2), Block.Stone]);
    expect(it1.next().value).toEqual([r(5, 5, 6, c2), Block.Stone]);
    expect(it1.next().value).toEqual([r(0, 0, 15, c2), Block.Dirt]);
  });
});
