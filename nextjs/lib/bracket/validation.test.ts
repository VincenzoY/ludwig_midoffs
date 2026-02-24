import { describe, it, expect } from "vitest";
import { validate_bracket, validate_bracket_internal } from "./validation";
import { Match } from "./types";

// Helper to create a match
function create_match(
  round: number,
  position: number,
  player_1_id: string | null,
  player_2_id: string | null,
  winner_id: string | null = null
): Match {
  return {
    match_id: [round, position],
    player_1_id,
    player_2_id,
    result: winner_id ? { winner_id } : null,
  };
}

describe("validate_bracket", () => {
  describe("baseline comparison", () => {
    it("accepts submission matching completed baseline", () => {
      const baseline: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
      ];
      const submission: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
      ];

      const result = validate_bracket(submission, baseline);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("rejects submission with different winner than baseline", () => {
      const baseline: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
      ];
      const submission: Match[] = [
        create_match(1, 0, "p1", "p2", "p2"),
      ];

      const result = validate_bracket(submission, baseline);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toContain("differs from completed baseline");
    });

    it("rejects submission missing result for completed baseline match", () => {
      const baseline: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
      ];
      const submission: Match[] = [
        create_match(1, 0, "p1", "p2", null),
      ];

      const result = validate_bracket(submission, baseline);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toContain("missing result in submission");
    });

    it("rejects submission with different players than baseline", () => {
      const baseline: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
      ];
      const submission: Match[] = [
        create_match(1, 0, "p1", "p3", "p1"),
      ];

      const result = validate_bracket(submission, baseline);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toContain("players differ from baseline");
    });

    it("rejects submission with match not in baseline", () => {
      const baseline: Match[] = [
        create_match(1, 0, "p1", "p2", null),
      ];
      const submission: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
        create_match(1, 1, "p3", "p4", "p3"), // not in baseline
      ];

      const result = validate_bracket(submission, baseline);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toContain("does not exist in baseline");
      expect(result.errors[0].match_id).toEqual([1, 1]);
    });

    it("allows submission to add results to incomplete baseline matches", () => {
      const baseline: Match[] = [
        create_match(1, 0, "p1", "p2", null),
      ];
      const submission: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
      ];

      const result = validate_bracket(submission, baseline);
      expect(result.valid).toBe(true);
    });
  });

  describe("winner advancement", () => {
    it("accepts correct winner advancement to next round", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
        create_match(1, 1, "p3", "p4", "p4"),
        create_match(2, 0, "p1", "p4", null),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });

    it("rejects incorrect player 1 advancement", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
        create_match(1, 1, "p3", "p4", "p4"),
        create_match(2, 0, "p2", "p4", null), // p2 should be p1
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("Player 1 should be winner");
    });

    it("rejects incorrect player 2 advancement", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
        create_match(1, 1, "p3", "p4", "p4"),
        create_match(2, 0, "p1", "p3", null), // p3 should be p4
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("Player 2 should be winner");
    });

    it("allows null players when feeder match has no winner yet", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", null), // no winner yet
        create_match(1, 1, "p3", "p4", "p4"),
        create_match(2, 0, null, "p4", null), // player 1 unknown
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });
  });

  describe("result consistency", () => {
    it("accepts valid winner who is player 1", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });

    it("accepts valid winner who is player 2", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", "p2"),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });

    it("rejects winner who is not a player in the match", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", "p3"),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain("not a player in this match");
    });

    it("accepts match with no result", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", null),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });
  });

  describe("multi-round bracket", () => {
    it("validates a complete 4-player bracket", () => {
      const matches: Match[] = [
        // Round 1
        create_match(1, 0, "p1", "p2", "p1"),
        create_match(1, 1, "p3", "p4", "p3"),
        // Round 2 (Final)
        create_match(2, 0, "p1", "p3", "p1"),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });

    it("validates an 8-player bracket with correct advancement", () => {
      const matches: Match[] = [
        // Round 1
        create_match(1, 0, "p1", "p2", "p1"),
        create_match(1, 1, "p3", "p4", "p4"),
        create_match(1, 2, "p5", "p6", "p5"),
        create_match(1, 3, "p7", "p8", "p8"),
        // Round 2
        create_match(2, 0, "p1", "p4", "p4"),
        create_match(2, 1, "p5", "p8", "p5"),
        // Round 3 (Final)
        create_match(3, 0, "p4", "p5", "p5"),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });

    it("catches advancement error in middle round", () => {
      const matches: Match[] = [
        // Round 1
        create_match(1, 0, "p1", "p2", "p1"),
        create_match(1, 1, "p3", "p4", "p4"),
        create_match(1, 2, "p5", "p6", "p5"),
        create_match(1, 3, "p7", "p8", "p8"),
        // Round 2 - wrong player in position 1
        create_match(2, 0, "p1", "p3", "p1"), // p3 should be p4
        create_match(2, 1, "p5", "p8", "p5"),
        // Round 3
        create_match(3, 0, "p1", "p5", null),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.match_id[0] === 2 && e.match_id[1] === 0)).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("handles empty bracket", () => {
      const result = validate_bracket_internal([]);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("handles single match", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", "p2", "p1"),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });

    it("handles bye match (one player null)", () => {
      const matches: Match[] = [
        create_match(1, 0, "p1", null, "p1"),
        create_match(1, 1, "p2", "p3", "p2"),
        create_match(2, 0, "p1", "p2", null),
      ];

      const result = validate_bracket_internal(matches);
      expect(result.valid).toBe(true);
    });
  });
});
