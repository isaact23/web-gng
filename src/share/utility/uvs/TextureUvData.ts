import { Block, Face } from "..";

type Coord = [number, number];
type FaceMapping = {[face in Face]?: Coord};

type TextureUvData = {
  [block in Block]?: Coord | FaceMapping;
};

const sideFaces = (coord: Coord): FaceMapping => ({
  [Face.Front]: coord,
  [Face.Left ]: coord,
  [Face.Back ]: coord,
  [Face.Right]: coord
});

const TEXTURE_UV_DATA: TextureUvData = {
  [Block.Stone]: [3, 0],
  [Block.Grass]: {
    [Face.Top   ]: [0, 0],
    [Face.Bottom]: [2, 0],
    ...sideFaces([1, 0])
  },
  [Block.Dirt]: [2, 0],
  [Block.Sand]: [2, 1],
  [Block.Default]: [4, 0]
};

export { TEXTURE_UV_DATA };
