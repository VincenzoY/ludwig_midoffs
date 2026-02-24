import { Bracket } from "./components/Bracket";
import { placeholder_bracket } from "@/lib/bracket/placeholder";

export default function BracketPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <Bracket bracket={placeholder_bracket} />
    </main>
  );
}
