import { IClusterData } from "@share/cluster-data";

export interface ServerToClientEvents {
    cluster: (c: IClusterData) => void;
    basicEmit: (a: number) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}
