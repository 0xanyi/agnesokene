"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, Plus, X, Loader2 } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: string | null;
  order: number;
}

export function GalleryManager({ secret }: { secret: string }) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const headers = { Authorization: `Bearer ${secret}` };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secret]);

  async function fetchImages() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      if (res.ok) {
        const data = await res.json();
        setImages(data.images);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSelectedFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, url]);
    });

    setShowForm(true);
  }

  function removeFile(index: number) {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function resetForm() {
    previews.forEach(URL.revokeObjectURL);
    setSelectedFiles([]);
    setPreviews([]);
    setCaption("");
    setCategory("");
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) return;

    setUploading(true);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setUploadProgress(`Uploading ${i + 1} of ${selectedFiles.length}...`);

        const isVideo = file.type.startsWith("video/");
        const resourceType = isVideo ? "video" : "image";

        const signRes = await fetch("/api/admin/gallery/sign", {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ resourceType }),
        });

        if (!signRes.ok) {
          alert(`Failed to get upload signature for ${file.name}`);
          continue;
        }

        const { signature, timestamp, apiKey, folder, uploadUrl } = await signRes.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("signature", signature);
        formData.append("folder", folder);

        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          alert(`Failed to upload ${file.name}: ${err.error?.message || "Upload failed"}`);
          continue;
        }

        const { secure_url: url } = await uploadRes.json();

        const fileCaption =
          selectedFiles.length === 1 ? caption : caption || null;

        await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            caption: fileCaption,
            category: category || null,
            order: images.length + i,
          }),
        });
      }

      resetForm();
      await fetchImages();
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image from the gallery?")) return;

    await fetch(`/api/admin/gallery/${id}`, {
      method: "DELETE",
      headers,
    });

    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  async function handleUpdateCaption(id: string, newCaption: string) {
    await fetch(`/api/admin/gallery/${id}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ caption: newCaption }),
    });

    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, caption: newCaption } : img
      )
    );
  }

  const categories = [
    ...new Set(images.map((img) => img.category).filter(Boolean)),
  ] as string[];

  if (loading) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        Loading gallery...
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upload section */}
      <Card className="border-dashed border-2 border-border/50">
        <CardContent className="p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
          />

          {!showForm ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center gap-3 py-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Upload className="h-10 w-10" />
              <span className="text-sm font-medium">
                Click to select images or videos
              </span>
              <span className="text-xs">
                Supports JPG, PNG, GIF, MP4, MOV
              </span>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {selectedFiles.length} file{selectedFiles.length !== 1 && "s"}{" "}
                  selected
                </h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add more
                  </Button>
                  <Button size="sm" variant="ghost" onClick={resetForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Previews */}
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {previews.map((src, idx) => (
                  <div key={idx} className="group relative aspect-square">
                    {selectedFiles[idx]?.type.startsWith("video/") ? (
                      <video
                        src={src}
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full rounded-md object-cover"
                      />
                    )}
                    <button
                      onClick={() => removeFile(idx)}
                      className="absolute -right-1 -top-1 rounded-full bg-destructive p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Metadata */}
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Caption (optional)"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <Input
                  placeholder="Category (e.g. Family, Career)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  list="category-suggestions"
                />
                <datalist id="category-suggestions">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {uploadProgress}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload {selectedFiles.length} file
                    {selectedFiles.length !== 1 && "s"}
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing images */}
      <div>
        <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-semibold">
          Gallery Images ({images.length})
        </h2>

        {images.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No images in the gallery yet. Upload some above!
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <Card
                key={img.id}
                className="group overflow-hidden border-border/50"
              >
                <div className="relative aspect-square">
                  {img.url.includes("/video/") ? (
                    <video
                      src={img.url}
                      className="h-full w-full object-cover"
                      muted
                    />
                  ) : (
                    <Image
                      src={img.url}
                      alt={img.caption || "Gallery image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  )}
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  {img.category && (
                    <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                      {img.category}
                    </span>
                  )}
                </div>
                <CardContent className="p-2">
                  <input
                    type="text"
                    defaultValue={img.caption || ""}
                    placeholder="Add caption..."
                    className="w-full bg-transparent text-xs text-muted-foreground outline-none focus:text-foreground"
                    onBlur={(e) => {
                      if (e.target.value !== (img.caption || "")) {
                        handleUpdateCaption(img.id, e.target.value);
                      }
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
