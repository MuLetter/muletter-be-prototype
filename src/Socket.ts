import http from "http";
import Express from "express";
import { Server, Socket } from "socket.io";

function SocketConnect(server: http.Server, app: Express.Application) {
  const io = new Server(server, {
    path: "/alert.io",
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  app.set("io", io);

  io.on("connection", (socket) => {
    console.log(`----[Alert.IO] Socket Connection :)----`);
    app.set("socket", socket);

    socket.on("disconnect", () => {
      console.log(`----[Alert.IO] Socket DisConnection :)----`);
    });
  });
}

export default SocketConnect;
