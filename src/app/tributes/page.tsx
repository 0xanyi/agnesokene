 "use client";
 
 import { useCallback, useState } from "react";
 import { TributeFeed } from "@/components/tribute-feed";
 import { TributeForm } from "@/components/tribute-form";
 import { Separator } from "@/components/ui/separator";
 
 export default function TributesPage() {
   const [refreshKey, setRefreshKey] = useState(0);
 
   const handleSuccess = useCallback(() => {
     setRefreshKey((k) => k + 1);
   }, []);
 
   return (
     <div className="mx-auto max-w-3xl px-6 py-16">
       <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-center md:text-5xl">
         Tributes &amp; Memories
       </h1>
       <Separator className="mx-auto mt-4 w-16 bg-gold" />
       <p className="mt-4 text-center text-muted-foreground">
         Heartfelt words from those who knew and loved Mama Agnes.
       </p>
 
       <div className="mt-12">
         <TributeFeed key={refreshKey} />
       </div>
 
       <div id="share" className="scroll-mt-24">
         <TributeForm onSuccess={handleSuccess} />
       </div>
     </div>
   );
 }
