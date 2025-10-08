import { AiDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  const lowerNotes = notes?.toLowerCase() || "";

  // Simple keyword-based filtering
  const filtered = AiDoctorAgents.filter((agent) => {
    return (
      lowerNotes.includes(agent.specialist.toLowerCase()) ||
      lowerNotes.includes(agent.description.toLowerCase())
    );
  });

  // If no match, fallback to all or a subset
  return NextResponse.json(
    filtered.length > 0 ? filtered : AiDoctorAgents.slice(0, 3)
  );
}
