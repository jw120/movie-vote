const HTTP_PORT: number = 8003;

// Start debugging
import * as debug from "debug";
const d: debug.Debugger = debug("mvs:index");

// Create and start http Server
import * as http from "http";
import httpRequestHandler from "./httpRequestHandler";
const httpServer: http.Server = http.createServer(httpRequestHandler);
httpServer.listen(HTTP_PORT);
d("http server listening on", HTTP_PORT);

// Start up socket server
import * as socket from "socket.io";
const socketServer: SocketIO.Server = socket(httpServer);
import setupSocketHandlers from "./setupSocketHandlers";
setupSocketHandlers(socketServer, debug("mvs:socketHandlers"));
