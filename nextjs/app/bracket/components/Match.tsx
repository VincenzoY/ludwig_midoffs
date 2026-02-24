import { Match as MatchType, Player } from "@/lib/bracket/types";
import { get_player_by_id, is_bye_match, get_match_winner } from "../utils";

export const MATCH_HEIGHT = 80;

interface MatchProps {
  match: MatchType;
  players: Player[];
}

interface PlayerRowProps {
  player: Player | null;
  wins: number | null;
  is_winner: boolean;
  is_bye: boolean;
}

function PlayerRow({ player, wins, is_winner, is_bye }: PlayerRowProps) {
  if (!player) {
    return (
      <div className="flex items-center justify-between px-3 py-2 text-zinc-400 dark:text-zinc-600">
        <span>-</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 ${
        is_winner
          ? "bg-offbrand/20 font-semibold"
          : "bg-white dark:bg-zinc-800"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          #{player.seed}
        </span>
        <span className="text-zinc-900 dark:text-zinc-100">{player.id}</span>
      </span>
      <span className="text-zinc-600 dark:text-zinc-400">
        {is_bye ? "BYE" : wins !== null ? wins : ""}
      </span>
    </div>
  );
}

export function Match({ match, players }: MatchProps) {
  const player_1 = get_player_by_id(players, match.player_1_id);
  const player_2 = get_player_by_id(players, match.player_2_id);
  const winner_id = get_match_winner(match);
  const is_bye = is_bye_match(match);

  return (
    <div
      className="w-44 border border-zinc-300 dark:border-zinc-700 rounded overflow-hidden box-content"
      style={{ height: MATCH_HEIGHT }}
    >
      <PlayerRow
        player={player_1}
        wins={match.result?.player_1_wins ?? null}
        is_winner={winner_id === match.player_1_id}
        is_bye={is_bye}
      />
      <div className="border-t border-zinc-300 dark:border-zinc-700" />
      <PlayerRow
        player={player_2}
        wins={match.result?.player_2_wins ?? null}
        is_winner={winner_id === match.player_2_id}
        is_bye={false}
      />
    </div>
  );
}
