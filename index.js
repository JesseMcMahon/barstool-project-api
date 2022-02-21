import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import GameStats from "./models/game-stats.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

let dbPath =
  "mongodb+srv://barstool_app:Test123@cluster0.kklnp.mongodb.net/test";

mongoose
  .connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected!"))
  .catch((err) => console.log(err));

let nbaUrl =
  "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json";

let mlbUrl =
  "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json";

let settings = { method: "Get" };
let gameData = [];

app.use(express.static("public"));

app.post("/api/nba", (req, res) => {
  // console.log("in NBA api");
  const { currentTime, league } = req.body;
  GameStats.findOne({ league: league })
    .limit(1)
    .sort({ $natural: -1 })
    .then((game) => {
      if (game) {
        if (game.timeFetched.getTime() + 15000 < currentTime) {
          fetch(nbaUrl, settings)
            .then((res) => res.json())
            .then((json) => {
              gameData = json;
              res.send(gameData);
              const newGameStats = new GameStats({
                timeFetched: Date.now(),
                data: gameData,
                league: league,
              });
              console.log("Data coming from NBA api");
              newGameStats.save();
            });
        } else {
          console.log("Data coming from NBA DB");
          res.send(game.data);
        }
      } else if (!game) {
        console.log("ERROR ERROR ERROR");
      }
    });
});

app.post("/api/mlb", (req, res) => {
  // console.log("In MLB api");
  const { previousRequest, currentTime, league } = req.body;
  GameStats.findOne({ league: league })
    .limit(1)
    .sort({ $natural: -1 })
    .then((game) => {
      if (game) {
        if (game.timeFetched.getTime() + 15000 < currentTime) {
          fetch(mlbUrl, settings)
            .then((res) => res.json())
            .then((json) => {
              gameData = json;
              res.send(gameData);
              const newGameStats = new GameStats({
                timeFetched: Date.now(),
                data: gameData,
                league: league,
              });
              console.log("data coming from MLB api");
              newGameStats.save();
            });
        } else {
          console.log("Data coming from MLB DB");
          res.send(game.data);
        }
      } else if (!game) {
        console.log("ERROR ERROR ERROR");
      }
    });
});

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
