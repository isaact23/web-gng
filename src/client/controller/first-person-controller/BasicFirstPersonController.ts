import * as Babylon from "babylonjs";
import { IFirstPersonController } from "./IFirstPersonController";
import { IController } from "../IController";
import { IView } from "../../view/IView";

export class BasicFirstPersonController implements IFirstPersonController {

  private velY: number = 0;

  constructor(
    private view: IView,
    private controller: IController,
    startPosition: Babylon.Vector3 = Babylon.Vector3.Zero())
  {
    this._addCamera(startPosition);
  }

  // Add a camera to the scene.
  _addCamera(startPosition: Babylon.Vector3): void {
    const engine = this.controller.getEngine();
    const scene = this.controller.getScene();
    const canvas = this.view.getCanvas();

    // Set up camera
    const camera = new Babylon.UniversalCamera("camera", startPosition, scene);
    camera.attachControl(canvas);

    camera.position = startPosition;
    camera.ellipsoid = new Babylon.Vector3(1, 1, 1);
    camera.applyGravity = true;
    camera.needMoveForGravity = false;
    camera.checkCollisions = true;
    camera.speed = 0.3;
    camera.minZ = 0.45; // Fix clipping
    camera.angularSensibility = 4000;

    // Add WASD
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);

    // Add pointer lock
    scene.onPointerDown = (event) => {
      engine.enterPointerlock();
    }
  }
}
