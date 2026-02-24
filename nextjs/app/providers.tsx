"use client";

import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>{children}</NiceModal.Provider>
    </QueryClientProvider>
  );
}
