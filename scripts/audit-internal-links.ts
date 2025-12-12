import fs from "node:fs";
import path from "node:path";

import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";

import Home from "../client/src/pages/home";
import MichaelNjoDDS from "../client/src/pages/michael-njo-dds";
import TestimonialsPage from "../client/src/pages/testimonials";
import TestimonialDetailPage from "../client/src/pages/testimonial-detail";
import ResourcesPage from "../client/src/pages/resources";
import ContactPage from "../client/src/pages/contact";
import { CANONICAL_ORIGIN, normalizePathname } from "../server/canonical";

type PageRender = {
  pathname: string;
  html: string;
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

function extractAnchorHrefs(html: string): string[] {
  const hrefs: string[] = [];
  const anchorRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRegex.exec(html))) {
    hrefs.push(match[1]);
  }
  return hrefs;
}

function toInternalPath(href: string): string | null {
  if (!href) return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  if (href.startsWith("#")) return null;
  if (href.toLowerCase().startsWith("javascript:")) return null;

  try {
    const url = new URL(href, CANONICAL_ORIGIN);
    if (url.origin !== CANONICAL_ORIGIN) return null;
    return normalizePathname(url.pathname);
  } catch {
    return null;
  }
}

function getStaticHook(route: string) {
  return () => [route, () => null] as const;
}

function getPageElement(pathname: string): React.ReactElement | null {
  if (pathname === "/") return React.createElement(Home);
  if (pathname === "/michael-njo-dds") return React.createElement(MichaelNjoDDS);
  if (pathname === "/testimonials") return React.createElement(TestimonialsPage);
  if (pathname.startsWith("/testimonials/")) {
    const slug = pathname.split("/")[2] || "";
    return React.createElement(TestimonialDetailPage as any, { params: { slug } });
  }
  if (pathname === "/resources") return React.createElement(ResourcesPage);
  if (pathname === "/contact") return React.createElement(ContactPage);

  return null;
}

function renderPath(pathname: string): PageRender {
  const element = getPageElement(pathname);
  if (!element) {
    return { pathname, html: "" };
  }

  const hook = getStaticHook(pathname);
  const html = renderToString(
    React.createElement(Router, { hook }, element),
  );
  return { pathname, html };
}

function main() {
  const paths = readSitemapPaths();
  const outgoing = new Map<string, Set<string>>();

  for (const pathname of paths) {
    const { html } = renderPath(pathname);
    const hrefs = extractAnchorHrefs(html);

    const targets = new Set<string>();
    for (const href of hrefs) {
      const internalPath = toInternalPath(href);
      if (internalPath) targets.add(internalPath);
    }

    outgoing.set(pathname, targets);
  }

  const incoming = new Map<string, Set<string>>();
  for (const [source, targets] of outgoing.entries()) {
    for (const target of targets) {
      if (target === source) continue;
      const sources = incoming.get(target) || new Set<string>();
      sources.add(source);
      incoming.set(target, sources);
    }
  }

  const rows = paths.map((pathname) => {
    const sources = incoming.get(pathname) || new Set<string>();
    return {
      pathname,
      incoming: sources.size,
      incomingFrom: Array.from(sources).slice(0, 6).join(", "),
    };
  });

  console.table(rows);

  const testimonialDetailPaths = paths.filter((pathname) => pathname.startsWith("/testimonials/"));
  const tooLow = testimonialDetailPaths
    .map((pathname) => ({ pathname, incoming: (incoming.get(pathname) || new Set()).size }))
    .filter((row) => row.incoming < 2);

  if (tooLow.length) {
    const summary = tooLow
      .map((row) => `${row.pathname} (incoming=${row.incoming})`)
      .join("\n");
    throw new Error(
      `Some testimonial pages have <2 incoming internal links.\n` +
        `Add more crawlable links to these routes:\n${summary}\n`,
    );
  }

  const oneIncoming = rows.filter((row) => row.incoming === 1).map((row) => row.pathname);
  if (oneIncoming.length) {
    console.log(`Pages with exactly 1 incoming link: ${oneIncoming.length}`);
  }
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}

