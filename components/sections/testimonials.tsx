"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  const { testimonials } = useContent();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const go = React.useCallback(
    (dir: number) =>
      setIndex((i) => (i + dir + testimonials.length) % testimonials.length),
    []
  );

  // Auto-rotate.
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [paused, go]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              What <span className="text-gradient">clients say</span>
            </>
          }
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="absolute -top-5 left-0 h-12 w-12 text-primary/20 sm:-left-2 sm:-top-6 sm:h-16 sm:w-16" />

          <div className="card-glow glass min-h-[18rem] overflow-hidden rounded-3xl p-6 sm:p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
                  “{current.review}”
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary/40">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-display font-semibold">{current.name}</p>
                    <p className="text-sm text-muted">{current.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/80 transition-all hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-primary" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/80 transition-all hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
