import http from "http";
import Express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";
import SocketConnect from "./Socket";

dotenv.config();

class App {
  server: http.Server;
  app: Express.Application;

  constructor() {
    this.app = Express();
    this.SetMW();

    this.server = http.createServer(this.app);
    this.Start();
  }

  SetMW() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(Express.json());
    this.app.use("/static", Express.static("static"));

    this.app.use(routes);
  }

  Start() {
    const port = process.env.PORT || "80";
    this.server.listen(port, () => {
      console.log(`[Express port number: ${port}] Server Start Success`);
    });

    SocketConnect(this.server, this.app);
  }
}

export default new App();
