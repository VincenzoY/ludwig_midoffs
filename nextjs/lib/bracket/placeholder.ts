import { Bracket } from "./types";

export const placeholder_bracket: Bracket = {
  name: "Midoffs 2026",
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
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: null,
      result: { status: "COMPLETED", winner_id: "e1vmn5z8pxwrub8" }, // Bye
    },
    {
      match_id: [1, 1],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 2, player_2_wins: 1, winner_id: "e1vmn5z8pxwrub8" },
    },
    {
      match_id: [1, 2],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: null,
      result: { status: "COMPLETED", winner_id: "e1vmn5z8pxwrub8" }, // Bye
    },
    {
      match_id: [1, 3],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 2, player_2_wins: 0, winner_id: "e1vmn5z8pxwrub8" },
    },
    {
      match_id: [1, 4],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: null,
      result: { status: "COMPLETED", winner_id: "e1vmn5z8pxwrub8" }, // Bye
    },
    {
      match_id: [1, 5],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 1, player_2_wins: 2, winner_id: "e1vmn5z8pxwrub8" },
    },
    {
      match_id: [1, 6],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: null,
      result: { status: "COMPLETED", winner_id: "e1vmn5z8pxwrub8" }, // Bye
    },
    {
      match_id: [1, 7],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 2, player_2_wins: 1, winner_id: "e1vmn5z8pxwrub8" },
    },

    // Quarterfinals (4 matches)
    {
      match_id: [2, 0],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 2, player_2_wins: 0, winner_id: "e1vmn5z8pxwrub8" },
    },
    {
      match_id: [2, 1],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 2, player_2_wins: 1, winner_id: "e1vmn5z8pxwrub8" },
    },
    {
      match_id: [2, 2],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 2, player_2_wins: 0, winner_id: "e1vmn5z8pxwrub8" },
    },
    {
      match_id: [2, 3],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 1, player_2_wins: 2, winner_id: "e1vmn5z8pxwrub8" },
    },

    // Semifinals (2 matches)
    {
      match_id: [3, 0],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "COMPLETED", player_1_wins: 2, player_2_wins: 1, winner_id: "e1vmn5z8pxwrub8" },
    },
    {
      match_id: [3, 1],
      player_1_id: "e1vmn5z8pxwrub8",
      player_2_id: "e1vmn5z8pxwrub8",
      result: { status: "IN_PROGRESS" },
    },

    // Final (1 match)
    {
      match_id: [4, 0],
      player_1_id: null,
      player_2_id: null,
      result: { status: "WAITING" },
    },
  ],
};
