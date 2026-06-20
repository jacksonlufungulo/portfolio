"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { Icon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, staggerItem } from "@/components/animations/reveal";

// Static class maps so Tailwind's JIT can see every class at build time.
const iconColor = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
} as const;

const iconHoverShadow = {
  primary: "group-hover:shadow-glow",
  secondary: "group-hover:shadow-glow-purple",
  accent: "group-hover:shadow-glow-accent",
} as const;

export function Services() {
  const { services } = useContent();
  return (
    <section id="services" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What I can <span className="text-gradient">do for you</span>
            </>
          }
          description="From a single logo to a full-stack product launch — flexible, end-to-end creative and technical services."
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="card-glow glass group flex flex-col gap-4 rounded-2xl p-6"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-shadow ${iconHoverShadow[service.color]}`}
              >
                <Icon
                  name={service.icon}
                  className={`h-7 w-7 ${iconColor[service.color]}`}
                />
              </div>

              <h3 className="font-display text-xl font-semibold">
                {service.title}
              </h3>
              <p className="text-sm text-muted">{service.description}</p>

              <ul className="flex flex-col gap-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary transition-all hover:gap-3"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
