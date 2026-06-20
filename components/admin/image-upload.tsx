"use client";

import * as React from "react";
import { UploadCloud, Loader2, X, AlertCircle } from "lucide-react";
import { Field } from "@/components/admin/fields";
import { cn } from "@/lib/utils";

// Must match the sessionStorage key used by the admin page.
const PW_KEY = "admin-pw";

export function ImageUpload({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": sessionStorage.getItem(PW_KEY) ?? "" },
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Upload failed.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Network error during upload.");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2">
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative flex min-h-[8rem] cursor-pointer items-center gap-4 overflow-hidden rounded-xl border border-dashed p-3 transition-colors",
            dragging
              ? "border-primary bg-primary/10"
              : "border-border bg-background/60 hover:border-primary/60"
          )}
        >
          {value ? (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-card">
              {/* Plain img: tolerant of partial/invalid URLs while typing. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted">
              <UploadCloud className="h-7 w-7" />
            </div>
          )}

          <div className="min-w-0 flex-1 text-sm">
            {uploading ? (
              <span className="inline-flex items-center gap-2 text-primary">
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
              </span>
            ) : (
              <>
                <p className="font-medium text-foreground/90">
                  Drag &amp; drop an image
                </p>
                <p className="text-xs text-muted">
                  or click to browse · JPG, PNG, WEBP, GIF, SVG · max 8 MB
                </p>
                {value && (
                  <p className="mt-1 truncate text-xs text-muted">{value}</p>
                )}
              </>
            )}
          </div>

          {value && !uploading && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              aria-label="Remove image"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-muted transition-colors hover:bg-accent hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
              e.target.value = "";
            }}
          />
        </div>

        {error && (
          <p className="flex items-center gap-1.5 text-xs text-accent">
            <AlertCircle className="h-3.5 w-3.5" /> {error}
          </p>
        )}

        {/* Manual URL fallback */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL"
          className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-xs text-foreground outline-none placeholder:text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
    </Field>
  );
}
