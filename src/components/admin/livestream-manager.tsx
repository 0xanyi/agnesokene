"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface LivestreamManagerProps {
  secret: string;
}

export function LivestreamManager({ secret }: LivestreamManagerProps) {
  const [livestreamOn, setLivestreamOn] = useState(false);
  const [livestreamUrl, setLivestreamUrl] = useState("");
  const [livestreamTitle, setLivestreamTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/livestream", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLivestreamOn(data.livestreamOn);
        setLivestreamUrl(data.livestreamUrl || "");
        setLivestreamTitle(data.livestreamTitle || "");
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [secret]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/livestream", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ livestreamOn, livestreamUrl, livestreamTitle }),
      });
      if (res.ok) {
        const data = await res.json();
        setLivestreamOn(data.livestreamOn);
        setLivestreamUrl(data.livestreamUrl || "");
        setLivestreamTitle(data.livestreamTitle || "");
      } else {
        alert("Failed to save livestream settings.");
      }
    } catch {
      alert("Failed to save livestream settings.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle() {
    const newState = !livestreamOn;
    setLivestreamOn(newState);
    setSaving(true);
    try {
      await fetch("/api/admin/livestream", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          livestreamOn: newState,
          livestreamUrl,
          livestreamTitle,
        }),
      });
    } catch {
      setLivestreamOn(!newState);
      alert("Failed to toggle livestream.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="text-center text-muted-foreground">Loading settings...</p>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6">
          {/* Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Livestream Status</p>
              <p className="text-sm text-muted-foreground">
                Toggle the live video player on the homepage
              </p>
            </div>
            <button
              onClick={handleToggle}
              disabled={saving}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                livestreamOn ? "bg-green-600" : "bg-secondary"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  livestreamOn ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              {livestreamOn ? (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
                </>
              ) : (
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              )}
            </span>
            <span
              className={`text-sm font-medium ${
                livestreamOn ? "text-green-700" : "text-muted-foreground"
              }`}
            >
              {livestreamOn ? "Live — Player visible on homepage" : "Off — Player hidden"}
            </span>
          </div>

          {/* URL */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              HLS Stream URL
            </label>
            <Input
              value={livestreamUrl}
              onChange={(e) => setLivestreamUrl(e.target.value)}
              placeholder="https://example.com/live/stream.m3u8"
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              The .m3u8 URL for your HLS live stream
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Stream Title (optional)
            </label>
            <Input
              value={livestreamTitle}
              onChange={(e) => setLivestreamTitle(e.target.value)}
              placeholder="e.g. Funeral Service — Live"
              className="mt-1"
            />
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
