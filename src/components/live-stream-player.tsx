"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeOff } from "lucide-react";

interface LiveStreamData {
  live: boolean;
  url?: string;
  title?: string;
}

export function LiveStreamPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<{ destroy: () => void; muted: boolean } | null>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);
  const initializedUrlRef = useRef<string | null>(null);
  const [stream, setStream] = useState<LiveStreamData | null>(null);
  const [muted, setMuted] = useState(true);

  const pollStream = useCallback(async () => {
    try {
      const res = await fetch("/api/livestream");
      const data: LiveStreamData = await res.json();
      setStream((prev) => {
        if (prev?.live === data.live && prev?.url === data.url && prev?.title === data.title) {
          return prev;
        }
        return data;
      });
    } catch {
      /* keep previous state on network blip */
    }
  }, []);

  useEffect(() => {
    pollStream();
    const interval = setInterval(pollStream, 30_000);
    return () => clearInterval(interval);
  }, [pollStream]);

  useEffect(() => {
    if (!stream?.live || !stream.url || !videoRef.current) {
      // Stream went offline — tear down
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      initializedUrlRef.current = null;
      return;
    }

    // Already initialized for this URL — skip
    if (initializedUrlRef.current === stream.url) return;

    const video = videoRef.current;

    // Clean up previous instance if URL changed
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    let disposed = false;

    async function initPlayer() {
      const [{ default: Hls }, { default: Plyr }] = await Promise.all([
        import("hls.js"),
        import("plyr"),
      ]);

      if (disposed) return;

      // Inject Plyr styles once
      if (!document.getElementById("plyr-css")) {
        const link = document.createElement("link");
        link.id = "plyr-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.plyr.io/3.7.8/plyr.css";
        document.head.appendChild(link);
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 6,
          liveDurationInfinity: true,
          manifestLoadingMaxRetry: 6,
          manifestLoadingRetryDelay: 1000,
          levelLoadingMaxRetry: 6,
          levelLoadingRetryDelay: 1000,
          fragLoadingMaxRetry: 6,
          fragLoadingRetryDelay: 1000,
        });

        hls.loadSource(stream!.url!);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (disposed) return;
          const player = new Plyr(video, {
            controls: ["play", "mute", "volume", "fullscreen"],
            muted: true,
          });
          playerRef.current = player;
          video.muted = true;
          video.play().catch(() => {});
        });

        // Recover from fatal errors by reloading the source
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return;
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad();
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError();
          } else {
            // Unrecoverable — full reinit on next poll
            initializedUrlRef.current = null;
          }
        });

        hlsRef.current = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS
        video.src = stream!.url!;
        const player = new Plyr(video, {
          controls: ["play", "mute", "volume", "fullscreen"],
          muted: true,
        });
        playerRef.current = player;
        video.muted = true;
        video.play().catch(() => {});
      }

      initializedUrlRef.current = stream!.url!;
    }

    initPlayer();

    return () => {
      disposed = true;
    };
  }, [stream]);

  function handleUnmute() {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      if (playerRef.current) playerRef.current.muted = false;
    }
    setMuted(false);
  }

  function handleMute() {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      if (playerRef.current) playerRef.current.muted = true;
    }
    setMuted(true);
  }

  if (!stream?.live) return null;

  return (
    <section ref={containerRef} className="bg-[#0C0A08] py-10 sm:py-14">
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

        <div className="relative overflow-hidden rounded-lg shadow-2xl shadow-black/50">
          <video ref={videoRef} playsInline autoPlay muted />

          {muted && (
            <button
              onClick={handleUnmute}
              className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm text-white/90 backdrop-blur-sm transition-colors hover:bg-black/90"
            >
              <VolumeOff className="h-4 w-4" />
              <span>Tap to unmute</span>
            </button>
          )}

          {!muted && (
            <button
              onClick={handleMute}
              className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-sm transition-opacity hover:bg-black/70 hover:text-white/90"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
