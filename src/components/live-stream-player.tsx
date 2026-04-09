"use client";

import { useEffect, useRef, useState } from "react";

interface LiveStreamData {
  live: boolean;
  url?: string;
  title?: string;
}

export function LiveStreamPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<unknown>(null);
  const hlsRef = useRef<unknown>(null);
  const [stream, setStream] = useState<LiveStreamData | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkStream() {
      try {
        const res = await fetch("/api/livestream");
        if (!cancelled) {
          const data: LiveStreamData = await res.json();
          setStream(data);
        }
      } catch {
        if (!cancelled) setStream({ live: false });
      }
    }

    checkStream();
    const interval = setInterval(checkStream, 30_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!stream?.live || !stream.url || !videoRef.current) return;

    const video = videoRef.current;
    let hls: import("hls.js").default | null = null;
    let player: import("plyr").default | null = null;

    async function initPlayer() {
      const [{ default: Hls }, { default: Plyr }] = await Promise.all([
        import("hls.js"),
        import("plyr"),
      ]);

      // Inject Plyr styles
      if (!document.getElementById("plyr-css")) {
        const link = document.createElement("link");
        link.id = "plyr-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.plyr.io/3.7.8/plyr.css";
        document.head.appendChild(link);
      }

      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(stream!.url!);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          player = new Plyr(video, {
            controls: ["play", "mute", "volume", "fullscreen"],
            autoplay: true,
            muted: true,
          });
          playerRef.current = player;
        });
        hlsRef.current = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = stream!.url!;
        player = new Plyr(video, {
          controls: ["play", "mute", "volume", "fullscreen"],
          autoplay: true,
          muted: true,
        });
        playerRef.current = player;
      }
    }

    initPlayer();

    return () => {
      if (hls && typeof (hls as { destroy: () => void }).destroy === "function") {
        (hls as { destroy: () => void }).destroy();
      }
      if (player && typeof (player as { destroy: () => void }).destroy === "function") {
        (player as { destroy: () => void }).destroy();
      }
      hlsRef.current = null;
      playerRef.current = null;
    };
  }, [stream]);

  if (!stream?.live) return null;

  return (
    <section className="bg-[#0C0A08] py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
          </span>
          <p className="text-[10px] uppercase tracking-[0.32em] text-gold-light sm:text-[11px] sm:tracking-[0.4em]">
            Live Now
          </p>
        </div>

        {stream.title && (
          <h2 className="mb-6 text-center font-[family-name:var(--font-serif)] text-2xl font-light text-white/90 sm:text-3xl">
            {stream.title}
          </h2>
        )}

        <div className="overflow-hidden rounded-lg shadow-2xl shadow-black/50">
          <video ref={videoRef} playsInline />
        </div>
      </div>
    </section>
  );
}
