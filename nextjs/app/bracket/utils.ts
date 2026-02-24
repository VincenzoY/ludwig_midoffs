import { Player, PlayerId, Match } from "@/bracket/types";

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

export function get_round_name(round: number): string {
  switch (round) {
    case 1:
      return "Round 1";
    case 2:
      return "Quarterfinals";
    case 3:
      return "Semifinals";
    case 4:
      return "Final";
    default:
      return `Round ${round}`;
  }
}

export function get_matches_by_round(matches: Match[], round: number): Match[] {
  return matches
    .filter((match) => match.round === round)
    .sort((a, b) => a.position - b.position);
}
