import { IGameServer } from "@server/game-server";
import { ISocketIncoming } from "./ISocketIncoming";

/**
 * Handle incoming messages from a client and
 * send them to the IGameServer.
 */
export class SocketIncoming implements ISocketIncoming {
  
  constructor(private readonly gameServer: IGameServer) {
    
  }
}