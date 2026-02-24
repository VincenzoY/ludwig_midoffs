"use client";

import { useQuery } from "@tanstack/react-query";
import { BracketEntry } from "@/lib/pocketbase/pocketbase";

async function fetchBracket(): Promise<BracketEntry> {
  const response = await fetch("/api/bracket");
  if (!response.ok) {
    throw new Error("Failed to fetch bracket");
  }
  return response.json();
}

export function useBracket() {
  return useQuery({
    queryKey: ["bracket"],
    queryFn: fetchBracket,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // refetch every 30 seconds
  });
}
