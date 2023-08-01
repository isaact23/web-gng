import { Face, Block } from "./Block";

const TILEMAP_SIZE = 16;

// Get UV coordinates for a texture within the tilemap.
export function getTextureUvs(block: Block, face: Face) : [number, number, number, number] {
  const coord = _getTextureCoordinateInTilemap(block, face);
  return [
    coord[0] / TILEMAP_SIZE,
    (coord[1] + 1) / TILEMAP_SIZE,
    (coord[0] + 1) / TILEMAP_SIZE,
    coord[1] / TILEMAP_SIZE
  ];
}

// Get coordinates of a texture in the tilemap.
function _getTextureCoordinateInTilemap(block: Block, face: Face): [number, number] {
  switch (block) {
    case Block.Air: return [4, 0];
    case Block.Stone: return [3, 0];
    case Block.Grass: {
      switch (face) {
        case Face.Top: return [0, 0];
        case Face.Bottom: return [2, 0];
        default: return [1, 0];
      }
    }
    default: return [4, 0];
  }
}
