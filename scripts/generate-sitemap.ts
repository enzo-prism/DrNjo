import fs from "node:fs";
import path from "node:path";

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

function buildSitemapXml(locs: string[]): string {
  const urlEntries = locs
    .map(
      (loc) =>
        [
          "  <url>",
          `    <loc>${loc}</loc>`,
          "  </url>",
        ].join("\n"),
    )
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
  const routes = getRoutesFromApp().filter(isIndexableRoute);
  const locs = routes.map((route) => buildLoc(baseUrl, route)).sort();
  const xml = buildSitemapXml(locs);
  writeSitemap(xml);
  console.log(`Generated sitemap with ${locs.length} URLs -> client/public/sitemap.xml`);
}

main();

