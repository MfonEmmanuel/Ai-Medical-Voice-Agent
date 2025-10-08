import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const sessionId = uuidv4();
    const user = await currentUser();
    const { notes, selectedDoctor } = await req.json();

    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        notes,
        selectedDoctor,
        createdOn: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (e) {
    return NextResponse.json(e);
  }
}

// ...existing GET function...

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  const result = await db
    .select()
    .from(SessionChatTable)
    // @ts-ignore
    .where(eq(SessionChatTable.sessionId, sessionId));

  return NextResponse.json(result[0]);
}
