import { Block } from "@share/utility";
import { ChunkData } from ".";
import { IChunkData} from ".";
import { Vector3 } from "babylonjs";


describe('Testing ChunkData', () => {

  // Lambda to generate Vector3's
  const v = (x: number, y: number, z: number) => new Vector3(x, y, z);
  
  const chunkData1: IChunkData = new ChunkData(v(0, 5, -2), 32);

  test("Get ChunkData size", () => {
    expect(chunkData1.getSize()).toBe(32);
  });

  test("Ensure no out-of-bounds block setting", () => {

    const errFunc = () => { chunkData1.setBlock(v(-1, 0, 0), Block.Stone) };
    expect(errFunc).toThrow(RangeError);
  });

});