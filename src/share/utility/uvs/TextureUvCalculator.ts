import { Block } from "../Block";
import { Face } from "../Face";
import { TEXTURE_UV_DATA } from "./TextureUvData";

const TILEMAP_SIZE = 16;
const OFFSET = 0.005;

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
    let blockInfo = TEXTURE_UV_DATA[block];
    if (blockInfo == undefined) {
      return [0, 0];
    }

    if (Array.isArray(blockInfo)) {
      return blockInfo;
    }

    let faceInfo = blockInfo[face];
    if (faceInfo == undefined) {
      return [0, 0];
    }

    return faceInfo;
  }
}