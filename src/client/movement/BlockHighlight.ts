import * as Babylon from "babylonjs";
import { Vector3 } from "babylonjs";

const VIEW_DISTANCE = 5;
let ball: Babylon.Mesh | null = null;

// Highlight a block based on the player view ray.
export function highlightBlock(camera: Babylon.UniversalCamera, scene: Babylon.Scene) {

  if (ball == null) {
    ball = Babylon.MeshBuilder.CreateSphere("ball");
    ball.scaling = new Vector3(0.2, 0.2, 0.2);
    ball.isPickable = false;
    scene.addMesh(ball);
  }

  const direction = camera.getDirection(Babylon.Axis.Z);

  const ray = new Babylon.Ray(camera.position, direction, VIEW_DISTANCE);

  const pickingInfo = scene.pickWithRay(ray);

  if (pickingInfo != null && pickingInfo.hit && pickingInfo.pickedPoint != null) {
    ball.position = pickingInfo.pickedPoint;
  } else {
    ball.position = new Vector3(0, -100, 0);
  }
}