"use client";

import { motion } from "framer-motion";
import { useContent } from "@/components/providers/content-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";

function SkillBar({
  name,
  level,
  index,
}: {
  name: string;
  level: number;
  index: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground/90">{name}</span>
        <span className="text-muted">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: index * 0.05, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const { skillGroups } = useContent();
  return (
    <section id="skills" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              My <span className="text-gradient">technical toolkit</span>
            </>
          }
          description="A blend of design craft and engineering depth, refined across dozens of real projects."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.1}>
              <div className="card-glow glass h-full rounded-2xl p-6">
                <h3 className="mb-6 font-display text-lg font-semibold">
                  <span className="text-gradient">{group.category}</span>
                </h3>
                <div className="flex flex-col gap-5">
                  {group.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
