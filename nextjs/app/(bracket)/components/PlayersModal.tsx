"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/GenericComponents/Modal/Modal";
import { PlayerId } from "@/lib/bracket/types";
import pb, { Player } from "@/lib/pocketbase/pocketbase";
import Image from "next/image";
import Video from "@/components/Icons/Video/Video";
import MCSR from "@/components/Icons/MCSR/MCSR";

interface PlayersModalProps {
  player_ids: PlayerId[];
}

async function fetch_player(player_id: string): Promise<Player | null> {
  return await pb.fetchRecordFromCollectionById<Player>("players", player_id);
}

function PlayerCard({ player_id }: { player_id: PlayerId }) {
  const { data: player, isLoading } = useQuery({
    queryKey: ["player", player_id],
    queryFn: () => fetch_player(player_id),
  });

  if (isLoading || !player) {
    return null;
  }

  return (
    <div className="p-3 rounded bg-zinc-300 dark:bg-zinc-700">
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
          <span className="text-zinc-900 dark:text-zinc-100">
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
            {player.mc_username && (
              <a
                href={`https://mcsrranked.com/stats/${player.mc_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <MCSR width={16} height={16} />
                <span>mcsrranked.com/stats/{player.mc_username}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const PlayersListModal = NiceModal.create<PlayersModalProps>(
  ({ player_ids }) => {
    const modal = useModal();

    return (
      <Modal
        title="Players"
        visible={modal.visible}
        onClose={() => modal.hide()}
        onExited={() => modal.remove()}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[32rem] overflow-y-auto hide-scrollbar">
          {player_ids.map((player_id, index) => (
            <PlayerCard key={`${player_id}-${index}`} player_id={player_id} />
          ))}
        </div>
      </Modal>
    );
  }
);

interface PlayersButtonProps {
  player_ids: PlayerId[];
}

export function PlayersButton({ player_ids }: PlayersButtonProps) {
  const handleClick = () => {
    NiceModal.show(PlayersListModal, { player_ids });
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded transition-colors lg:hidden"
    >
      View Players
    </button>
  );
}

export function PlayersSidebar({ player_ids }: PlayersButtonProps) {
  return (
    <div className="hidden lg:flex lg:flex-col p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden min-w-[300px]">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 shrink-0">
        Players
      </h2>
      <div className="flex flex-col gap-2 overflow-y-scroll flex-1 min-h-0 hide-scrollbar">
        {player_ids.map((player_id, index) => (
          <PlayerCard key={`${player_id}-${index}`} player_id={player_id} />
        ))}
      </div>
    </div>
  );
}
