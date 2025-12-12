const expectedSitemap = "Sitemap: https://michaelnjodds.com/sitemap.xml";

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
}

async function main() {
  const baseArg = process.argv[2] || "http://localhost:5000";
  const baseUrl = normalizeBaseUrl(baseArg);
  const robotsUrl = new URL("/robots.txt", baseUrl).toString();

  const res = await fetch(robotsUrl);
  if (res.status !== 200) {
    throw new Error(`Expected 200 from ${robotsUrl}, got ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("text/plain")) {
    throw new Error(`Expected text/plain content-type from ${robotsUrl}, got ${contentType || "none"}`);
  }

  const body = await res.text();
  if (!body.includes(expectedSitemap)) {
    throw new Error(`robots.txt missing sitemap line. Expected to find: "${expectedSitemap}"`);
  }

  console.log("robots.txt OK");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

