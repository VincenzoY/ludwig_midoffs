import { Bracket } from "./components/Bracket";
import pb, { BracketEntry } from "@/lib/pocketbase/pocketbase";
import { withLoggedInSession } from "@/lib/pocketbase/server/login";

async function getMostRecentBracket() {
  return withLoggedInSession(async () => {
    const brackets = await pb.basePocketBase
      .collection("brackets")
      .getList<BracketEntry>(1, 1, {
        sort: "-created",
      });

    if (brackets.items.length === 0) {
      return null;
    }

    return brackets.items[0];
  });
}

export default async function BracketPage() {
  const bracketEntry = await getMostRecentBracket();

  if (!bracketEntry) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex justify-center items-center">
        <p className="text-zinc-500 dark:text-zinc-400">No bracket found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex justify-center">
      <Bracket bracket={bracketEntry.bracket} />
    </main>
  );
}
