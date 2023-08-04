import {createIsleWorld} from "./WorldGenerator";
import * as Scene from "./scene/Scene";
import * as View from "./view/View";

// Create view
const view: View.IView = new View.BasicView();

// Create Babylon 3D environment
const scene: Scene.IScene = new Scene.NoMeshScene();
scene.init(view);

// Create world
const world = createIsleWorld();
scene.loadWorld(world);
