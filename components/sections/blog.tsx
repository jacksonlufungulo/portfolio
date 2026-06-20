"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, staggerItem } from "@/components/animations/reveal";

export function Blog() {
  const { blogPosts } = useContent();
  return (
    <section id="blog" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Blog"
          title={
            <>
              Latest <span className="text-gradient">writing</span>
            </>
          }
          description="Notes on design, development, and the freelance life. CMS-ready for future posts."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="card-glow glass group flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="text-sm text-muted">{post.excerpt}</p>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary transition-all hover:gap-3"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
