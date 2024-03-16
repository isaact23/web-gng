import { Game } from "@client/game";
import { ClientOutgoing } from "@client/socket";
import { Action } from "@share/action";

/**
 * Handle Actions on the client side. Actions can be used
 * to update the client, the server, or both; in many ways,
 * i.e. to break blocks, move around, etc.
 */
export class ClientActionProcessor {

  constructor(private game: Game, private outgoing: ClientOutgoing) {}

  /**
   * Update both the server and client with an action.
   */
  updateLocalAndRemote(action: Action) {
    this.updateLocal(action);
    this.updateRemote(action);
  }

  /**
   * Update the client only (local) with an action.
   */
  updateLocal(action: Action) {
    this.game.processAction(action);
  }

  /**
   * Update the server only (remote) with an action.
   */
  updateRemote(action: Action) {
    this.outgoing.sendAction(action);
  }
}