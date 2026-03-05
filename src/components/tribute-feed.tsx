 "use client";
 
 import { useEffect, useState, useCallback } from "react";
 import { TributeCard } from "@/components/tribute-card";
 import { TributeForm } from "@/components/tribute-form";
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
 
 export function TributeFeed() {
   const [tributes, setTributes] = useState<Tribute[]>([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [loading, setLoading] = useState(true);
 
   const fetchTributes = useCallback(async (p: number, replace = false) => {
     setLoading(true);
     try {
       const res = await fetch(`/api/tributes?page=${p}&limit=6`);
       const data = await res.json();
       setTributes((prev) => (replace ? data.tributes : [...prev, ...data.tributes]));
       setHasMore(data.hasMore);
     } catch {
       // silently fail
     } finally {
       setLoading(false);
     }
   }, []);
 
   useEffect(() => {
     fetchTributes(1, true);
   }, [fetchTributes]);
 
   function handleLoadMore() {
     const next = page + 1;
     setPage(next);
     fetchTributes(next);
   }
 
   return (
     <>
       <section className="mx-auto max-w-3xl px-6 py-16">
         <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-center md:text-4xl">
           Tributes &amp; Memories
         </h2>
         <Separator className="mx-auto mt-4 w-16 bg-gold" />
 
         {loading && tributes.length === 0 ? (
           <p className="mt-10 text-center text-muted-foreground">
             Loading tributes...
           </p>
         ) : tributes.length === 0 ? (
           <p className="mt-10 text-center text-muted-foreground">
             No tributes yet. Be the first to share a memory.
           </p>
         ) : (
           <div className="mt-10 space-y-6">
             {tributes.map((t) => (
               <TributeCard key={t.id} {...t} />
             ))}
           </div>
         )}
 
         {hasMore && tributes.length > 0 && (
           <div className="mt-8 text-center">
             <Button
               variant="outline"
               onClick={handleLoadMore}
               disabled={loading}
             >
               {loading ? "Loading..." : "Load More"}
             </Button>
           </div>
         )}
       </section>
 
       <TributeForm onSuccess={() => fetchTributes(1, true)} />
     </>
   );
 }
