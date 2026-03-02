import fs from "node:fs";
import path from "node:path";
import { testimonialPages } from "../client/src/data/testimonials";

const DEFAULT_BASE_URL = "https://michaelnjodds.com";

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
}

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
  return Array.from(routes);
}

function isIndexableRoute(route: string): boolean {
  if (!route.startsWith("/")) return false;
  if (route.includes("*") || route.includes(":")) return false;

  const disallowedPrefixes = ["/admin", "/api/private", "/_internal"];
  if (disallowedPrefixes.some((prefix) => route.startsWith(prefix))) return false;

  const excludedExact = new Set<string>(["/contact/success"]);
  if (excludedExact.has(route)) return false;

  return true;
}

function buildLoc(baseUrl: string, route: string): string {
  if (route === "/") return `${baseUrl}/`;
  return `${baseUrl}${route}`;
}

type SitemapEntry = {
  loc: string;
  lastmod?: string;
};

function buildSitemapXml(entries: SitemapEntry[]): string {
  const urlEntries = entries
    .map((entry) => {
      const lines = [
        "  <url>",
        `    <loc>${entry.loc}</loc>`,
      ];
      if (entry.lastmod) {
        lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      }
      lines.push("  </url>");
      return lines.join("\n");
    })
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urlEntries,
    `</urlset>`,
    "",
  ].join("\n");
}

function writeSitemap(xml: string) {
  const publicPath = path.resolve(process.cwd(), "client", "public", "sitemap.xml");
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.writeFileSync(publicPath, xml, "utf8");

  const distPublicPath = path.resolve(process.cwd(), "dist", "public", "sitemap.xml");
  if (fs.existsSync(path.dirname(distPublicPath))) {
    fs.writeFileSync(distPublicPath, xml, "utf8");
  }
}

function main() {
  const baseUrl = normalizeBaseUrl(process.env.SITEMAP_BASE_URL || DEFAULT_BASE_URL);
  const staticRoutes = getRoutesFromApp().filter(isIndexableRoute);
  const staticRouteEntries: SitemapEntry[] = staticRoutes.map((route) => ({
    loc: buildLoc(baseUrl, route),
  }));

  const testimonialEntries: SitemapEntry[] = testimonialPages.map((testimonial) => ({
    loc: buildLoc(baseUrl, `/testimonials/${testimonial.slug}`),
    lastmod: testimonial.publishedAt,
  }));

  const mergedEntries = Array.from(
    new Map(
      [...staticRouteEntries, ...testimonialEntries]
        .filter((entry) => isIndexableRoute(new URL(entry.loc).pathname))
        .map((entry) => [entry.loc, entry] as const),
    ).values(),
  ).sort((a, b) => a.loc.localeCompare(b.loc));

  const xml = buildSitemapXml(mergedEntries);
  writeSitemap(xml);
  console.log(`Generated sitemap with ${mergedEntries.length} URLs -> client/public/sitemap.xml`);
}

main();
