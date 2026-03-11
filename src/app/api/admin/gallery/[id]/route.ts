import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function authorize(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");
  return secret === process.env.ADMIN_SECRET;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { caption, category, order } = await request.json();

  const image = await prisma.galleryImage.update({
    where: { id },
    data: {
      ...(caption !== undefined && { caption }),
      ...(category !== undefined && { category }),
      ...(order !== undefined && { order }),
    },
  });

  return NextResponse.json({ image });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.galleryImage.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
