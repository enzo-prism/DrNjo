import fs from "node:fs";
import path from "node:path";

const CANONICAL_BASE = "https://michaelnjodds.com";

type AuditRow = {
  url: string;
  status: number | string;
  canonical: string;
  matchesNormalized: boolean;
  canonicalUnexpected: boolean;
};

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
}

function normalizePathname(pathname: string): string {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "");
  }
  return pathname;
}

function buildNormalizedUrl(pathname: string): string {
  const normalized = normalizePathname(pathname);
  return normalized === "/" ? `${CANONICAL_BASE}/` : `${CANONICAL_BASE}${normalized}`;
}

function extractCanonical(html: string): string {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? "-";
}

async function fetchText(url: string): Promise<{ status: number; body: string }> {
  const { protocol, hostname, port, pathname, search } = new URL(url);
  const mod = protocol === "https:" ? await import("node:https") : await import("node:http");
  const zlib = await import("node:zlib");

  return new Promise((resolve, reject) => {
    const req = mod.request(
      {
        hostname,
        port,
        path: `${pathname}${search}`,
        method: "GET",
        headers: { "Accept-Encoding": "gzip, br, deflate" },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () => {
          const buffer = Buffer.concat(chunks);
          const encoding = (res.headers["content-encoding"] || "").toString();
          let body: string;
          try {
            if (encoding === "gzip") {
              body = zlib.gunzipSync(buffer).toString("utf8");
            } else if (encoding === "br") {
              body = zlib.brotliDecompressSync(buffer).toString("utf8");
            } else if (encoding === "deflate") {
              body = zlib.inflateSync(buffer).toString("utf8");
            } else {
              body = buffer.toString("utf8");
            }
          } catch {
            body = buffer.toString("utf8");
          }

          resolve({ status: res.statusCode || 0, body });
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

function extractLocs(xml: string): string[] {
  const locs: string[] = [];
  const locRegex = /<loc>([^<]+)<\/loc>/gi;
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(xml))) {
    locs.push(match[1].trim());
  }
  return locs;
}

async function getInternalPaths(baseUrl: string): Promise<string[]> {
  try {
    const sitemapUrl = new URL("/sitemap.xml", baseUrl).toString();
    const res = await fetchText(sitemapUrl);
    if (res.status !== 200) return [];
    return extractLocs(res.body).map((loc) => new URL(loc).pathname);
  } catch {
    return [];
  }
}

function getRoutesFromApp(): string[] {
  const appPath = path.resolve(process.cwd(), "client", "src", "App.tsx");
  if (!fs.existsSync(appPath)) return ["/"];
  const source = fs.readFileSync(appPath, "utf8");
  const routes = new Set<string>();
  const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = routeRegex.exec(source))) routes.add(match[1]);
  if (!routes.size) routes.add("/");
  return Array.from(routes);
}

async function main() {
  const baseArg = process.argv[2] || "http://localhost:5000";
  const baseUrl = normalizeBaseUrl(baseArg);

  const pathsFromSitemap = await getInternalPaths(baseUrl);
  const fallbackRoutes = getRoutesFromApp();
  const paths = (pathsFromSitemap.length ? pathsFromSitemap : fallbackRoutes)
    .map(normalizePathname)
    .sort();

  const normalizedSet = new Set(paths.map(buildNormalizedUrl));

  const rows: AuditRow[] = await Promise.all(
    paths.map(async (pathname) => {
      const url = new URL(pathname, baseUrl).toString();
      try {
        const res = await fetchText(url);
        const canonical = extractCanonical(res.body);
        const expectedCanonical = buildNormalizedUrl(pathname);
        const matchesNormalized = canonical === expectedCanonical;
        const canonicalUnexpected = canonical !== "-" && canonical !== expectedCanonical && normalizedSet.has(canonical);
        return {
          url,
          status: res.status,
          canonical,
          matchesNormalized,
          canonicalUnexpected,
        };
      } catch {
        return {
          url,
          status: "ERR",
          canonical: "-",
          matchesNormalized: false,
          canonicalUnexpected: false,
        };
      }
    }),
  );

  console.table(rows);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

