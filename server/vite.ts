import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { buildCanonicalUrl, CANONICAL_ORIGIN, normalizePathname } from "./canonical";
import { buildOpenGraphType, buildPageDescription, buildPageStructuredData, buildPageTitle } from "./head";

const viteLogger = createLogger();
const FAVICON_LINKS = [
  '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
  '<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />',
  '<link rel="shortcut icon" href="/favicon.ico" />',
  '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />',
  '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />',
  '<link rel="icon" type="image/png" sizes="256x256" href="/favicon-256x256.png" />',
  '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />',
].join("\n    ");

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk in case it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
      template = injectHeadTags(template, req.originalUrl);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  const prerenderDir = path.join(distPath, "prerendered");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, { index: false }));
  const indexTemplate = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    const pathname = normalizePathname(new URL(req.originalUrl, CANONICAL_ORIGIN).pathname);
    const prerenderFile =
      pathname === "/"
        ? path.join(prerenderDir, "index.html")
        : path.join(prerenderDir, `${pathname.replace(/^\//, "")}.html`);

    const template = fs.existsSync(prerenderFile) ? fs.readFileSync(prerenderFile, "utf8") : indexTemplate;
    const html = injectHeadTags(template, req.originalUrl);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setMetaTagContent({
  html,
  attr,
  key,
  content,
}: {
  html: string;
  attr: "name" | "property";
  key: string;
  content: string;
}): string {
  const escapedContent = escapeHtml(content);
  const tagPattern = new RegExp(
    `<meta\\s+[^>]*${attr}=["']${escapeRegExp(key)}["'][^>]*>`,
    "i",
  );
  const replacement = `<meta ${attr}="${key}" content="${escapedContent}" />`;

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, replacement);
  }

  return html.replace(/<\/head>/i, `    ${replacement}\n  </head>`);
}

function setCanonicalLink(html: string, canonical: string): string {
  const canonicalTag = `<link rel="canonical" href="${escapeHtml(canonical)}" />`;

  if (html.includes("__CANONICAL_URL__")) {
    return html.replace("__CANONICAL_URL__", escapeHtml(canonical));
  }

  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    return html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      canonicalTag,
    );
  }

  return html.replace(/<\/head>/i, `    ${canonicalTag}\n  </head>`);
}

function setTitleTag(html: string, title: string): string {
  const escapedTitle = escapeHtml(title);
  if (html.includes("__PAGE_TITLE__")) {
    return html.replace("__PAGE_TITLE__", escapedTitle);
  }
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapedTitle}</title>`);
}

function setStructuredDataScript(html: string, pathname: string): string {
  const withoutExisting = html.replace(
    /\s*<script[^>]*id=["']route-structured-data["'][^>]*>[\s\S]*?<\/script>\s*/i,
    "\n",
  );

  const data = buildPageStructuredData(pathname);
  if (!data) return withoutExisting;

  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  const script = `\n    <script type="application/ld+json" id="route-structured-data">${payload}</script>\n`;
  return withoutExisting.replace(/<\/head>/i, `${script}</head>`);
}

function injectHeadTags(template: string, originalUrl: string): string {
  const pathname = new URL(originalUrl, CANONICAL_ORIGIN).pathname;
  const canonical = buildCanonicalUrl(pathname);
  const title = buildPageTitle(pathname);
  const description = buildPageDescription(pathname);
  const ogType = buildOpenGraphType(pathname);

  let updated = template;
  updated = setCanonicalLink(updated, canonical);
  updated = setTitleTag(updated, title);
  updated = setMetaTagContent({ html: updated, attr: "name", key: "description", content: description });
  updated = setMetaTagContent({ html: updated, attr: "property", key: "og:type", content: ogType });
  updated = setMetaTagContent({ html: updated, attr: "property", key: "og:title", content: title });
  updated = setMetaTagContent({ html: updated, attr: "property", key: "og:description", content: description });
  updated = setMetaTagContent({ html: updated, attr: "property", key: "og:url", content: canonical });
  updated = setMetaTagContent({ html: updated, attr: "property", key: "twitter:title", content: title });
  updated = setMetaTagContent({ html: updated, attr: "property", key: "twitter:description", content: description });
  updated = setMetaTagContent({ html: updated, attr: "property", key: "twitter:url", content: canonical });

  // Keep favicon links consistent for every rendered route, including prerendered files.
  updated = updated.replace(
    /\s*<link[^>]+rel=["'](?:icon|apple-touch-icon|shortcut icon)["'][^>]*>\s*/gi,
    "\n",
  );

  const faviconBlock = `\n    ${FAVICON_LINKS}\n`;
  if (/<link\s+rel=["']preload["'][^>]+as=["']image["'][^>]*>/i.test(updated)) {
    updated = updated.replace(
      /(<link\s+rel=["']preload["'][^>]+as=["']image["'][^>]*>)/i,
      `$1${faviconBlock}`,
    );
  } else if (/<link\s+rel=["']canonical["'][^>]*>/i.test(updated)) {
    updated = updated.replace(
      /(<link\s+rel=["']canonical["'][^>]*>)/i,
      `$1${faviconBlock}`,
    );
  } else {
    updated = updated.replace(/<\/head>/i, `${faviconBlock}</head>`);
  }

  updated = setStructuredDataScript(updated, pathname);

  return updated;
}
