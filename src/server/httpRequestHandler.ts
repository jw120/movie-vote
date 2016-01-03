/* @flow */

// Minimal request handler for http server

import * as http from "http";

const indexPageHtml: string =
  "<!DOCTYPE html>\n" +
  "<html>\n" +
  "<body> \n" +
  "Movie-vote-server socket.io server - no support for file serving\n" +
  "</body>\n" +
  "</html>\n";

export default function httpRequestHandler(
  /* tslint:disable:no-unused-variable */ // req is unused
  req: http.ServerRequest,
  /* tslint:disable:no-unused-variable */
  res: http.ServerResponse): void {

  "use strict";

  res.writeHead(200);
  res.end(indexPageHtml);
}
