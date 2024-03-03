import { ClientActionProcessor } from "@client/action/ClientActionProcessor";
import { Game } from "@client/game";
import { Action } from "@share/action";
import { AbsoluteCoordinate } from "@share/data/coordinate";
import { Block } from "@share/utility";
import { Socket } from "socket.io-client";

/**
 * Handle incoming messages from the server to the client.
 */
export class ClientIncoming {

  private loadedCluster = false;

  constructor(
    private socket: Socket,
    private actionProcessor: ClientActionProcessor
  ) {
    socket.on("action", action => this.handleAction(action));
  }

  /**
   * Handle an incoming Action from the server to
   * update the client locally.
   */
  handleAction(action: Action) {
    this.actionProcessor.updateLocal(action);
  }
}
