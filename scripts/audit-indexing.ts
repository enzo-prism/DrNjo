import fs from "node:fs";
import path from "node:path";

type AuditRow = {
  url: string;
  status: number | string;
  canonical: string;
  robots: string;
};

function getRoutesFromApp(): string[] {
  const appPath = path.resolve(process.cwd(), "client", "src", "App.tsx");
  if (!fs.existsSync(appPath)) {
    return ["/"];
  }

  const source = fs.readFileSync(appPath, "utf8");
  const routes = new Set<string>();
  const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = routeRegex.exec(source))) {
    routes.add(match[1]);
  }
  if (!routes.size) routes.add("/");
  return Array.from(routes).sort();
}

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
}

function extractCanonical(html: string): string {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? "-";
}

function extractRobots(html: string): string {
  const match = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? "-";
}

async function auditRoute(baseUrl: string, route: string): Promise<AuditRow> {
  const url = new URL(route, baseUrl).toString();
  try {
    const res = await fetch(url, { redirect: "manual" });
    const status = res.status;
    const contentType = res.headers.get("content-type") || "";
    let canonical = "-";
    let robots = "-";

    if (contentType.includes("text/html")) {
      const html = await res.text();
      canonical = extractCanonical(html);
      robots = extractRobots(html);
    }

    return { url, status, canonical, robots };
  } catch (err) {
    return { url, status: "ERR", canonical: "-", robots: "-" };
  }
}

async function main() {
  const baseArg = process.argv[2] || "http://localhost:5000";
  const baseUrl = normalizeBaseUrl(baseArg);
  const routes = getRoutesFromApp();

  const rows: AuditRow[] = await Promise.all(routes.map((route) => auditRoute(baseUrl, route)));

  console.table(rows);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
