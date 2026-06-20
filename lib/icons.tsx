import {
  Palette,
  PenTool,
  Code2,
  Briefcase,
  Layers,
  Smartphone,
  Megaphone,
  Camera,
  PenSquare,
  MonitorSmartphone,
  Rocket,
  Brush,
  Component,
  Database,
  Server,
  Globe,
  Cpu,
  Zap,
  ShoppingCart,
  Headphones,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Dribbble,
  Mail,
  Twitch,
  Figma,
  type LucideIcon,
} from "lucide-react";

/**
 * Central registry mapping a string name (safe to store in JSON) to a Lucide
 * icon component. The admin UI lets the user pick from `iconNames`.
 */
export const iconMap: Record<string, LucideIcon> = {
  Palette,
  PenTool,
  Code2,
  Briefcase,
  Layers,
  Smartphone,
  Megaphone,
  Camera,
  PenSquare,
  MonitorSmartphone,
  Rocket,
  Brush,
  Component,
  Database,
  Server,
  Globe,
  Cpu,
  Zap,
  ShoppingCart,
  Headphones,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Dribbble,
  Mail,
  Twitch,
  Figma,
};

export const iconNames = Object.keys(iconMap);

/** Icons that make sense for services. */
export const serviceIconNames = [
  "Palette",
  "PenTool",
  "Code2",
  "Briefcase",
  "Layers",
  "Smartphone",
  "Megaphone",
  "Camera",
  "PenSquare",
  "MonitorSmartphone",
  "Rocket",
  "Brush",
  "Component",
  "Database",
  "Server",
  "Globe",
  "Cpu",
  "Zap",
  "ShoppingCart",
  "Headphones",
];

/** Icons that make sense for social links. */
export const socialIconNames = [
  "Github",
  "Linkedin",
  "Facebook",
  "Instagram",
  "Twitter",
  "Youtube",
  "Dribbble",
  "Twitch",
  "Figma",
  "Mail",
  "Globe",
];

/** Render an icon by name, falling back to Globe if unknown. */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? Globe;
  return <Cmp className={className} />;
}
