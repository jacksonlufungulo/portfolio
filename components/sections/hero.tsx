"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTyping } from "@/components/hooks/use-typing";
import { useContent } from "@/components/providers/content-provider";
import { Icon } from "@/lib/icons";

export function Hero() {
  const { heroTitles, siteConfig, socials } = useContent();
  const typed = useTyping(heroTitles);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-glow pt-28"
    >
      {/* grid backdrop */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for freelance work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Creative Designer,
            <br />
            <span className="text-gradient">Software Developer</span>
            <br />& Freelancer
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex h-9 items-center text-xl font-medium text-muted sm:text-2xl"
          >
            <span className="mr-2">I'm a</span>
            <span className="font-semibold text-foreground">{typed}</span>
            <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-primary sm:h-7" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-xl text-base text-muted md:text-lg"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button variant="gradient" size="lg" onClick={() => scrollTo("#portfolio")}>
              View Portfolio
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollTo("#contact")}>
              <Sparkles className="h-4 w-4" />
              Hire Me
            </Button>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-3 pt-2"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: floating profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 blur-3xl" />

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="card-glow glass overflow-hidden rounded-3xl p-3"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={siteConfig.heroImage}
                alt={siteConfig.name}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <div className="flex items-center justify-between px-3 py-4">
              <div>
                <p className="font-display text-lg font-semibold">
                  {siteConfig.name}
                </p>
                <p className="text-xs text-muted">Creative · Developer</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Online
              </span>
            </div>
          </motion.div>

          {/* floating accent chips */}
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-6 top-12 rounded-2xl px-4 py-3 text-sm shadow-glow-purple"
          >
            <p className="font-display text-xl font-bold text-secondary">50+</p>
            <p className="text-xs text-muted">Projects</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -right-4 bottom-16 rounded-2xl px-4 py-3 text-sm shadow-glow"
          >
            <p className="font-display text-xl font-bold text-primary">3+ yrs</p>
            <p className="text-xs text-muted">Experience</p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo("#about")}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
