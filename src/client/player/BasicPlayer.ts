import { IPlayer } from "./IPlayer";
import { Vector3 } from "babylonjs";

export class BasicPlayer implements IPlayer {
  private position: Vector3;

  constructor(startPosition: Vector3) {
    this.position = startPosition;
  }

  getPosition(): Vector3 { return this.position; }
}