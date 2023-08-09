import * as ClusterGenerator from "./cluster/ClusterGenerator";
import * as View from "./view/View";
import * as Babylon from "babylonjs";
import { BasicGame, IGame } from "./game/Game";
import { BasicPlayer, IPlayer } from "./player/Player";
import { BasicView, IView } from "./view/View";

// Create view
const view: IView = new BasicView();

// Create player
const player: IPlayer = new BasicPlayer(new Babylon.Vector3(10, 20, 10));

// Create game
const game: IGame = new BasicGame(view, player);

// Create and load cluster
const cluster = ClusterGenerator.createSineCluster();
game.loadCluster(cluster);
