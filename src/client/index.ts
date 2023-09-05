import * as Skyloft from "@skyloft";
import io from "socket.io-client";

const socket = io();

// Create view
const view = new Skyloft.View();

// Create game
const game = new Skyloft.Game(view);
