import { NextResponse } from "next/server";
import pb, { BracketEntry } from "@/lib/pocketbase/pocketbase";
import { withLoggedInSession } from "@/lib/pocketbase/server/login";

export async function GET() {
  try {
    const bracketEntry = await withLoggedInSession(async () => {
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

    if (!bracketEntry) {
      return NextResponse.json({ error: "No bracket found" }, { status: 404 });
    }

    return NextResponse.json(bracketEntry);
  } catch (error) {
    console.error("Error fetching bracket:", error);
    return NextResponse.json(
      { error: "Failed to fetch bracket" },
      { status: 500 }
    );
  }
}
