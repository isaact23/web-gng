// Allow for paths such as @server or @share
require('module-alias/register');

import { Server } from "./Server";
import { IServer } from "./IServer";
export { Server, IServer };

// Initialize services
const server: IServer = new Server();
