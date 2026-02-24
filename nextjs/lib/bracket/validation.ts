import { Match, MatchId, PlayerId } from "./types";

export interface ValidationError {
  match_id: MatchId;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Get a match by its match_id from a list of matches
 */
function get_match_by_id(matches: Match[], match_id: MatchId): Match | null {
  return (
    matches.find(
      (m) => m.match_id[0] === match_id[0] && m.match_id[1] === match_id[1]
    ) ?? null
  );
}

/**
 * Get the match_ids of the two feeder matches for a given match
 * In a standard bracket, match at [round, position] is fed by:
 * - [round - 1, position * 2]
 * - [round - 1, position * 2 + 1]
 */
function get_feeder_match_ids(match_id: MatchId): [MatchId, MatchId] {
  const [round, position] = match_id;
  return [
    [round - 1, position * 2],
    [round - 1, position * 2 + 1],
  ];
}

/**
 * Get the winner of a match
 */
function get_match_winner(match: Match): PlayerId | null {
  if (!match.result) return null;
  return match.result.winner_id;
}

/**
 * Validates that a submitted bracket is valid:
 * 1. Winners from previous rounds correctly advance to next rounds
 * 2. Completed matches in the submission match the baseline
 * 3. Winner is a valid player in the match
 *
 * @param submission - The matches submission to validate
 * @param baseline - The existing matches with already completed results
 * @returns ValidationResult with valid flag and any errors
 */
export function validate_bracket(
  submission: Match[],
  baseline: Match[]
): ValidationResult {
  const errors: ValidationError[] = [];

  // Get all rounds sorted
  const rounds = [...new Set(submission.map((m) => m.match_id[0]))].sort(
    (a, b) => a - b
  );

  for (const match of submission) {
    const [round, position] = match.match_id;

    // 1. Check that match exists in baseline
    const baseline_match = get_match_by_id(baseline, match.match_id);
    if (!baseline_match) {
      errors.push({
        match_id: match.match_id,
        message: "Match does not exist in baseline",
      });
      continue;
    }

    // 2. Check that completed matches don't differ from baseline
    if (baseline_match.result !== null) {
      // Baseline match is completed, submission must match
      if (match.result === null) {
        errors.push({
          match_id: match.match_id,
          message: "Match was completed in baseline but missing result in submission",
        });
      } else if (match.result.winner_id !== baseline_match.result.winner_id) {
        errors.push({
          match_id: match.match_id,
          message: "Match result differs from completed baseline match",
        });
      }

      // Check players match baseline
      if (
        match.player_1_id !== baseline_match.player_1_id ||
        match.player_2_id !== baseline_match.player_2_id
      ) {
        errors.push({
          match_id: match.match_id,
          message: "Match players differ from baseline",
        });
      }
    }

    // 3. Check that winners advance correctly (for rounds after the first)
    const first_round = rounds[0];
    if (round > first_round) {
      const [feeder_1_id, feeder_2_id] = get_feeder_match_ids(match.match_id);
      const feeder_1 = get_match_by_id(submission, feeder_1_id);
      const feeder_2 = get_match_by_id(submission, feeder_2_id);

      // Check player 1 comes from correct feeder match
      if (feeder_1) {
        const feeder_1_winner = get_match_winner(feeder_1);
        if (feeder_1_winner !== null && match.player_1_id !== feeder_1_winner) {
          errors.push({
            match_id: match.match_id,
            message: `Player 1 should be winner of match [${feeder_1_id}] (${feeder_1_winner}), got ${match.player_1_id}`,
          });
        }
      }

      // Check player 2 comes from correct feeder match
      if (feeder_2) {
        const feeder_2_winner = get_match_winner(feeder_2);
        if (feeder_2_winner !== null && match.player_2_id !== feeder_2_winner) {
          errors.push({
            match_id: match.match_id,
            message: `Player 2 should be winner of match [${feeder_2_id}] (${feeder_2_winner}), got ${match.player_2_id}`,
          });
        }
      }
    }

    // 4. Validate result consistency
    if (match.result !== null) {
      const { winner_id } = match.result;

      // Winner must be one of the players
      if (winner_id !== null) {
        if (winner_id !== match.player_1_id && winner_id !== match.player_2_id) {
          errors.push({
            match_id: match.match_id,
            message: `Winner ${winner_id} is not a player in this match`,
          });
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates matches against themselves (no baseline comparison)
 * Useful for checking internal consistency
 */
export function validate_bracket_internal(matches: Match[]): ValidationResult {
  // Create an empty baseline with no results
  const empty_baseline: Match[] = matches.map((m) => ({
    ...m,
    result: null,
  }));

  return validate_bracket(matches, empty_baseline);
}
