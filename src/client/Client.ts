import * as ClusterGenerator from "./cluster/ClusterGenerator";
import * as View from "./view/View";
import * as Babylon from "babylonjs";
import { BasicGame, IGame } from "./game/Game";

// Create game
const game: IGame = new BasicGame(new View.BasicView(), new Babylon.Vector3(10, 20, 10));

// Create and load cluster
const cluster = ClusterGenerator.createSineCluster();
game.loadCluster(cluster);
