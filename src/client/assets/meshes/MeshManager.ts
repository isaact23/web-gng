import * as Babylon from "babylonjs";
import { IMeshManager } from "./IMeshManager";

export class MeshManager implements IMeshManager {
  constructor(private scene: Babylon.Scene) {

  }
}