import * as Babylon from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core";
import { BlockTargeter } from "./avatar/camera/block-targeter/BlockTargeter";
import { Block } from "@share/utility/Block";
import { FaceVectorConverter } from "@share/utility";
import { ClientActionProcessor } from "@client/action/ClientActionProcessor";
import { RemoveBlockAction } from "@share/action/block/RemoveBlockAction";
import { AddBlockAction } from "@share/action/block/AddBlockAction";

/**
 * Control the local player movement.
 */
export class PlayerMotor {

  private blockTargeter: BlockTargeter;

  // Add a local player controller to the game.
  constructor(

    canvas: HTMLCanvasElement,
    engine: Babylon.Engine,
    scene: Babylon.Scene,
    actionProcessor: ClientActionProcessor,
    position: Vector3 | null = null,
    noclip: boolean = false
  ) {

    let playerPos = position ?? Vector3.Zero();
    let playerVel = Vector3.Zero();

    const capsule = Babylon.MeshBuilder.CreateCapsule("playerCapsule", {
      radius: 0.4,
      height: 1.8
    }, scene);
    capsule.position = playerPos;
    capsule.isPickable = false;

    const camera = new Babylon.UniversalCamera(
      "playerCamera",
      Vector3.Zero(),
      scene);
    camera.rotation = new Vector3(0.5, 0, 0);
    camera.angularSensibility = 500;
    camera.inertia = 0;
    camera.attachControl(canvas, false);
    camera.minZ = 0;

    this.blockTargeter = new BlockTargeter(camera, scene);
    
    const input = {
      forward: false,
      back: false,
      left: false,
      right: false,
      jump: false,
      shift: false
    };

    let grounded = false;

    // Main loop
    scene.registerBeforeRender(() => {

      
    });
  }
}
