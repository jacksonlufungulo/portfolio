"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const duration = 1600;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gradient">
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  const { bio, siteConfig, stats } = useContent();
  return (
    <section id="about" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Designing & building{" "}
              <span className="text-gradient">digital experiences</span>
            </>
          }
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* image */}
          <Reveal direction="right">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
              <div className="card-glow glass overflow-hidden rounded-3xl p-2">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={siteConfig.aboutImage}
                    alt={siteConfig.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 450px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <div className="flex flex-col gap-6">
            {bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  {siteConfig.available
                    ? "Available for freelance"
                    : "Currently booked"}
                </span>
                <span className="text-sm text-muted">
                  Based in {siteConfig.location}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <Button
                variant="gradient"
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Let&apos;s work together
              </Button>
            </Reveal>
          </div>
        </div>

        {/* stats */}
        <div className="mt-16 grid grid-cols-3 gap-3 sm:gap-4 md:mt-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-glow glass flex flex-col items-center gap-2 rounded-2xl p-4 text-center sm:p-6"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
