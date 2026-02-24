import { Match as MatchType, Player } from "@/bracket/types";
import { get_round_name } from "../utils";
import { Match } from "./Match";

interface RoundProps {
  round: number;
  matches: MatchType[];
  players: Player[];
}

export function Round({ round, matches, players }: RoundProps) {
  const round_name = get_round_name(round);

  return (
    <div className="flex flex-col">
      <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-4 text-center">
        {round_name}
      </h3>
      <div className="flex flex-col justify-around flex-1 gap-4">
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
