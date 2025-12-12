import fs from "node:fs";
import path from "node:path";

import { buildPageDescription, buildPageTitle } from "../server/head";
import { buildCanonicalUrl, normalizePathname } from "../server/canonical";

type AuditRow = {
  pathname: string;
  title: string;
  titleOk: boolean;
  descriptionOk: boolean;
  canonicalOk: boolean;
  h1Count: number | "-";
  h1Ok: boolean | "-";
  noindexOk: boolean;
  structuredDataOk: boolean | "-";
};

function extractLocs(xml: string): string[] {
  const locs: string[] = [];
  const locRegex = /<loc>([^<]+)<\/loc>/gi;
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(xml))) {
    locs.push(match[1].trim());
  }
  return locs;
}

function readSitemapPaths(): string[] {
  const candidates = [
    path.resolve(process.cwd(), "client", "public", "sitemap.xml"),
    path.resolve(process.cwd(), "dist", "public", "sitemap.xml"),
  ];

  const sitemapPath = candidates.find((p) => fs.existsSync(p));
  if (!sitemapPath) {
    throw new Error("Could not find sitemap.xml. Run npm run generate:sitemap first.");
  }

  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locs = extractLocs(xml);
  const paths = locs.map((loc) => new URL(loc).pathname);
  return Array.from(new Set(paths)).map(normalizePathname).sort();
}

function getPageFileForPath(pathname: string): string | null {
  if (pathname === "/") return path.resolve(process.cwd(), "client", "src", "pages", "home.tsx");
  if (pathname === "/michael-njo-dds")
    return path.resolve(process.cwd(), "client", "src", "pages", "michael-njo-dds.tsx");
  if (pathname === "/testimonials") return path.resolve(process.cwd(), "client", "src", "pages", "testimonials.tsx");
  if (pathname.startsWith("/testimonials/"))
    return path.resolve(process.cwd(), "client", "src", "pages", "testimonial-detail.tsx");
  if (pathname === "/resources") return path.resolve(process.cwd(), "client", "src", "pages", "resources.tsx");
  if (pathname === "/contact") return path.resolve(process.cwd(), "client", "src", "pages", "contact.tsx");
  return null;
}

function countH1(source: string): number {
  const matches = source.match(/<h1\b/gi);
  return matches ? matches.length : 0;
}

function hasStructuredData(source: string): boolean {
  return source.includes("<StructuredData");
}

function checkGlobalNoindex(): boolean {
  const templatePath = path.resolve(process.cwd(), "client", "index.html");
  if (!fs.existsSync(templatePath)) return true;
  const html = fs.readFileSync(templatePath, "utf8").toLowerCase();
  if (html.includes("noindex") || html.includes("nofollow") || html.includes("noarchive")) {
    return false;
  }
  return true;
}

function main() {
  const paths = readSitemapPaths();
  const noindexOkGlobal = checkGlobalNoindex();

  const rows: AuditRow[] = [];
  const failures: string[] = [];
  const titleToPaths = new Map<string, string[]>();
  const descriptionToPaths = new Map<string, string[]>();

  for (const pathname of paths) {
    const title = buildPageTitle(pathname);
    const description = buildPageDescription(pathname);
    const canonical = buildCanonicalUrl(pathname);

    const titleOk = Boolean(title && title.trim());
    const descriptionOk = Boolean(description && description.trim());
    const canonicalOk = Boolean(canonical && canonical.startsWith("https://"));

    const file = getPageFileForPath(pathname);
    let h1Count: number | "-" = "-";
    let h1Ok: boolean | "-" = "-";
    let structuredDataOk: boolean | "-" = "-";

    if (file && fs.existsSync(file)) {
      const source = fs.readFileSync(file, "utf8");
      h1Count = countH1(source);
      h1Ok = h1Count === 1;

      if (pathname === "/" || pathname === "/michael-njo-dds") {
        structuredDataOk = hasStructuredData(source);
      }
    }

    const row: AuditRow = {
      pathname,
      title,
      titleOk,
      descriptionOk,
      canonicalOk,
      h1Count,
      h1Ok,
      noindexOk: noindexOkGlobal,
      structuredDataOk,
    };

    rows.push(row);

    if (!titleOk) failures.push(`${pathname}: missing title`);
    if (!descriptionOk) failures.push(`${pathname}: missing description`);
    if (!canonicalOk) failures.push(`${pathname}: missing canonical`);
    if (h1Ok !== "-" && !h1Ok) failures.push(`${pathname}: expected exactly one H1 (found ${h1Count})`);
    if (!noindexOkGlobal) failures.push(`${pathname}: noindex/nofollow found in template`);
    if (structuredDataOk !== "-" && !structuredDataOk) failures.push(`${pathname}: missing JSON-LD StructuredData`);

    if (titleOk) {
      const existing = titleToPaths.get(title) || [];
      existing.push(pathname);
      titleToPaths.set(title, existing);
    }

    if (descriptionOk) {
      const existing = descriptionToPaths.get(description) || [];
      existing.push(pathname);
      descriptionToPaths.set(description, existing);
    }
  }

  for (const [title, titlePaths] of titleToPaths.entries()) {
    if (titlePaths.length > 1) {
      failures.push(`Duplicate title "${title}" on: ${titlePaths.join(", ")}`);
    }
  }

  for (const [description, descriptionPaths] of descriptionToPaths.entries()) {
    if (descriptionPaths.length > 1) {
      failures.push(`Duplicate meta description "${description}" on: ${descriptionPaths.join(", ")}`);
    }
  }

  console.table(
    rows.map(({ titleOk, descriptionOk, canonicalOk, h1Ok, noindexOk, structuredDataOk, ...rest }) => ({
      ...rest,
      descriptionOk,
      canonicalOk,
      h1Ok,
      noindexOk,
      structuredDataOk,
    })),
  );

  if (failures.length) {
    throw new Error(`SEO QA failed:\n${failures.join("\n")}`);
  }

  console.log(`SEO QA passed for ${rows.length} indexable pages.`);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
