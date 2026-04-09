"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { LivestreamManager } from "@/components/admin/livestream-manager";

interface Tribute {
  id: string;
  name: string;
  email: string | null;
  relationship: string | null;
  message: string;
  approved: boolean;
  createdAt: string;
}

type Tab = "tributes" | "gallery" | "livestream";
type TributeFilter = "all" | "pending" | "approved";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("tributes");
  const [filter, setFilter] = useState<TributeFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", relationship: "", message: "" });
  const [saving, setSaving] = useState(false);

  const fetchTributes = useCallback(
    async (f?: TributeFilter) => {
      setLoading(true);
      const currentFilter = f ?? filter;
      try {
        const res = await fetch(`/api/admin/tributes?filter=${currentFilter}`, {
          headers: { Authorization: `Bearer ${secret}` },
        });
        if (res.ok) {
          const data = await res.json();
          setTributes(data.tributes);
          setAuthenticated(true);
        } else {
          if (!authenticated) alert("Invalid secret.");
        }
      } catch {
        alert("Failed to fetch tributes.");
      } finally {
        setLoading(false);
      }
    },
    [secret, filter, authenticated]
  );

  function handleFilterChange(f: TributeFilter) {
    setFilter(f);
    setEditingId(null);
    fetchTributes(f);
  }

  async function handleApprove(id: string, approved: boolean) {
    await fetch(`/api/admin/tributes/${id}/approve`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approved }),
    });
    fetchTributes();
  }

  async function handleDelete(id: string) {
    if (!confirm("Permanently delete this tribute?")) return;
    await fetch(`/api/admin/tributes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${secret}` },
    });
    setTributes((prev) => prev.filter((t) => t.id !== id));
  }

  function startEdit(t: Tribute) {
    setEditingId(t.id);
    setEditForm({
      name: t.name,
      relationship: t.relationship || "",
      message: t.message,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ name: "", relationship: "", message: "" });
  }

  async function saveEdit(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/tributes/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const { tribute } = await res.json();
        setTributes((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...tribute } : t))
        );
        setEditingId(null);
      } else {
        alert("Failed to save changes.");
      }
    } catch {
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }

  const pendingCount = tributes.filter((t) => !t.approved).length;
  const approvedCount = tributes.filter((t) => t.approved).length;

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-center mb-8">
          Admin Login
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchTributes("all");
          }}
          className="space-y-4"
        >
          <Input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter admin secret"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Checking..." : "Login"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-center mb-8">
        Admin Dashboard
      </h1>

      <div className="flex justify-center gap-2 mb-10">
        <Button
          variant={activeTab === "tributes" ? "default" : "outline"}
          onClick={() => {
            setActiveTab("tributes");
            fetchTributes();
          }}
        >
          Tributes ({tributes.length})
        </Button>
        <Button
          variant={activeTab === "gallery" ? "default" : "outline"}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </Button>
        <Button
          variant={activeTab === "livestream" ? "default" : "outline"}
          onClick={() => setActiveTab("livestream")}
        >
          Livestream
        </Button>
      </div>

      {activeTab === "tributes" && (
        <>
          {/* Filter tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {(["all", "pending", "approved"] as TributeFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                  filter === f
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {f === "all"
                  ? `All (${tributes.length})`
                  : f === "pending"
                    ? `Pending (${pendingCount})`
                    : `Approved (${approvedCount})`}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : tributes.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No tributes found.
            </p>
          ) : (
            <div className="space-y-6">
              {tributes.map((t) => (
                <Card key={t.id} className="border-border/50">
                  <CardContent className="p-6">
                    {editingId === t.id ? (
                      /* Edit mode */
                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">
                              Name
                            </label>
                            <Input
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm({ ...editForm, name: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">
                              Relationship
                            </label>
                            <Input
                              value={editForm.relationship}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  relationship: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">
                            Message
                          </label>
                          <Textarea
                            value={editForm.message}
                            onChange={(e) =>
                              setEditForm({ ...editForm, message: e.target.value })
                            }
                            rows={10}
                          />
                          <p className="mt-1 text-xs text-muted-foreground text-right">
                            {editForm.message.length} characters
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => saveEdit(t.id)}
                            disabled={saving}
                          >
                            {saving ? "Saving..." : "Save Changes"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* View mode */
                      <>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{t.name}</p>
                              <Badge
                                variant={t.approved ? "default" : "secondary"}
                                className={`text-[10px] ${
                                  t.approved
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {t.approved ? "Approved" : "Pending"}
                              </Badge>
                            </div>
                            {t.relationship && (
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {t.relationship}
                              </p>
                            )}
                            {t.email && (
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {t.email}
                              </p>
                            )}
                          </div>
                          <time className="text-xs text-muted-foreground">
                            {new Date(t.createdAt).toLocaleDateString()}
                          </time>
                        </div>
                        <p className="mt-4 whitespace-pre-line text-sm text-warm-gray leading-relaxed">
                          {t.message.length > 500
                            ? t.message.slice(0, 500) + "…"
                            : t.message}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(t)}
                          >
                            Edit
                          </Button>
                          {!t.approved && (
                            <Button
                              size="sm"
                              className="bg-green-700 text-white hover:bg-green-800"
                              onClick={() => handleApprove(t.id, true)}
                            >
                              Approve
                            </Button>
                          )}
                          {t.approved && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-amber-700 border-amber-300 hover:bg-amber-50"
                              onClick={() => handleApprove(t.id, false)}
                            >
                              Unapprove
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(t.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "gallery" && <GalleryManager secret={secret} />}

      {activeTab === "livestream" && <LivestreamManager secret={secret} />}
    </div>
  );
}
