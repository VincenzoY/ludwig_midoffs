"use client";

import Image from "next/image";
import { useBracket } from "../hooks/useBracket";
import { Bracket } from "./Bracket";

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString();
}

function LastUpdated({ timestamp }: { timestamp: string }) {
  return (
    <p className="text-xs text-zinc-400 dark:text-zinc-500">
      Last updated: {formatTimestamp(timestamp)}
    </p>
  );
}

export function BracketContainer() {
  const { data: bracketEntry, isLoading, isError } = useBracket();

  if (isLoading) {
    return (
      <div className="py-16 px-8 flex justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-4" />
          <div className="h-96 bg-zinc-200 dark:bg-zinc-700 rounded w-[800px]" />
        </div>
      </div>
    );
  }

  if (isError || !bracketEntry) {
    return (
      <div className="py-16 px-8 flex justify-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          Unable to load bracket. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Bracket bracket={bracketEntry.bracket} />
      <LastUpdated timestamp={bracketEntry.updated} />
      <div className="flex items-center gap-2 px-3 py-2 mt-4 bg-zinc-800 border border-zinc-700 rounded-lg w-full">
        <span className="text-zinc-300 text-sm">Game 3.</span>
        <Image src="/Cinema.png" alt="Cinema" width={32} height={232} />
        <span className="text-zinc-300 text-sm">please don&apos;t throw anymore super.</span>
      </div>
    </div>
  );
}
