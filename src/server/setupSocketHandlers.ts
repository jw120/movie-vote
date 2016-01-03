// import { Debugger } from "debug";

export default function setupSocketHandlers(socketServer: SocketIO.Server, d: (...args: any[]) => void ): void {
  "use strict";

  socketServer.on("connection", (socket: SocketIO.Socket): void => {

    d(`Connection ${socket.id}`);

    socket.on("disconnect", () => {
      d("Diconnection");
    });

    socket.on("broadcast-request", (event: string, ...params: any[]): void => {
      d("Broadcasting:", event, ...params);
      socket.broadcast.emit(event, ...params);
    });

  });

}
