"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { useContent } from "@/components/providers/content-provider";
import { useExistingLinks } from "@/components/hooks/use-existing-links";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { navLinks: allNavLinks, siteConfig } = useContent();
  const navLinks = useExistingLinks(allNavLinks);
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("#home");
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the active section with IntersectionObserver.
  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <nav
        className={cn(
          "container flex items-center justify-between rounded-2xl px-4 transition-all duration-300",
          scrolled ? "glass h-14 shadow-lg" : "h-16 bg-transparent"
        )}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("#home")}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            {siteConfig.shortName.charAt(0)}
          </span>
          <span className="hidden sm:inline">
            {siteConfig.shortName}
            <span className="text-primary">.</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  active === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-white/5 hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Button
            variant="gradient"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => handleNav("#contact")}
          >
            <Sparkles className="h-4 w-4" />
            Hire Me
          </Button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="container overflow-hidden lg:hidden"
          >
            <ul className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                      active === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="mt-1">
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={() => handleNav("#contact")}
                >
                  <Sparkles className="h-4 w-4" />
                  Hire Me
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
