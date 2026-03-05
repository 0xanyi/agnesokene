 import { NextRequest, NextResponse } from "next/server";
 import { prisma } from "@/lib/prisma";
 import { sanitize } from "@/lib/sanitize";
 import { isRateLimited } from "@/lib/rate-limit";
 
 export async function GET(request: NextRequest) {
   const { searchParams } = request.nextUrl;
   const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
   const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "6")));
   const skip = (page - 1) * limit;
 
   const [tributes, total] = await Promise.all([
     prisma.tribute.findMany({
       where: { approved: true },
       orderBy: { createdAt: "desc" },
       skip,
       take: limit,
       select: {
         id: true,
         name: true,
         relationship: true,
         message: true,
         photoUrl: true,
         createdAt: true,
       },
     }),
     prisma.tribute.count({ where: { approved: true } }),
   ]);
 
   return NextResponse.json({
     tributes,
     hasMore: skip + limit < total,
     total,
   });
 }
 
 export async function POST(request: NextRequest) {
   const ip =
     request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
     request.headers.get("x-real-ip") ||
     "unknown";
 
   if (isRateLimited(ip)) {
     return NextResponse.json(
       { error: "Too many submissions. Please try again later." },
       { status: 429 }
     );
   }
 
   let body: Record<string, unknown>;
   try {
     body = await request.json();
   } catch {
     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
   }
 
   // Honeypot check
   if (body._website) {
     return NextResponse.json({ success: true });
   }
 
   // Minimum time check (3 seconds)
   const rendered = parseInt(body._rendered as string);
   if (rendered && Date.now() - rendered < 3000) {
     return NextResponse.json({ success: true });
   }
 
   const name = sanitize((body.name as string) || "", 100);
   const email = body.email ? sanitize(body.email as string, 254) : null;
   const relationship = body.relationship
     ? sanitize(body.relationship as string, 100)
     : null;
   const message = sanitize((body.message as string) || "", 2000);
 
   if (!name || !message) {
     return NextResponse.json(
       { error: "Name and message are required." },
       { status: 400 }
     );
   }
 
   await prisma.tribute.create({
     data: {
       name,
       email,
       relationship,
       message,
       photoUrl: null,
       approved: false,
     },
   });
 
   return NextResponse.json({ success: true }, { status: 201 });
 }
