import { Bracket } from "./types";

export const placeholder_bracket: Bracket = {
  id: "bracket-1",
  name: "Spring Tournament 2026",
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
  matches: [
    // Round 1 (8 matches: 4 byes, 4 actual matches)
    {
      round: 1,
      position: 0,
      player_1_id: "p1",
      player_2_id: null,
      result: { player_1_wins: 0, player_2_wins: 0, winner_id: "p1" }, // Bye
    },
    {
      round: 1,
      position: 1,
      player_1_id: "p8",
      player_2_id: "p9",
      result: { player_1_wins: 2, player_2_wins: 1, winner_id: "p8" },
    },
    {
      round: 1,
      position: 2,
      player_1_id: "p4",
      player_2_id: null,
      result: { player_1_wins: 0, player_2_wins: 0, winner_id: "p4" }, // Bye
    },
    {
      round: 1,
      position: 3,
      player_1_id: "p5",
      player_2_id: "p12",
      result: { player_1_wins: 2, player_2_wins: 0, winner_id: "p5" },
    },
    {
      round: 1,
      position: 4,
      player_1_id: "p2",
      player_2_id: null,
      result: { player_1_wins: 0, player_2_wins: 0, winner_id: "p2" }, // Bye
    },
    {
      round: 1,
      position: 5,
      player_1_id: "p7",
      player_2_id: "p10",
      result: { player_1_wins: 1, player_2_wins: 2, winner_id: "p10" },
    },
    {
      round: 1,
      position: 6,
      player_1_id: "p3",
      player_2_id: null,
      result: { player_1_wins: 0, player_2_wins: 0, winner_id: "p3" }, // Bye
    },
    {
      round: 1,
      position: 7,
      player_1_id: "p6",
      player_2_id: "p11",
      result: { player_1_wins: 2, player_2_wins: 1, winner_id: "p6" },
    },

    // Quarterfinals (4 matches)
    {
      round: 2,
      position: 0,
      player_1_id: "p1",
      player_2_id: "p8",
      result: { player_1_wins: 2, player_2_wins: 0, winner_id: "p1" },
    },
    {
      round: 2,
      position: 1,
      player_1_id: "p4",
      player_2_id: "p5",
      result: { player_1_wins: 2, player_2_wins: 1, winner_id: "p4" },
    },
    {
      round: 2,
      position: 2,
      player_1_id: "p2",
      player_2_id: "p10",
      result: { player_1_wins: 2, player_2_wins: 0, winner_id: "p2" },
    },
    {
      round: 2,
      position: 3,
      player_1_id: "p3",
      player_2_id: "p6",
      result: { player_1_wins: 1, player_2_wins: 2, winner_id: "p6" },
    },

    // Semifinals (2 matches)
    {
      round: 3,
      position: 0,
      player_1_id: "p1",
      player_2_id: "p4",
      result: { player_1_wins: 2, player_2_wins: 1, winner_id: "p1" },
    },
    {
      round: 3,
      position: 1,
      player_1_id: "p2",
      player_2_id: "p6",
      result: null, // Not yet played
    },

    // Final (1 match)
    {
      round: 4,
      position: 0,
      player_1_id: "p1",
      player_2_id: null, // Waiting for SF-2 winner
      result: null,
    },
  ],
};
