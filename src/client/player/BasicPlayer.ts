import { IPlayer } from "./IPlayer";
import { Vector3 } from "babylonjs";

export class BasicPlayer implements IPlayer {
  private position: Vector3;
  private velocity: Vector3;

  constructor(startPosition: Vector3) {
    this.position = startPosition;
    this.velocity = Vector3.Zero();
  }

  getPosition(): Vector3 { return this.position; }
  getVelocity(): Vector3 { return this.velocity; }
  setPosition(pos: Vector3) { this.position = pos; }
  setVelocity(vel: Vector3) { this.velocity = vel; }
}