import { ClusterData, IClusterData } from "@share/data/cluster-data";
import { ContinuousClusterGenerator } from "@server/cluster-gen";
import { Socket } from "socket.io";
import { Server as IOServer } from 'socket.io';
import { Action } from "@share/action";
import { ServerIncoming, ServerOutgoing } from "@server/socket";
import { LoadClusterAction } from "@share/action/cluster/LoadClusterAction";
import { AddBlockAction } from "@share/action/block/AddBlockAction";
import { RemoveBlockAction } from "@share/action/block/RemoveBlockAction";
import { ActionData } from "@server/action/ActionData";

/**
 * Handler for server-side game logic.
 */
export class GameServer {
  private cluster: IClusterData;
  private outgoing: ServerOutgoing;

  /**
   * Initialize the game server.
   */
  constructor(
    private readonly io: IOServer
  ) {
    // Set up server-client comms
    this.outgoing = new ServerOutgoing(io);
    new ServerIncoming(this, io);

    // Generate a cluster
    console.log("Generating world");
    this.cluster = ContinuousClusterGenerator.createWorldCluster();
    console.log("Done generating world");
  }

  /**
   * Get the current cluster data.
   * @returns IClusterData with the server's cluster data.
   */
  getCluster(): IClusterData {
    return this.cluster;
  }

  /**
   * Handle a user connection.
   * @param socket The socket of the user that connected.
   */
  onConnection(socket: Socket) {
    const action = new LoadClusterAction(this.cluster);
    this.outgoing.sendActionTo(action, socket);
  }

  /**
   * Handle an action on the server side.
   */
  processAction(actionData: ActionData) {

    const action = actionData.action;
    this.cluster.processAction(action);

    if (action instanceof AddBlockAction || action instanceof RemoveBlockAction) {

      // Update all clients except for the one that sent the action
      this.outgoing.sendActionFrom(action, actionData.actor);
    }
  }
}
