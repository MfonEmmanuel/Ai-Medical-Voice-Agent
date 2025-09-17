import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  try {
    // check if user exists
    // @ts-ignore
    const users = await db
      .select()
      .from(usersTable)
      .where(
        eq(usersTable.email, user?.primaryEmailAddress?.emailAddress ?? "")
      );
    // if user does not exist, create a new user
    if (users.length == 0) {
      const result = await db
        .insert(usersTable)
        .values({
          name: user?.fullName || "No name",
          email: user?.primaryEmailAddress?.emailAddress || "No email",
          credit: 10,
          // @ts-ignore
        })
        .returning();
      return NextResponse.json(result[0]);
    }
    return NextResponse.json(users[0]);
  } catch (e) {
    return NextResponse.json(e);
  }
}
