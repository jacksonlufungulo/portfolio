"use client";

import * as React from "react";
import Link from "next/link";
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ExternalLink,
  Lock,
  RotateCcw,
} from "lucide-react";
import { defaultContent, type SiteContent } from "@/lib/data";
import { serviceIconNames, socialIconNames } from "@/lib/icons";
import {
  TextField,
  TextArea,
  NumberField,
  SelectField,
  ToggleField,
  StringListField,
  ArrayEditor,
} from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import { cn } from "@/lib/utils";

const PW_KEY = "admin-pw";

const SECTIONS = [
  "General",
  "Navigation",
  "Social Links",
  "Hero",
  "About",
  "Services",
  "Skills",
  "Portfolio",
  "Experience",
  "Testimonials",
  "Blog",
] as const;
type Section = (typeof SECTIONS)[number];

export default function AdminPage() {
  const [authed, setAuthed] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [content, setContent] = React.useState<SiteContent | null>(null);
  const [tab, setTab] = React.useState<Section>("General");
  const [save, setSave] = React.useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [message, setMessage] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [loggingIn, setLoggingIn] = React.useState(false);

  const loadContent = React.useCallback(async () => {
    const res = await fetch("/api/content", { cache: "no-store" });
    const data = (await res.json()) as SiteContent;
    setContent(data);
  }, []);

  // Restore a previous session.
  React.useEffect(() => {
    const stored = sessionStorage.getItem(PW_KEY);
    if (stored) {
      setPassword(stored);
      setAuthed(true);
      loadContent();
    }
  }, [loadContent]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError("Incorrect password. Try again.");
        return;
      }
      sessionStorage.setItem(PW_KEY, password);
      setAuthed(true);
      await loadContent();
    } catch {
      setLoginError("Something went wrong. Is the server running?");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(PW_KEY);
    setAuthed(false);
    setPassword("");
    setContent(null);
  };

  const handleSave = async () => {
    if (!content) return;
    setSave("saving");
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(content),
      });
      if (res.status === 401) {
        setSave("error");
        setMessage("Session expired — please log in again.");
        logout();
        return;
      }
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        setSave("error");
        setMessage(err.error ?? "Failed to save.");
        return;
      }
      setSave("saved");
      setMessage("Saved! Refresh the homepage to see your changes.");
      setTimeout(() => setSave("idle"), 4000);
    } catch {
      setSave("error");
      setMessage("Network error while saving.");
    }
  };

  const resetDefaults = () => {
    if (confirm("Reset all content back to the original defaults?")) {
      setContent(structuredClone(defaultContent));
    }
  };

  // Helper to update a top-level slice of content.
  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setContent((prev) => (prev ? { ...prev, [key]: value } : prev));

  /* ----------------------------- Login screen ---------------------------- */
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="font-display text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-muted">
              Enter your password to edit the portfolio content.
            </p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {loginError && (
              <p className="flex items-center gap-2 text-sm text-accent">
                <AlertCircle className="h-4 w-4" /> {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loggingIn}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold text-primary-foreground transition-opacity disabled:opacity-60"
            >
              {loggingIn ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              Log in
            </button>
            <Link
              href="/"
              className="text-center text-xs text-muted transition-colors hover:text-primary"
            >
              ← Back to site
            </Link>
          </form>
        </div>
      </main>
    );
  }

  /* ----------------------------- Loading --------------------------------- */
  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  /* ----------------------------- Editor ---------------------------------- */
  return (
    <main className="min-h-screen bg-background">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              {content.siteConfig.shortName.charAt(0)}
            </span>
            <div>
              <h1 className="font-display text-sm font-bold leading-none">
                Content Manager
              </h1>
              <p className="text-xs text-muted">{content.siteConfig.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetDefaults}
              className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground sm:inline-flex"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
            <button
              onClick={handleSave}
              disabled={save === "saving"}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-all disabled:opacity-60",
                save === "saved"
                  ? "bg-green-500"
                  : save === "error"
                    ? "bg-accent"
                    : "bg-gradient-to-r from-primary to-secondary"
              )}
            >
              {save === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
              {save === "saved" && <CheckCircle2 className="h-4 w-4" />}
              {save === "error" && <AlertCircle className="h-4 w-4" />}
              {save === "idle" && <Save className="h-4 w-4" />}
              {save === "saving"
                ? "Saving..."
                : save === "saved"
                  ? "Saved"
                  : save === "error"
                    ? "Retry"
                    : "Save"}
            </button>
          </div>
        </div>
        {message && (
          <div
            className={cn(
              "px-4 py-2 text-center text-xs",
              save === "error"
                ? "bg-accent/15 text-accent"
                : "bg-primary/10 text-primary"
            )}
          >
            {message}
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row">
        {/* sidebar */}
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:w-52 lg:flex-col lg:overflow-visible lg:pb-0">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setTab(s)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                tab === s
                  ? "bg-primary/15 text-primary"
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </nav>

        {/* editor panel */}
        <section className="min-w-0 flex-1 rounded-2xl border border-border bg-card/40 p-5 md:p-6">
          {tab === "General" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Full name" value={content.siteConfig.name} onChange={(v) => set("siteConfig", { ...content.siteConfig, name: v })} />
              <TextField label="Short name (logo)" value={content.siteConfig.shortName} onChange={(v) => set("siteConfig", { ...content.siteConfig, shortName: v })} />
              <div className="sm:col-span-2">
                <TextField label="Role / tagline" value={content.siteConfig.role} onChange={(v) => set("siteConfig", { ...content.siteConfig, role: v })} />
              </div>
              <div className="sm:col-span-2">
                <TextArea label="Description" value={content.siteConfig.description} onChange={(v) => set("siteConfig", { ...content.siteConfig, description: v })} />
              </div>
              <TextField label="Email" value={content.siteConfig.email} onChange={(v) => set("siteConfig", { ...content.siteConfig, email: v })} />
              <TextField label="Phone" value={content.siteConfig.phone} onChange={(v) => set("siteConfig", { ...content.siteConfig, phone: v })} />
              <TextField label="Location" value={content.siteConfig.location} onChange={(v) => set("siteConfig", { ...content.siteConfig, location: v })} />
              <TextField label="Site URL" value={content.siteConfig.url} onChange={(v) => set("siteConfig", { ...content.siteConfig, url: v })} hint="Used for SEO / canonical links" />
              <ImageUpload label="Hero image" value={content.siteConfig.heroImage} onChange={(v) => set("siteConfig", { ...content.siteConfig, heroImage: v })} hint="Shown in the hero profile card" />
              <ImageUpload label="About image" value={content.siteConfig.aboutImage} onChange={(v) => set("siteConfig", { ...content.siteConfig, aboutImage: v })} hint="Shown in the About section" />
              <div className="sm:col-span-2">
                <ToggleField label="Available for freelance work" value={content.siteConfig.available} onChange={(v) => set("siteConfig", { ...content.siteConfig, available: v })} />
              </div>
            </div>
          )}

          {tab === "Navigation" && (
            <ArrayEditor
              label="Navigation links"
              items={content.navLinks}
              onChange={(v) => set("navLinks", v)}
              makeNew={() => ({ label: "New", href: "#home" })}
              itemLabel={(i, it) => it.label || `Link ${i + 1}`}
              renderItem={(it, on) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField label="Label" value={it.label} onChange={(v) => on({ ...it, label: v })} />
                  <TextField label="Anchor / href" value={it.href} onChange={(v) => on({ ...it, href: v })} hint="e.g. #about" />
                </div>
              )}
            />
          )}

          {tab === "Social Links" && (
            <ArrayEditor
              label="Social links"
              items={content.socials}
              onChange={(v) => set("socials", v)}
              makeNew={() => ({ label: "GitHub", href: "https://", icon: "Github" })}
              itemLabel={(i, it) => it.label || `Social ${i + 1}`}
              renderItem={(it, on) => (
                <div className="grid gap-3 sm:grid-cols-3">
                  <TextField label="Label" value={it.label} onChange={(v) => on({ ...it, label: v })} />
                  <TextField label="URL" value={it.href} onChange={(v) => on({ ...it, href: v })} />
                  <SelectField label="Icon" value={it.icon} options={socialIconNames} onChange={(v) => on({ ...it, icon: v })} />
                </div>
              )}
            />
          )}

          {tab === "Hero" && (
            <StringListField
              label="Rotating titles (typing animation)"
              values={content.heroTitles}
              onChange={(v) => set("heroTitles", v)}
              placeholder="e.g. UI/UX Designer"
            />
          )}

          {tab === "About" && (
            <div className="flex flex-col gap-8">
              <ArrayEditor
                label="Biography paragraphs"
                items={content.bio}
                onChange={(v) => set("bio", v)}
                makeNew={() => ""}
                itemLabel={(i) => `Paragraph ${i + 1}`}
                renderItem={(it, on) => (
                  <TextArea label="Text" value={it} onChange={on} rows={3} />
                )}
              />
              <ArrayEditor
                label="Statistics counters"
                items={content.stats}
                onChange={(v) => set("stats", v)}
                makeNew={() => ({ label: "New stat", value: 0, suffix: "+" })}
                itemLabel={(i, it) => it.label || `Stat ${i + 1}`}
                renderItem={(it, on) => (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <TextField label="Label" value={it.label} onChange={(v) => on({ ...it, label: v })} />
                    <NumberField label="Value" value={it.value} onChange={(v) => on({ ...it, value: v })} />
                    <TextField label="Suffix" value={it.suffix} onChange={(v) => on({ ...it, suffix: v })} hint="e.g. +" />
                  </div>
                )}
              />
            </div>
          )}

          {tab === "Services" && (
            <ArrayEditor
              label="Services"
              items={content.services}
              onChange={(v) => set("services", v)}
              makeNew={() => ({ title: "New Service", icon: "Palette", description: "", features: [], color: "primary" as const })}
              itemLabel={(i, it) => it.title || `Service ${i + 1}`}
              renderItem={(it, on) => (
                <div className="flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <TextField label="Title" value={it.title} onChange={(v) => on({ ...it, title: v })} />
                    <SelectField label="Icon" value={it.icon} options={serviceIconNames} onChange={(v) => on({ ...it, icon: v })} />
                    <SelectField label="Accent color" value={it.color} options={["primary", "secondary", "accent"]} onChange={(v) => on({ ...it, color: v as typeof it.color })} />
                  </div>
                  <TextArea label="Description" value={it.description} onChange={(v) => on({ ...it, description: v })} rows={2} />
                  <StringListField label="Features" values={it.features} onChange={(v) => on({ ...it, features: v })} />
                </div>
              )}
            />
          )}

          {tab === "Skills" && (
            <ArrayEditor
              label="Skill groups"
              items={content.skillGroups}
              onChange={(v) => set("skillGroups", v)}
              makeNew={() => ({ category: "New Group", skills: [] })}
              itemLabel={(i, it) => it.category || `Group ${i + 1}`}
              renderItem={(it, on) => (
                <div className="flex flex-col gap-4">
                  <TextField label="Category name" value={it.category} onChange={(v) => on({ ...it, category: v })} />
                  <ArrayEditor
                    label="Skills"
                    items={it.skills}
                    onChange={(skills) => on({ ...it, skills })}
                    makeNew={() => ({ name: "New skill", level: 80 })}
                    itemLabel={(i, s) => s.name || `Skill ${i + 1}`}
                    renderItem={(s, onSkill) => (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <TextField label="Name" value={s.name} onChange={(v) => onSkill({ ...s, name: v })} />
                        <NumberField label="Level (%)" value={s.level} onChange={(v) => onSkill({ ...s, level: Math.max(0, Math.min(100, v)) })} min={0} max={100} />
                      </div>
                    )}
                  />
                </div>
              )}
            />
          )}

          {tab === "Portfolio" && (
            <div className="flex flex-col gap-8">
              <StringListField
                label="Filter categories"
                values={content.portfolioCategories}
                onChange={(v) => set("portfolioCategories", v)}
                placeholder="e.g. Branding"
              />
              <p className="-mt-4 text-xs text-muted">
                Keep “All” as the first category. Project categories below should match one of these.
              </p>
              <ArrayEditor
                label="Projects"
                items={content.projects}
                onChange={(v) => set("projects", v)}
                makeNew={() => ({ id: `project-${Date.now()}`, title: "New Project", category: content.portfolioCategories[1] ?? "Web Development", status: "In Progress", description: "", longDescription: "", image: "", tech: [], demo: "", repo: "" })}
                itemLabel={(i, it) => it.title || `Project ${i + 1}`}
                renderItem={(it, on) => (
                  <div className="flex flex-col gap-3">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField label="Title" value={it.title} onChange={(v) => on({ ...it, title: v })} />
                      <TextField label="Category" value={it.category} onChange={(v) => on({ ...it, category: v })} hint="Must match a filter category" />
                      <SelectField label="Status" value={it.status ?? "Completed"} options={["Completed", "In Progress", "Maintained", "Archived"]} onChange={(v) => on({ ...it, status: v })} />
                    </div>
                    <TextField label="Short description" value={it.description} onChange={(v) => on({ ...it, description: v })} />
                    <TextArea label="Long description (modal)" value={it.longDescription} onChange={(v) => on({ ...it, longDescription: v })} rows={3} />
                    <ImageUpload label="Project image" value={it.image} onChange={(v) => on({ ...it, image: v })} />
                    <StringListField label="Technologies" values={it.tech} onChange={(v) => on({ ...it, tech: v })} />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Live demo URL" value={it.demo} onChange={(v) => on({ ...it, demo: v })} />
                      <TextField label="Repository URL" value={it.repo} onChange={(v) => on({ ...it, repo: v })} />
                    </div>
                  </div>
                )}
              />
            </div>
          )}

          {tab === "Experience" && (
            <ArrayEditor
              label="Experience timeline"
              items={content.experience}
              onChange={(v) => set("experience", v)}
              makeNew={() => ({ role: "New Role", period: "2024 — Present", summary: "", points: [] })}
              itemLabel={(i, it) => it.role || `Role ${i + 1}`}
              renderItem={(it, on) => (
                <div className="flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextField label="Role" value={it.role} onChange={(v) => on({ ...it, role: v })} />
                    <TextField label="Period" value={it.period} onChange={(v) => on({ ...it, period: v })} />
                  </div>
                  <TextArea label="Summary" value={it.summary} onChange={(v) => on({ ...it, summary: v })} rows={2} />
                  <StringListField label="Achievements / responsibilities" values={it.points} onChange={(v) => on({ ...it, points: v })} />
                </div>
              )}
            />
          )}

          {tab === "Testimonials" && (
            <ArrayEditor
              label="Testimonials"
              items={content.testimonials}
              onChange={(v) => set("testimonials", v)}
              makeNew={() => ({ name: "New Client", company: "", avatar: "https://i.pravatar.cc/150", rating: 5, review: "" })}
              itemLabel={(i, it) => it.name || `Testimonial ${i + 1}`}
              renderItem={(it, on) => (
                <div className="flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextField label="Name" value={it.name} onChange={(v) => on({ ...it, name: v })} />
                    <TextField label="Company / title" value={it.company} onChange={(v) => on({ ...it, company: v })} />
                  </div>
                  <ImageUpload label="Client photo" value={it.avatar} onChange={(v) => on({ ...it, avatar: v })} />
                  <NumberField label="Rating (1-5)" value={it.rating} onChange={(v) => on({ ...it, rating: Math.max(1, Math.min(5, v)) })} min={1} max={5} />
                  <TextArea label="Review" value={it.review} onChange={(v) => on({ ...it, review: v })} rows={3} />
                </div>
              )}
            />
          )}

          {tab === "Blog" && (
            <ArrayEditor
              label="Blog posts"
              items={content.blogPosts}
              onChange={(v) => set("blogPosts", v)}
              makeNew={() => ({ id: `post-${Date.now()}`, title: "New Post", category: "Design", date: "Jan 01, 2026", excerpt: "", image: "" })}
              itemLabel={(i, it) => it.title || `Post ${i + 1}`}
              renderItem={(it, on) => (
                <div className="flex flex-col gap-3">
                  <TextField label="Title" value={it.title} onChange={(v) => on({ ...it, title: v })} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextField label="Category" value={it.category} onChange={(v) => on({ ...it, category: v })} />
                    <TextField label="Date" value={it.date} onChange={(v) => on({ ...it, date: v })} hint="e.g. Jun 02, 2026" />
                  </div>
                  <TextArea label="Excerpt" value={it.excerpt} onChange={(v) => on({ ...it, excerpt: v })} rows={2} />
                  <ImageUpload label="Featured image" value={it.image} onChange={(v) => on({ ...it, image: v })} />
                </div>
              )}
            />
          )}
        </section>
      </div>
    </main>
  );
}
