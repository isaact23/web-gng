import { Game } from "@client/game";
import { View } from "@client/view";
import io from "socket.io-client";

const DEBUG_MODE = false;

// Create socket.io connection to server
const socket = io();

// Create view
const view = new View();

console.log("Waiting for world");
socket.on("world", cluster => {
    console.log("Got world");
    
    // Create game server
    const game = new Game(view, cluster, DEBUG_MODE);
});

