import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filter = request.nextUrl.searchParams.get("filter");

  const where =
    filter === "pending"
      ? { approved: false }
      : filter === "approved"
        ? { approved: true }
        : undefined;

  const tributes = await prisma.tribute.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ tributes });
}
