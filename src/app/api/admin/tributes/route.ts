 import { NextRequest, NextResponse } from "next/server";
 import { prisma } from "@/lib/prisma";
 
 export async function GET(request: NextRequest) {
   const secret = request.headers.get("authorization")?.replace("Bearer ", "");
   if (secret !== process.env.ADMIN_SECRET) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
 
   const tributes = await prisma.tribute.findMany({
     where: { approved: false },
     orderBy: { createdAt: "desc" },
   });
 
   return NextResponse.json({ tributes });
 }
