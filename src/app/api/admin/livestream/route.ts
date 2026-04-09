import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function authorize(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");
  return secret === process.env.ADMIN_SECRET;
}

export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" },
  });

  return NextResponse.json({
    livestreamOn: settings?.livestreamOn ?? false,
    livestreamUrl: settings?.livestreamUrl ?? "",
    livestreamTitle: settings?.livestreamTitle ?? "",
  });
}

export async function PUT(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { livestreamOn, livestreamUrl, livestreamTitle } = await request.json();

  const settings = await prisma.siteSettings.upsert({
    where: { id: "global" },
    create: {
      id: "global",
      livestreamOn: livestreamOn ?? false,
      livestreamUrl: livestreamUrl ?? null,
      livestreamTitle: livestreamTitle ?? null,
    },
    update: {
      livestreamOn: livestreamOn ?? false,
      livestreamUrl: livestreamUrl ?? null,
      livestreamTitle: livestreamTitle ?? null,
    },
  });

  return NextResponse.json({
    livestreamOn: settings.livestreamOn,
    livestreamUrl: settings.livestreamUrl,
    livestreamTitle: settings.livestreamTitle,
  });
}
