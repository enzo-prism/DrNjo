import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { buildCanonicalUrl, CANONICAL_ORIGIN, normalizePathname } from "./canonical";
import { buildPageDescription, buildPageTitle } from "./head";

const viteLogger = createLogger();

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

function injectHeadTags(template: string, originalUrl: string): string {
  const pathname = new URL(originalUrl, CANONICAL_ORIGIN).pathname;
  const canonical = buildCanonicalUrl(pathname);
  const title = buildPageTitle(pathname);
  const description = buildPageDescription(pathname);

  let updated = template;

  if (updated.includes("__CANONICAL_URL__")) {
    updated = updated.replace("__CANONICAL_URL__", canonical);
  } else {
    updated = updated.replace(
      /<link\s+rel=["']canonical["'][^>]*href=["'][^"']*["'][^>]*>/i,
      `<link rel="canonical" href="${canonical}" />`,
    );
  }

  if (updated.includes("__PAGE_TITLE__")) {
    updated = updated.replace("__PAGE_TITLE__", title);
  } else {
    updated = updated.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  }

  if (updated.includes("__PAGE_DESCRIPTION__")) {
    updated = updated.replace("__PAGE_DESCRIPTION__", description);
  } else {
    updated = updated.replace(
      /<meta\s+name=["']description["'][^>]*content=["'][^"']*["'][^>]*>/i,
      `<meta name="description" content="${description}" />`,
    );
  }

  return updated;
}
