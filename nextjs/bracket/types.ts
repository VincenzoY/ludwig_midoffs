export type PlayerId = string;

export interface Player {
  id: PlayerId;
  seed: number;
}

export interface MatchResult {
  player_1_wins: number;
  player_2_wins: number;
  winner_id: PlayerId | null;
}

export interface Match {
  round: number;
  position: number;
  player_1_id: PlayerId | null;
  player_2_id: PlayerId | null;
  result: MatchResult | null;
}

export interface Bracket {
  id: string;
  name: string;
  players: Player[];
  matches: Match[];
}
