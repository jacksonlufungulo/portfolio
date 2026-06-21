import { ImageResponse } from "next/og";
import { defaultContent } from "@/lib/data";

// Branded social-share card. Next.js auto-wires this into og:image + twitter:image.
// Edge runtime: @vercel/og embeds its font here (no filesystem font loading), which
// avoids the Node-runtime font-path bug. Content comes from the static defaults since
// edge can't read the fs-backed content store — name/role/url match the live config.
export const runtime = "edge";
export const alt = `${defaultContent.siteConfig.name} — ${defaultContent.siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { name, role, url } = defaultContent.siteConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(0,229,255,0.30), transparent), radial-gradient(ellipse 70% 60% at 100% 100%, rgba(255,77,109,0.28), transparent), radial-gradient(ellipse 60% 50% at 70% 30%, rgba(124,58,237,0.30), transparent)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* accent bar */}
        <div
          style={{
            display: "flex",
            width: "120px",
            height: "10px",
            borderRadius: "999px",
            marginBottom: "40px",
            backgroundImage: "linear-gradient(90deg, #00e5ff, #7c3aed, #ff4d6d)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: "84px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "24px",
            fontSize: "38px",
            fontWeight: 500,
            color: "#a0a0a0",
            maxWidth: "900px",
          }}
        >
          {role}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: "28px",
            fontWeight: 600,
            color: "#00e5ff",
          }}
        >
          {url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
