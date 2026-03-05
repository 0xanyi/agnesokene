 "use client";
 
 import { useEffect, useState } from "react";
 import Link from "next/link";
 import { TributeCard } from "@/components/tribute-card";
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
     <section className="bg-secondary/50 py-24 md:py-32">
       <div className="mx-auto max-w-3xl px-6">
         <div className="text-center">
           <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
             Words of Love
           </p>
           <h2 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-light md:text-5xl">
             Tributes &amp; Memories
           </h2>
           <div className="mx-auto mt-6 h-px w-16 bg-border" />
         </div>
 
         {loading ? (
           <p className="mt-16 text-center text-muted-foreground">
             Loading tributes...
           </p>
         ) : tributes.length === 0 ? (
           <div className="mt-16 text-center">
             <p className="font-[family-name:var(--font-serif)] text-xl text-warm-gray">
               No tributes yet. Be the first to share a memory.
             </p>
             <Button asChild className="mt-8 bg-gold text-white hover:bg-gold-light">
               <Link href="/tributes#share">Share a Tribute</Link>
             </Button>
           </div>
         ) : (
           <>
             <div className="mt-16 space-y-8">
               {tributes.map((t) => (
                 <TributeCard key={t.id} {...t} />
               ))}
             </div>
 
             <div className="mt-14 flex flex-col items-center gap-4">
               {total > 3 && (
                 <p className="text-xs tracking-wide text-warm-gray-light">
                   Showing 3 of {total} tributes
                 </p>
               )}
               <div className="flex gap-4">
                 <Button
                   asChild
                   variant="outline"
                   className="border-border/60 text-warm-gray hover:border-gold hover:text-gold"
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
       </div>
     </section>
   );
 }
