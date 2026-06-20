import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content-store";
import { defaultContent, type SiteContent } from "@/lib/data";

export const dynamic = "force-dynamic";

// Set ADMIN_PASSWORD in .env.local for production. Falls back to a dev default.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin";

/** GET /api/content — public read of the current site content. */
export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

/** PUT /api/content — protected write. Requires x-admin-password header. */
export async function PUT(request: Request) {
  const password = request.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: SiteContent;
  try {
    body = (await request.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Light validation: every top-level key from the schema must be present.
  const requiredKeys = Object.keys(defaultContent) as (keyof SiteContent)[];
  const missing = requiredKeys.filter((k) => !(k in body));
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  await saveContent(body);
  return NextResponse.json({ ok: true });
}
