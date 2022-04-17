import Express from "express";
import dotenv from "dotenv";
import axios from "axios";
import qs from "qs";

dotenv.config();

class AuthRouter {
  router: Express.Router;

  constructor() {
    this.router = Express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.router.get(
      "/token",
      async (req: Express.Request, res: Express.Response) => {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const spotifyTokenUrl = "https://accounts.spotify.com/api/token";

        try {
          const response = await axios.post(
            spotifyTokenUrl,
            qs.stringify({
              grant_type: "client_credentials",
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              auth: {
                username: clientId!,
                password: clientSecret!,
              },
            }
          );

          const spotify = response.data;

          return res.status(201).json({
            spotify,
          });
        } catch (err) {
          return res.status(500).json({
            message: "It's Error!",
          });
        }
      }
    );
  }
}

export default new AuthRouter().router;
