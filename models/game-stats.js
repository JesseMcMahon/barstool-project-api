import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GameStatsSchema = new Schema({
  timeFetched: Date,
  data: Object,
  league: String,
});

const GameStats = mongoose.model("game-stats", GameStatsSchema);

export default GameStats;
