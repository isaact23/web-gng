import { Game } from "@client/game";
import { ServerOutgoing } from "@server/socket";
import { Action } from "@share/action";

/**
 * Handle Actions on the server side. Actions can be used
 * to update the client, the server, or both; in many ways,
 * i.e. to break blocks, move around, etc.
 */
export class ServerActionProcessor {

  constructor(private outgoing: ServerOutgoing) {}

  /**
   * Update both the server and client with an action.
   */
  updateServerAndClient(action: Action) {
    this.updateServer(action);
    this.updateClient(action);
  }

  /**
   * Update the server only (local) with an action.
   */
  updateServer(action: Action) {
    this.game.processAction(action);
  }

  /**
   * Update the client only (remote) with an action.
   */
  updateClient(action: Action) {
    this.outgoing.sendAction(action);
  }
}