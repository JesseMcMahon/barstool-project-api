import fs from "fs";
import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

let nbaUrl =
  "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json";

let mlbUrl =
  "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json";

let settings = { method: "Get" };
let gameData = [];

app.use(express.static("public"));

app.get("/api/nba", (req, res) => {
  fetch(nbaUrl, settings)
    .then((res) => res.json())
    .then((json) => {
      gameData = json;
      console.log(gameData);
      res.send(gameData);
    });
});

app.get("/api/mlb", (req, res) => {
  fetch(mlbUrl, settings)
    .then((res) => res.json())
    .then((json) => {
      gameData = json;
      console.log(gameData);
      res.send(gameData);
    });
});

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
