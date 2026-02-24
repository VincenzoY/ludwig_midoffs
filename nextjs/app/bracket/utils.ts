import { Player, PlayerId, Match } from "@/lib/bracket/types";

export function get_player_by_id(
  players: Player[],
  id: PlayerId | null
): Player | null {
  if (id === null) return null;
  return players.find((player) => player.id === id) ?? null;
}

export function is_bye_match(match: Match): boolean {
  const has_one_player =
    (match.player_1_id === null) !== (match.player_2_id === null);
  return has_one_player && match.result !== null;
}

export function get_match_winner(match: Match): PlayerId | null {
  return match.result?.winner_id ?? null;
}

export function get_matches_by_round(matches: Match[], round: number): Match[] {
  return matches
    .filter((match) => match.match_id[0] === round)
    .sort((a, b) => a.match_id[1] - b.match_id[1]);
}
