import * as Babylon from "babylonjs";
import { IFirstPersonController } from "./IFirstPersonController";
import { IController } from "../IController";
import { IView } from "../../view/IView";

export class BasicFirstPersonController implements IFirstPersonController {

  constructor(
    private view: IView,
    private controller: IController,
    startPosition: Babylon.Vector3 = Babylon.Vector3.Zero())
  {
    this._addCamera(startPosition);
  }

  // Add a camera to the scene.
  _addCamera(startPosition: Babylon.Vector3): void {

    // Set up camera
    const camera = new Babylon.UniversalCamera("camera", startPosition, this.controller.getScene());
    camera.attachControl(this.view.getCanvas());

    camera.position = startPosition;
    camera.ellipsoid = new Babylon.Vector3(.5, 1, .5);
    camera.applyGravity = true;
    camera.needMoveForGravity = true;
    camera.checkCollisions = true;
    camera.speed = 0.3;
    //camera.attachControl(this.canvas, true);

    // Add WASD
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
  }
}
