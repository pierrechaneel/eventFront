// Custom server defintion

import express from "express";
import next from "next";
import path from "path";
import cors from "cors";
import httpPkg from "http";
import { Server } from "socket.io";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class CustomServer {
  static io;

  static startup() {
    //environment check
    if (process.argv.includes("production")) {
      //console.log("set it");
      process.env.NODE_ENV = "production";
    }

    const dev = process.env.NODE_ENV !== "production";
    const app = next({ dev });
    const handle = app.getRequestHandler();
    const PORT = Number.parseInt(process.argv?.pop()?.split("=")[1]) || 3004;

    // console.log(process?.env?.NODE_ENV);

    app.prepare().then(() => {
      // express server instantiation
      const server = express();

      // websocket spec
      const http = httpPkg.Server(server);

      this.io = new Server(http, {
        cors: {
          origin: "*",
          methods: ["GET", "POST", "PUT", "DELETE"],
        },
      });

      // websocket connection handling
      this.io.on("connection", (socket) => {
        console.info(`The terminal ${socket.id} connected`);

        //diconnection handling
        socket.on("disconnect", (msg) => {
          console.info(`The terminal ${socket.id} disconnected `);
        });
      });

      // set global io server

      server.use(
        "/media",
        express.static(path.join(__dirname, "../", "public/"))
      );

      server.use(
        express.json({
          limit: 52428800,
        })
      );

      server.use(express.urlencoded({ extended: true, limit: 52428800 }));
      server.use(cors());

      // next server's handlers delegation
      server.all("*", (req, res) => {
        return handle(req, res);
      });

      // server listening
      http.listen(PORT, (err) => {
        if (err) throw err;
        console.info(`Custom server bootstrapped successfully on ${PORT} PORT`);
      });
    });
  }

  static getIOHandler() {
    return this.io;
  }
}

if (process?.argv?.[0]?.includes("node")) {
  // startup server
  CustomServer.startup();
}
