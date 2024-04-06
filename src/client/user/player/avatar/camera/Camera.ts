import { BlockTargeter } from "./block-targeter";
import * as Babylon from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core";
import { IAbsoluteCoordinate } from "@share/data/coordinate";
import { Face } from "@share/utility";

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
      new Vector3(50, 50, 50),
      this.scene);
    camera.rotation = new Vector3(0.5, 0, 0);
    camera.angularSensibility = 500;
    camera.inertia = 0;
    camera.attachControl(this.canvas, false);
    camera.minZ = 0;
    return camera;
  }

  /**
   * Determine the block and face the player is currently targeting.
   * @returns The position and face of the targeted block, or null if no block is targeted.
   */
  public getTarget() : [IAbsoluteCoordinate, Face] | null {
    return this.targeter.getTarget();
  }

  public dispose() {
    this.cam.dispose();
  }
}