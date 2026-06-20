"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, X, Eye } from "lucide-react";
import { type Project } from "@/lib/data";
import { useContent } from "@/components/providers/content-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const { projects, portfolioCategories } = useContent();
  const [filter, setFilter] = React.useState<string>("All");
  const [active, setActive] = React.useState<Project | null>(null);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Close modal on Escape.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="portfolio" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title={
            <>
              Selected <span className="text-gradient">work</span>
            </>
          }
          description="A curated mix of design and development projects across industries."
        />

        {/* filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                filter === cat
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow"
                  : "border border-border text-foreground/70 hover:border-primary hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.button
                layout
                key={project.id}
                onClick={() => setActive(project)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="card-glow group relative block overflow-hidden rounded-2xl text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Eye className="h-6 w-6" />
                    </span>
                  </div>
                </div>
                {project.status && (
                  <span className="absolute right-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur">
                    {project.status}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-muted">
                    {project.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* modal / lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="glass relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur transition-colors hover:bg-accent hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-4 p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {active.category}
                  </span>
                  {active.status && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {active.status}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl font-bold">
                  {active.title}
                </h3>
                <p className="text-muted">{active.longDescription}</p>

                <div className="flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-2 flex flex-wrap gap-3">
                  {active.demo && (
                    <a href={active.demo} target="_blank" rel="noopener noreferrer">
                      <Button variant="gradient">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {active.repo && (
                    <a href={active.repo} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
