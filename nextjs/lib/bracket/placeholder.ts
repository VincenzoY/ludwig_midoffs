import { Bracket } from "./types";

export const placeholder_bracket: Bracket = {
  id: "bracket-1",
  name: "Midoffs 2026",
  players: [
    { id: "p1", seed: 1 },
    { id: "p2", seed: 2 },
    { id: "p3", seed: 3 },
    { id: "p4", seed: 4 },
    { id: "p5", seed: 5 },
    { id: "p6", seed: 6 },
    { id: "p7", seed: 7 },
    { id: "p8", seed: 8 },
    { id: "p9", seed: 9 },
    { id: "p10", seed: 10 },
    { id: "p11", seed: 11 },
    { id: "p12", seed: 12 },
  ],
  rounds: [
    { round: 1, name: "Round 1" },
    { round: 2, name: "Quarterfinals" },
    { round: 3, name: "Semifinals" },
    { round: 4, name: "Final" },
  ],
  matches: [
    // Round 1 (8 matches: 4 byes, 4 actual matches)
    {
      match_id: [1, 0],
      player_1_id: "p1",
      player_2_id: null,
      result: { player_1_wins: 0, player_2_wins: 0, winner_id: "p1" }, // Bye
    },
    {
      match_id: [1, 1],
      player_1_id: "p8",
      player_2_id: "p9",
      result: { player_1_wins: 2, player_2_wins: 1, winner_id: "p8" },
    },
    {
      match_id: [1, 2],
      player_1_id: "p4",
      player_2_id: null,
      result: { player_1_wins: 0, player_2_wins: 0, winner_id: "p4" }, // Bye
    },
    {
      match_id: [1, 3],
      player_1_id: "p5",
      player_2_id: "p12",
      result: { player_1_wins: 2, player_2_wins: 0, winner_id: "p5" },
    },
    {
      match_id: [1, 4],
      player_1_id: "p2",
      player_2_id: null,
      result: { player_1_wins: 0, player_2_wins: 0, winner_id: "p2" }, // Bye
    },
    {
      match_id: [1, 5],
      player_1_id: "p7",
      player_2_id: "p10",
      result: { player_1_wins: 1, player_2_wins: 2, winner_id: "p10" },
    },
    {
      match_id: [1, 6],
      player_1_id: "p3",
      player_2_id: null,
      result: { player_1_wins: 0, player_2_wins: 0, winner_id: "p3" }, // Bye
    },
    {
      match_id: [1, 7],
      player_1_id: "p6",
      player_2_id: "p11",
      result: { player_1_wins: 2, player_2_wins: 1, winner_id: "p6" },
    },

    // Quarterfinals (4 matches)
    {
      match_id: [2, 0],
      player_1_id: "p1",
      player_2_id: "p8",
      result: { player_1_wins: 2, player_2_wins: 0, winner_id: "p1" },
    },
    {
      match_id: [2, 1],
      player_1_id: "p4",
      player_2_id: "p5",
      result: { player_1_wins: 2, player_2_wins: 1, winner_id: "p4" },
    },
    {
      match_id: [2, 2],
      player_1_id: "p2",
      player_2_id: "p10",
      result: { player_1_wins: 2, player_2_wins: 0, winner_id: "p2" },
    },
    {
      match_id: [2, 3],
      player_1_id: "p3",
      player_2_id: "p6",
      result: { player_1_wins: 1, player_2_wins: 2, winner_id: "p6" },
    },

    // Semifinals (2 matches)
    {
      match_id: [3, 0],
      player_1_id: "p1",
      player_2_id: "p4",
      result: { player_1_wins: 2, player_2_wins: 1, winner_id: "p1" },
    },
    {
      match_id: [3, 1],
      player_1_id: "p2",
      player_2_id: "p6",
      result: null, // Not yet played
    },

    // Final (1 match)
    {
      match_id: [4, 0],
      player_1_id: "p1",
      player_2_id: null, // Waiting for SF-2 winner
      result: null,
    },
  ],
};
