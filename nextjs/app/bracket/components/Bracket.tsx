import { Bracket as BracketType } from "@/bracket/types";
import { get_matches_by_round } from "../utils";
import { Round } from "./Round";

interface BracketProps {
  bracket: BracketType;
}

export function Bracket({ bracket }: BracketProps) {
  const rounds = [1, 2, 3, 4];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {bracket.name}
      </h1>
      <div className="flex gap-8 overflow-x-auto pb-4">
        {rounds.map((round) => (
          <Round
            key={round}
            round={round}
            matches={get_matches_by_round(bracket.matches, round)}
            players={bracket.players}
          />
        ))}
      </div>
    </div>
  );
}
