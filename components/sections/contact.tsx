"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { Icon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const { siteConfig, socials } = useContent();
  const [status, setStatus] = React.useState<Status>("idle");

  const contactInfo = [
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}` },
    { icon: MapPin, label: "Location", value: siteConfig.location, href: null },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    const endpoint = siteConfig.formspreeEndpoint?.trim();

    // No endpoint configured yet → simulate a send so the form isn't dead in dev.
    if (!endpoint) {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="text-gradient">great</span>
            </>
          }
          description="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* left: info */}
          <Reveal direction="right" className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => {
                const inner = (
                  <div className="card-glow glass flex items-center gap-4 rounded-2xl p-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted">
                        {item.label}
                      </p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            {/* availability */}
            <div className="glass flex items-center gap-3 rounded-2xl p-5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
              <p className="text-sm font-medium">
                {siteConfig.available
                  ? "Currently available for new projects"
                  : "Booked — join the waitlist"}
              </p>
            </div>

            {/* socials */}
            <div className="flex items-center gap-3">
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
            </div>

            {/* map */}
            <div className="card-glow glass relative h-44 overflow-hidden rounded-2xl">
              <iframe
                title="Location map"
                src="https://www.google.com/maps?q=Copperbelt%20Province%2C%20Zambia&z=8&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.2] [color-scheme:light]"
                style={{ border: 0 }}
                allowFullScreen
              />
              <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {siteConfig.location}
              </div>
            </div>
          </Reveal>

          {/* right: form */}
          <Reveal className="card-glow glass rounded-3xl p-6 md:p-8">
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Jane Doe" />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="jane@email.com"
                />
              </div>
              <Field label="Subject" name="subject" placeholder="Project inquiry" />
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={status === "sending" || status === "sent"}
                className="w-full sm:w-auto"
              >
                {status === "sending" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {status === "sent" && <CheckCircle2 className="h-4 w-4" />}
                {status === "error" && <AlertCircle className="h-4 w-4" />}
                {status === "idle" && <Send className="h-4 w-4" />}
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent!"}
                {status === "error" && "Try Again"}
              </Button>

              {status === "error" && (
                <p className="flex items-center gap-2 text-sm text-accent">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
