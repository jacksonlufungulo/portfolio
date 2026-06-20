"use client";

import { Heart } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { Icon } from "@/lib/icons";

export function Footer() {
  const { navLinks, services, siteConfig, socials } = useContent();
  const year = 2026; // static to avoid hydration mismatch; update yearly

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative border-t border-border">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2 font-display text-lg font-bold"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                {siteConfig.shortName.charAt(0)}
              </span>
              {siteConfig.name}
            </button>
            <p className="max-w-xs text-sm text-muted">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="mb-4 font-display font-semibold">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div>
            <h4 className="mb-4 font-display font-semibold">Services</h4>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.title}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="mb-4 font-display font-semibold">Get in touch</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-4 w-4 fill-accent text-accent" /> using
            Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
