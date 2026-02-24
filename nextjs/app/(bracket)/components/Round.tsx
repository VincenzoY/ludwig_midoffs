import { Match as MatchType } from "@/lib/bracket/types";
import { Match } from "./Match";

export const HEADER_HEIGHT = 36; // Height of round header: h-9 = 36px

interface RoundProps {
  round_name: string;
  matches: MatchType[];
  total_height: number; // Fixed height for all rounds
}

export async function Round({
  round_name,
  matches,
  total_height,
}: RoundProps) {
  return (
    <div className="flex flex-col">
      <h3
        className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 text-center"
        style={{ height: HEADER_HEIGHT }}
      >
        {round_name}
      </h3>
      <div
        className="flex flex-col justify-around"
        style={{ height: total_height }}
      >
        {matches.map((match) => (
          <Match
            key={`${match.match_id[0]}-${match.match_id[1]}`}
            match={match}
          />
        ))}
      </div>
    </div>
  );
}
