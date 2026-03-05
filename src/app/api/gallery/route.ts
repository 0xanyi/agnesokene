 import { NextRequest, NextResponse } from "next/server";
 import { prisma } from "@/lib/prisma";
 
 export async function GET(request: NextRequest) {
   const { searchParams } = request.nextUrl;
   const category = searchParams.get("category");
 
   const images = await prisma.galleryImage.findMany({
     where: category ? { category } : undefined,
     orderBy: [{ category: "asc" }, { order: "asc" }],
   });
 
   return NextResponse.json({ images });
 }
