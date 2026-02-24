import { PlayerId, Match } from "@/lib/bracket/types";

export function is_bye_match(match: Match): boolean {
  const has_one_player =
    (match.player_1_id === null) !== (match.player_2_id === null);
  return has_one_player && match.result.status === "COMPLETED";
}

export function get_match_winner(match: Match): PlayerId | undefined {
  if (match.result.status !== "COMPLETED") return undefined;
  return match.result.winner_id;
}

export function get_matches_by_round(matches: Match[], round: number): Match[] {
  return matches
    .filter((match) => match.match_id[0] === round)
    .sort((a, b) => a.match_id[1] - b.match_id[1]);
}
