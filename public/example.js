import { Block } from "./block.js";
import { World } from "./world.js";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function (world) {
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1, segments: 32 }, scene);
  sphere.position.y = 0.5;

  const p1 = BABYLON.MeshBuilder.CreatePlane("plane", {width: 1, height: 1}, scene);
  p1.position = new BABYLON.Vector3(0, 0, 0);
  p1.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

  return scene;
};

// Create block data
const world = new World();
world.setBlock(0, 0, 0, Block.Stone);

// Create Babylon 3D environment
const scene = createScene(world);

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
