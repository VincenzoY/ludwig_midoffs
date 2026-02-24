import { Bracket } from "./components/Bracket";
import pb, { BracketEntry } from "@/lib/pocketbase/pocketbase";
import { withLoggedInSession } from "@/lib/pocketbase/server/login";

async function getMostRecentBracket() {
  try {
    return await withLoggedInSession(async () => {
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
  } catch (error) {
    return null;
  }
}

export default async function BracketPage() {
  const bracketEntry = await getMostRecentBracket();

  if (!bracketEntry) {
    return (
      <div className="py-16 px-8 flex justify-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          Unable to load bracket. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 px-8 flex justify-center">
      <Bracket bracket={bracketEntry.bracket} />
    </div>
  );
}
