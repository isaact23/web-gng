import { Game } from "@client/game";
import { View } from "@client/view";
import io from "socket.io-client";

const DEBUG_MODE = false;

// Create socket.io connection to server
const socket = io();

// Create view
const view = new View();

let gotWorld = false;
console.log("Waiting for world");

socket.on("world", clusterString => {
    if (gotWorld) return;
    console.log("Got world");
    gotWorld = true;
    
    // Create game server
    const game = new Game(view, clusterString, DEBUG_MODE);
});
