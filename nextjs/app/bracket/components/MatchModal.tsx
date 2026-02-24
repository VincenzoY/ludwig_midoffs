"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/GenericComponents/Modal/Modal";
import { Match, PlayerId } from "@/lib/bracket/types";
import pb, { Player } from "@/lib/pocketbase/pocketbase";
import Image from "next/image";
import Video from "@/components/Icons/Video/Video";
import MCSR from "@/components/Icons/MCSR/MCSR";

interface MatchModalProps {
  match: Match;
  children: React.ReactNode;
}

interface MatchDetailsModalProps {
  match: Match;
  player_1_id: PlayerId | null;
  player_2_id: PlayerId | null;
}

async function fetch_player(player_id: string | null): Promise<Player | null> {
  if (!player_id) return null;
  return await pb.fetchRecordFromCollectionById<Player>("players", player_id);
}

interface PlayerCardProps {
  player_id: PlayerId | null;
  wins?: number;
  is_winner: boolean;
}

function PlayerCard({ player_id, wins, is_winner }: PlayerCardProps) {
  const { data: player, isLoading } = useQuery({
    queryKey: ["player", player_id],
    queryFn: () => fetch_player(player_id),
    enabled: !!player_id,
  });

  if (!player_id) {
    return (
      <div className="h-10 p-2 bg-zinc-100 dark:bg-zinc-700 rounded flex items-center" />
    );
  }

  if (isLoading) {
    return (
      <div className="h-10 p-2 bg-zinc-100 dark:bg-zinc-700 rounded animate-pulse flex items-center">
        <div className="h-5 bg-zinc-200 dark:bg-zinc-600 rounded w-24" />
      </div>
    );
  }

  return (
    <div className={`p-3 rounded flex flex-row justify-between ${is_winner ? "bg-offbrand/20" : "bg-zinc-100 dark:bg-zinc-700"}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {player && (
            <Image
              src={`https://mc-heads.net/avatar/${player.mc_username}/64`}
              alt={`${player.name}'s MC skin`}
              width={24}
              height={24}
              className="rounded"
            />
          )}
          <span className={`text-zinc-900 dark:text-zinc-100 ${is_winner ? "font-semibold" : ""}`}>
            {player?.name ?? player_id}
          </span>
        </div>
        {player && (
          <div className="flex flex-col gap-1">
            {player.stream && (
              <a
                href={player.stream}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <Video className="w-4 h-4 fill-current" />
                <span>{player.stream}</span>
              </a>
            )}
            <a
              href={`https://mcsrranked.com/stats/${player.mc_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <MCSR width={16} height={16} />
              <span>mcsrranked.com/stats/{player.mc_username}</span>
            </a>
          </div>
        )}
      </div>
      {wins !== undefined && (
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {wins}
        </span>
      )}
    </div>
  );
}

const MatchDetailsModal = NiceModal.create<MatchDetailsModalProps>(
  ({ match, player_1_id, player_2_id }) => {
    const modal = useModal();

    return (
      <Modal
        title="Match Details"
        visible={modal.visible}
        onClose={() => modal.hide()}
        onExited={() => modal.remove()}
      >
        <div className="space-y-4 w-72 sm:w-80 md:w-96">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            <p>Match ID: [{match.match_id[0]}, {match.match_id[1]}]</p>
            <p>Status: {match.result.status}</p>
          </div>
          <div className="space-y-2">
            <PlayerCard
              player_id={player_1_id}
              wins={match.result.player_1_wins}
              is_winner={match.result.winner_id === player_1_id}
            />
            <PlayerCard
              player_id={player_2_id}
              wins={match.result.player_2_wins}
              is_winner={match.result.winner_id === player_2_id}
            />
          </div>
        </div>
      </Modal>
    );
  }
);

export function MatchModal({ match, children }: MatchModalProps) {
  const handleClick = () => {
    NiceModal.show(MatchDetailsModal, {
      match,
      player_1_id: match.player_1_id,
      player_2_id: match.player_2_id,
    });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}
