import {Game} from "@client/game";
import {View} from "@client/view";
import io from "socket.io-client";

const socket = io();

// Create view
const view = new View();

// Create game
const game = new Game(view);
