import { Game } from "@client/game";
import { View } from "@client/view";
import io from "socket.io-client";

const DEBUG_MODE = true;

// Create socket.io connection to server
const socket = io();

// Create view
const view = new View();

// Create game
const game = new Game(view, DEBUG_MODE);
