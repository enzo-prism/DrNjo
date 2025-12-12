const KEY_PATHS = ["/michael-njo-dds", "/testimonials", "/resources", "/contact"];

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
}

function normalizePathname(pathname: string): string {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "");
  }
  return pathname;
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

function extractAnchorHrefs(html: string): string[] {
  const hrefs: string[] = [];
  const anchorRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRegex.exec(html))) {
    hrefs.push(match[1]);
  }
  return hrefs;
}

function toInternalPath(href: string, baseUrl: string): string | null {
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  if (href.startsWith("#")) return null;

  try {
    const url = new URL(href, baseUrl);
    if (url.origin !== new URL(baseUrl).origin) return null;
    return normalizePathname(url.pathname);
  } catch {
    return null;
  }
}

async function crawl(baseUrl: string): Promise<string[]> {
  const visited = new Set<string>();
  const queue: string[] = ["/"];

  while (queue.length) {
    const path = queue.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);

    const url = new URL(path, baseUrl).toString();
    let res: { status: number; body: string };
    try {
      res = await fetchText(url);
    } catch {
      continue;
    }
    if (res.status < 200 || res.status >= 400) continue;

    const hrefs = extractAnchorHrefs(res.body);
    for (const href of hrefs) {
      const internalPath = toInternalPath(href, baseUrl);
      if (internalPath && !visited.has(internalPath)) {
        queue.push(internalPath);
      }
    }
  }

  return Array.from(visited).sort();
}

async function main() {
  const baseArg = process.argv[2] || "http://localhost:5000";
  const baseUrl = normalizeBaseUrl(baseArg);

  const discovered = await crawl(baseUrl);

  const missing = KEY_PATHS.filter((path) => !discovered.includes(path));
  if (missing.length) {
    throw new Error(`Crawler could not discover key routes via <a href>: ${missing.join(", ")}`);
  }

  console.log("Discovered internal URLs:");
  for (const path of discovered) {
    console.log(new URL(path, baseUrl).toString());
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

