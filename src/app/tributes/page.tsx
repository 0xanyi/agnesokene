"use client";

import { useCallback, useState } from "react";
import { TributeFeed } from "@/components/tribute-feed";
import { TributeForm } from "@/components/tribute-form";

export default function TributesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <>
      <div id="share" className="scroll-mt-24 border-b border-border/40 bg-secondary/30">
        <TributeForm onSuccess={handleSuccess} />
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-20 pb-8">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
            Words of Love
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-serif)] text-5xl font-light md:text-6xl">
            Tributes &amp; Memories
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-border" />
          <p className="mt-6 text-warm-gray">
            Heartfelt words from those who knew and loved Mama Agnes.
          </p>
        </div>

        <div className="mt-16">
          <TributeFeed key={refreshKey} />
        </div>
      </div>
    </>
  );
}
