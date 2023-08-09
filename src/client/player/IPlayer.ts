import { Vector3 } from "babylonjs";

export interface IPlayer {
  getPosition(): Vector3;
  getVelocity(): Vector3;
  setPosition(pos: Vector3): void;
  setVelocity(vel: Vector3): void;
}