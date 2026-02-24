export type PlayerId = string;
export type MatchId = [number, number]; // [round, position]

export type MatchStatus = "WAITING" | "IN_PROGRESS" | "COMPLETED";

export interface MatchResult {
  status: MatchStatus;
  player_1_wins?: number;
  player_2_wins?: number;
  winner_id?: PlayerId;
}

export interface Match {
  match_id: MatchId;
  player_1_id: PlayerId | null;
  player_2_id: PlayerId | null;
  result: MatchResult;
}

export interface RoundConfig {
  round: number;
  name: string;
}

export interface Bracket {
  name: string;
  rounds: RoundConfig[];
  matches: Match[];
}
