import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" },
  });

  if (!settings || !settings.livestreamOn || !settings.livestreamUrl) {
    return NextResponse.json({ live: false });
  }

  return NextResponse.json({
    live: true,
    url: settings.livestreamUrl,
    title: settings.livestreamTitle,
  });
}
