"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  const { experience } = useContent();
  return (
    <section id="experience" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              My <span className="text-gradient">journey</span> so far
            </>
          }
          description="Years of compounding craft across design and software."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {experience.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* node */}
                <span
                  className={`absolute left-4 top-1.5 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-primary/40 bg-card shadow-glow md:left-auto ${
                    i % 2 === 0
                      ? "md:right-0 md:translate-x-1/2"
                      : "md:left-0 md:-translate-x-1/2"
                  }`}
                >
                  <Briefcase className="h-4 w-4 text-primary" />
                </span>

                <div className="card-glow glass rounded-2xl p-6">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {item.period}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.summary}</p>
                  <ul
                    className={`mt-4 flex flex-col gap-2 ${
                      i % 2 === 0 ? "md:items-end" : ""
                    }`}
                  >
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-foreground/75 before:mr-2 before:text-primary before:content-['▸']"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
