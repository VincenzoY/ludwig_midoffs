import { Match as MatchType } from "@/lib/bracket/types";
import { is_bye_match, get_match_winner } from "../utils";
import pb, { Player as PBPlayer } from "@/lib/pocketbase/pocketbase";
import Image from "next/image";
import Video from "@/components/Icons/Video/Video";

export const MATCH_HEIGHT = 80;

interface MatchProps {
  match: MatchType;
}

interface PlayerRowProps {
  player: PBPlayer | null;
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
      <span className="flex gap-2 flex-row items-center">
        <Image 
          src={`https://mc-heads.net/avatar/${player.mc_username}/64`} 
          alt={`${player.name}'s MC skin`} 
          width={20}
          height={20}
        />
        <span className="text-zinc-900 dark:text-zinc-100">{player.name}</span>
      </span>
      <span className="text-zinc-600 dark:text-zinc-400">
        {is_bye ? "BYE" : wins !== null ? wins : ""}
      </span>
    </div>
  );
}

async function fetch_player(player_id: string | null): Promise<PBPlayer | null> {
  if (!player_id) return null;
  try {
    return await pb.fetchRecordFromCollectionById<PBPlayer>("players", player_id);
  } catch {
    return null;
  }
}

export async function Match({ match }: MatchProps) {
  const [player_1_data, player_2_data] = await Promise.all([
    fetch_player(match.player_1_id),
    fetch_player(match.player_2_id),
  ]);

  const winner_id = get_match_winner(match);
  const is_bye = is_bye_match(match);
  const is_in_progress = match.result.status === "IN_PROGRESS";

  return (
    <div className="relative">
      <div
        className="w-44 border border-zinc-300 dark:border-zinc-700 rounded overflow-hidden box-content"
        style={{ height: MATCH_HEIGHT }}
      >
        <PlayerRow
          player={player_1_data}
          wins={match.result.player_1_wins ?? null}
          is_winner={winner_id === match.player_1_id}
          is_bye={is_bye}
        />
        <div className="border-t border-zinc-300 dark:border-zinc-700" />
        <PlayerRow
          player={player_2_data}
          wins={match.result.player_2_wins ?? null}
          is_winner={winner_id === match.player_2_id}
          is_bye={false}
        />
      </div>
      {is_in_progress && (
        <div className="absolute left-0 top-full mt-1 flex items-center gap-1 text-xs text-red-500">
          <Video className="w-3 h-3 fill-current" />
          <span>Current Match</span>
        </div>
      )}
    </div>
  );
}
