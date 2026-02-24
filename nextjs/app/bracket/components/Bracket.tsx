import { Bracket as BracketType } from "@/lib/bracket/types";
import { get_matches_by_round } from "../utils";
import { Round } from "./Round";
import { RoundConnector } from "./RoundConnector";

interface BracketProps {
  bracket: BracketType;
}

export async function Bracket({ bracket }: BracketProps) {
  // Fixed total height for the bracket
  const total_height = 800;

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="inline-flex flex-col gap-6 p-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {bracket.name}
        </h1>
        <div className="flex items-start">
          {bracket.rounds.map((round_config, index) => {
            const current_matches = get_matches_by_round(
              bracket.matches,
              round_config.round
            );
            const next_matches =
              index < bracket.rounds.length - 1
                ? get_matches_by_round(
                    bracket.matches,
                    bracket.rounds[index + 1].round
                  )
                : [];

            return (
              <div key={round_config.round} className="flex items-start">
                <Round
                  round_name={round_config.name}
                  matches={current_matches}
                  total_height={total_height}
                />
                {index < bracket.rounds.length - 1 && (
                  <RoundConnector
                    from_match_count={current_matches.length}
                    to_match_count={next_matches.length}
                    total_height={total_height}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
