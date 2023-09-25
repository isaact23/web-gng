import * as Babylon from "babylonjs";

export interface IMeshManager {
  getFaceIndicatorMesh(): Promise<Babylon.AbstractMesh>; // Get face indicator mesh
}
