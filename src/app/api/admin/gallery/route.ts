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

  const images = await prisma.galleryImage.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return NextResponse.json({ images });
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, caption, category, order } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const image = await prisma.galleryImage.create({
    data: {
      url,
      caption: caption || null,
      category: category || null,
      order: order ?? 0,
    },
  });

  return NextResponse.json({ image }, { status: 201 });
}
