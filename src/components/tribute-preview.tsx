 "use client";
 
 import { useEffect, useState } from "react";
 import Link from "next/link";
 import { TributeCard } from "@/components/tribute-card";
 import { Separator } from "@/components/ui/separator";
 import { Button } from "@/components/ui/button";
 
 interface Tribute {
   id: string;
   name: string;
   relationship: string | null;
   message: string;
   photoUrl: string | null;
   createdAt: string;
 }
 
 export function TributePreview() {
   const [tributes, setTributes] = useState<Tribute[]>([]);
   const [total, setTotal] = useState(0);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     fetch("/api/tributes?page=1&limit=3")
       .then((r) => r.json())
       .then((data) => {
         setTributes(data.tributes);
         setTotal(data.total);
       })
       .catch(() => {})
       .finally(() => setLoading(false));
   }, []);
 
   return (
     <section className="mx-auto max-w-3xl px-6 py-16">
       <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-center md:text-4xl">
         Tributes &amp; Memories
       </h2>
       <Separator className="mx-auto mt-4 w-16 bg-gold" />
 
       {loading ? (
         <p className="mt-10 text-center text-muted-foreground">
           Loading tributes...
         </p>
       ) : tributes.length === 0 ? (
         <div className="mt-10 text-center">
           <p className="text-muted-foreground">
             No tributes yet. Be the first to share a memory.
           </p>
           <Button asChild className="mt-6 bg-gold text-white hover:bg-gold-light">
             <Link href="/tributes">Share a Tribute</Link>
           </Button>
         </div>
       ) : (
         <>
           <div className="mt-10 space-y-6">
             {tributes.map((t) => (
               <TributeCard key={t.id} {...t} />
             ))}
           </div>
 
           <div className="mt-10 flex flex-col items-center gap-3">
             {total > 3 && (
               <p className="text-sm text-muted-foreground">
                 Showing 3 of {total} tributes
               </p>
             )}
             <div className="flex gap-4">
               <Button
                 asChild
                 variant="outline"
               >
                 <Link href="/tributes">View All Tributes</Link>
               </Button>
               <Button asChild className="bg-gold text-white hover:bg-gold-light">
                 <Link href="/tributes#share">Share a Tribute</Link>
               </Button>
             </div>
           </div>
         </>
       )}
     </section>
   );
 }
