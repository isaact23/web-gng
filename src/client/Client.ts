import * as ClusterGenerator from "./cluster/ClusterGenerator";
import * as View from "./view/View";
import * as Babylon from "babylonjs";
import { BasicGame, IGame } from "./game/Game";
import { BasicView, IView } from "./view/View";

// Create view
const view: IView = new BasicView();

// Create game
const game: IGame = new BasicGame(view);

// Create and load cluster
const cluster = ClusterGenerator.createSineCluster();
game.loadCluster(cluster);
