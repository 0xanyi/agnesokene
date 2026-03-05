 import { NextRequest, NextResponse } from "next/server";
 import { prisma } from "@/lib/prisma";
 
 export async function POST(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
 ) {
   const secret = request.headers.get("authorization")?.replace("Bearer ", "");
   if (secret !== process.env.ADMIN_SECRET) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
 
   const { id } = await params;
   const body = await request.json().catch(() => ({}));
   const approved = (body as Record<string, unknown>).approved !== false;
 
   try {
     if (approved) {
       await prisma.tribute.update({
         where: { id },
         data: { approved: true },
       });
     } else {
       await prisma.tribute.delete({ where: { id } });
     }
     return NextResponse.json({ success: true });
   } catch {
     return NextResponse.json({ error: "Tribute not found" }, { status: 404 });
   }
 }
