import { Match as MatchType, Player } from "@/bracket/types";
import { get_round_name } from "../utils";
import { Match } from "./Match";

export const HEADER_HEIGHT = 36; // Height of round header: h-9 = 36px

interface RoundProps {
  round: number;
  matches: MatchType[];
  players: Player[];
  total_height: number; // Fixed height for all rounds
}

export function Round({
  round,
  matches,
  players,
  total_height,
}: RoundProps) {
  const round_name = get_round_name(round);

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
            key={`${match.round}-${match.position}`}
            match={match}
            players={players}
          />
        ))}
      </div>
    </div>
  );
}
