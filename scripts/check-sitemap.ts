const DEFAULT_BASE_URL = "https://michaelnjodds.com";

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
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
          resolve({
            status: res.statusCode || 0,
            body,
          });
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

async function main() {
  const baseArg = process.argv[2] || "http://localhost:5000";
  const baseUrl = normalizeBaseUrl(baseArg);
  const canonicalBase = normalizeBaseUrl(process.env.SITEMAP_BASE_URL || DEFAULT_BASE_URL);
  const sitemapUrl = new URL("/sitemap.xml", baseUrl).toString();

  const res = await fetchText(sitemapUrl);
  if (res.status !== 200) {
    throw new Error(`Expected 200 from ${sitemapUrl}, got ${res.status}`);
  }

  const xml = res.body;
  if (!xml.trim().startsWith("<?xml")) {
    throw new Error("sitemap.xml does not start with XML declaration");
  }

  const locs = extractLocs(xml);
  if (!locs.length) {
    throw new Error("No <loc> entries found in sitemap.xml");
  }

  const required = [`${canonicalBase}/`, `${canonicalBase}/contact`];
  for (const loc of required) {
    if (!locs.includes(loc)) {
      throw new Error(`Missing required URL in sitemap.xml: ${loc}`);
    }
  }

  const hasAbout =
    locs.includes(`${canonicalBase}/about`) || locs.includes(`${canonicalBase}/michael-njo-dds`);
  if (!hasAbout) {
    console.warn("Note: /about or /michael-njo-dds not yet in sitemap (expected once created).");
  }

  console.log("sitemap.xml OK");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
