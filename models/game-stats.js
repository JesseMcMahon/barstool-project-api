import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GameStatsSchema = new Schema({
  timeFetched: Date,
  data: Object,
});

const GameStats = mongoose.model("game-stats", GameStatsSchema);

export default GameStats;
