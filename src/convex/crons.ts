import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "clear inactive games",
  { hours: 12},
  internal.games.clearInactiveGames,
);

export default crons;