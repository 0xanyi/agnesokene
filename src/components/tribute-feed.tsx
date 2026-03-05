 "use client";
 
 import { useEffect, useState, useCallback } from "react";
 import { TributeCard } from "@/components/tribute-card";
 import { Button } from "@/components/ui/button";
 
 const PER_PAGE = 6;
 
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
   const [totalPages, setTotalPages] = useState(1);
   const [total, setTotal] = useState(0);
   const [loading, setLoading] = useState(true);
 
   const fetchPage = useCallback(async (p: number) => {
     setLoading(true);
     try {
       const res = await fetch(`/api/tributes?page=${p}&limit=${PER_PAGE}`);
       const data = await res.json();
       setTributes(data.tributes);
       setTotalPages(data.totalPages);
       setTotal(data.total);
       setPage(p);
     } catch {
       // silently fail
     } finally {
       setLoading(false);
     }
   }, []);
 
   useEffect(() => {
     fetchPage(1);
   }, [fetchPage]);
 
   function goToPage(p: number) {
     fetchPage(p);
     document.getElementById("tributes-top")?.scrollIntoView({ behavior: "smooth" });
   }
 
   function buildPageNumbers(): (number | "ellipsis")[] {
     if (totalPages <= 7) {
       return Array.from({ length: totalPages }, (_, i) => i + 1);
     }
 
     const pages: (number | "ellipsis")[] = [1];
 
     if (page > 3) pages.push("ellipsis");
 
     const start = Math.max(2, page - 1);
     const end = Math.min(totalPages - 1, page + 1);
 
     for (let i = start; i <= end; i++) {
       pages.push(i);
     }
 
     if (page < totalPages - 2) pages.push("ellipsis");
 
     pages.push(totalPages);
     return pages;
   }
 
   return (
     <section id="tributes-top">
       {loading ? (
         <p className="py-10 text-center text-muted-foreground">
           Loading tributes...
         </p>
       ) : tributes.length === 0 ? (
         <p className="py-10 text-center text-muted-foreground">
           No tributes yet. Be the first to share a memory below.
         </p>
       ) : (
         <>
           <div className="space-y-6">
             {tributes.map((t) => (
               <TributeCard key={t.id} {...t} />
             ))}
           </div>
 
           {totalPages > 1 && (
             <nav
               className="mt-10 flex flex-col items-center gap-4"
               aria-label="Tribute pagination"
             >
               <div className="flex items-center gap-1">
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => goToPage(page - 1)}
                   disabled={page === 1}
                   aria-label="Previous page"
                 >
                   &larr; Prev
                 </Button>
 
                 {buildPageNumbers().map((p, idx) =>
                   p === "ellipsis" ? (
                     <span
                       key={`ellipsis-${idx}`}
                       className="px-2 text-muted-foreground"
                     >
                       &hellip;
                     </span>
                   ) : (
                     <Button
                       key={p}
                       variant={p === page ? "default" : "outline"}
                       size="sm"
                       onClick={() => goToPage(p)}
                       className={
                         p === page
                           ? "bg-gold text-white hover:bg-gold-light"
                           : ""
                       }
                       aria-label={`Page ${p}`}
                       aria-current={p === page ? "page" : undefined}
                     >
                       {p}
                     </Button>
                   )
                 )}
 
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => goToPage(page + 1)}
                   disabled={page === totalPages}
                   aria-label="Next page"
                 >
                   Next &rarr;
                 </Button>
               </div>
 
               <p className="text-xs text-muted-foreground">
                 Page {page} of {totalPages} &middot; {total} tribute{total !== 1 ? "s" : ""}
               </p>
             </nav>
           )}
         </>
       )}
     </section>
   );
 }
