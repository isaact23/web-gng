import { Game } from "@client/game";
import { View } from "@client/view";
import { Incoming, Outgoing } from "./socket";
import io from "socket.io-client";

const DEBUG_MODE = false;

// Create view
const view = new View();

export const socket = io();

const game = new Game(view, socket, DEBUG_MODE);
