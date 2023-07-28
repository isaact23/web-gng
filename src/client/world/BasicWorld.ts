import { Vector3 } from "babylonjs/index";
import { IChunk } from "../chunk/IChunk";
import { IWorld } from "./IWorld";

export class BasicWorld implements IWorld {
  addChunk(chunk: IChunk): void {
    throw new Error("Method not implemented.");
  }
  getChunk(position: Vector3): IChunk {
    throw new Error("Method not implemented.");
  }
}