import { BlockTargeter } from "./block-targeter";
import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

export class Camera {
  private targeter: BlockTargeter;
  private cam: Babylon.UniversalCamera;

  constructor(private scene: Babylon.Scene, private canvas: HTMLCanvasElement) {
    this.cam = this.initCamera();
    this.targeter = new BlockTargeter(this.cam, scene);
  }

  /**
   * Create and setup the Babylon UniversalCamera.
   */
  initCamera(): Babylon.UniversalCamera {
    
    const camera = new Babylon.UniversalCamera(
      "playerCamera",
      Vector3.Zero(),
      this.scene);
    camera.rotation = new Vector3(0.5, 0, 0);
    camera.angularSensibility = 500;
    camera.inertia = 0;
    camera.attachControl(this.canvas, false);
    camera.minZ = 0;
    return camera;
  }
}