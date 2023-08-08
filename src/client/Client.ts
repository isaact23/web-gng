import * as ClusterGenerator from "./ClusterGenerator";
import * as Controller from "./controller/Controller";
import * as View from "./view/View";
import * as Babylon from "babylonjs";

// Create view
const view: View.IView = new View.BasicView();

// Create controller
const startPosition = new Babylon.Vector3(10, 20, 10);
const controller: Controller.IController = new Controller.BasicController(view, startPosition);

// Create cluster
const cluster = ClusterGenerator.createSineCluster();
controller.loadCluster(cluster);
