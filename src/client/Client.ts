import * as WorldGenerator from "./WorldGenerator";
import * as Scene from "./scene/Scene";
import * as View from "./view/View";
import { Vector3 } from "babylonjs";

// Create view
const view: View.IView = new View.BasicView();

// Create Babylon 3D environment
const scene: Scene.IScene = new Scene.NoMeshScene();
scene.init(view, true, new Vector3(5, 17, 5), false);

// Create world
const world = WorldGenerator.createSineWorld();
scene.loadWorld(world);
