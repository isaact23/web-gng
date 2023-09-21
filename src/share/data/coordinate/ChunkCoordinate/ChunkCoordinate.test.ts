import { ChunkCoordinate, IChunkCoordinate } from ".";

describe('Testing ChunkCoordinate', () => {
  
  const chunkCoord: IChunkCoordinate = new ChunkCoordinate(1, 2, 3);

  test("Get values", () => {
    expect(chunkCoord.x).toBe(1);
    expect(chunkCoord.y).toBe(2);
    expect(chunkCoord.z).toBe(3);
  });
});