import { Vector3 } from "babylonjs";
import { IChunk } from "../chunk/IChunk";

export interface IWorld {
  addChunk(chunk: IChunk) : void;
  getChunk(position: Vector3) : IChunk;
}
