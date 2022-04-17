import Express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";

dotenv.config();

class App {
  app: Express.Application;

  constructor() {
    this.app = Express();

    this.SetMW();
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
    this.app.listen(port, () => {
      console.log(`[Express port number: ${port}] Server Start Success`);
    });
  }
}

export default new App();
