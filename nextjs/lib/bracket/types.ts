export type PlayerId = string;
export type MatchId = [number, number]; // [round, position]

export interface Player {
  id: PlayerId;
  seed: number;
}

export interface MatchResult {
  player_1_wins?: number;
  player_2_wins?: number;
  winner_id: PlayerId | null;
}

export interface Match {
  match_id: MatchId;
  player_1_id: PlayerId | null;
  player_2_id: PlayerId | null;
  result: MatchResult | null;
}

export interface RoundConfig {
  round: number;
  name: string;
}

export interface Bracket {
  id: string;
  name: string;
  players: Player[];
  rounds: RoundConfig[];
  matches: Match[];
}
