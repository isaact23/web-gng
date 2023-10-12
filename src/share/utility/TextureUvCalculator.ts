import { Block } from "./Block";
import { Face } from "./Face";

const TILEMAP_SIZE = 16;
const OFFSET = 0.0005;

export class TextureUvCalculator {
  // Get UV coordinates for a texture within the tilemap.
  static getTextureUvs(block: Block, face: Face) : [number, number, number, number] {
    const coord = this._getTextureCoordinateInTilemap(block, face);
    return [
      (coord[0] / TILEMAP_SIZE) + OFFSET,
      ((TILEMAP_SIZE - coord[1] - 1) / TILEMAP_SIZE) + OFFSET,
      ((coord[0] + 1) / TILEMAP_SIZE) - OFFSET,
      ((TILEMAP_SIZE - coord[1]) / TILEMAP_SIZE) - OFFSET
    ];
  }

  // Get coordinates of a texture in the tilemap.
  static _getTextureCoordinateInTilemap(block: Block, face: Face): [number, number] {
    switch (block) {
      case Block.Air: {
        // return [4, 0];
        throw "Cannot get texture coordinate for air block."
      }
      case Block.Stone: return [3, 0];
      case Block.Grass: {
        switch (face) {
          case Face.Top: return [0, 0];
          case Face.Bottom: return [2, 0];
          default: return [1, 0];
        }
      }
      case Block.Dirt: return [2, 0];
      case Block.Sand: return [2, 1];
      default: return [4, 0];
    }
  }
}