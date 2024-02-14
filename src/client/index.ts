import { Game } from "@client/game";
import { View } from "@client/view";

const DEBUG_MODE = false;



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
