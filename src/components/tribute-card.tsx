"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface TributeCardProps {
  name: string;
  relationship?: string | null;
  message: string;
  photoUrl?: string | null;
  createdAt: string;
}

const TRUNCATE_LENGTH = 300;

export function TributeCard({
  name,
  relationship,
  message,
  photoUrl,
  createdAt,
}: TributeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    setNeedsTruncation(message.length > TRUNCATE_LENGTH);
  }, [message]);

  const displayMessage =
    needsTruncation && !expanded
      ? message.slice(0, TRUNCATE_LENGTH).replace(/\s+\S*$/, "") + "…"
      : message;

  // Split message into paragraphs on newlines
  const paragraphs = displayMessage.split(/\n+/).filter(Boolean);

  return (
    <article className="group rounded-xl border border-border/50 bg-white/70 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div>
          <h3 className="font-[family-name:var(--font-serif)] text-xl font-medium text-foreground">
            {name}
          </h3>
          {relationship && (
            <span className="text-[11px] uppercase tracking-[0.15em] text-gold">
              {relationship}
            </span>
          )}
        </div>
        <time className="text-[11px] tracking-wide text-warm-gray-light sm:shrink-0">
          {date}
        </time>
      </div>

      <div className="mt-4 h-px w-10 bg-gold/30" />

      <div
        ref={contentRef}
        className="mt-4 space-y-3 font-[family-name:var(--font-serif)] text-base leading-[1.85] text-warm-gray sm:text-lg"
      >
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 cursor-pointer text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-dark"
        >
          {expanded ? "Read less" : "Read full tribute"}
        </button>
      )}

      {photoUrl && (
        <div className="relative mt-5 aspect-video overflow-hidden rounded-lg">
          <Image
            src={photoUrl}
            alt={`Photo shared by ${name}`}
            fill
            className="object-cover"
          />
        </div>
      )}
    </article>
  );
}
