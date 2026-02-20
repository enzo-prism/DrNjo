import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/src/App";
import { Router } from "wouter";

const routesToPrerender = ["/", "/michael-njo-dds", "/dr-michael-neal-interview"] as const;

function getStaticHook(route: string) {
  return () => [route, () => null] as const;
}

function injectAppHtml(template: string, appHtml: string): string {
  const marker = `<div id="root"></div>`;
  if (!template.includes(marker)) {
    throw new Error("Could not find root marker in index.html for prerendering.");
  }
  return template.replace(marker, `<div id="root">${appHtml}</div>`);
}

function routeToFilename(route: string): string {
  return route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`;
}

function main() {
  const distPublicDir = path.resolve(process.cwd(), "dist", "public");
  const templatePath = path.join(distPublicDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Expected build template at ${templatePath}. Run vite build first.`);
  }

  const template = fs.readFileSync(templatePath, "utf8");
  const outDir = path.join(distPublicDir, "prerendered");
  fs.mkdirSync(outDir, { recursive: true });

  for (const route of routesToPrerender) {
    const hook = getStaticHook(route);
    const appHtml = renderToString(
      React.createElement(Router, { hook }, React.createElement(App)),
    );
    const outputHtml = injectAppHtml(template, appHtml);
    const filename = routeToFilename(route);
    const outPath = path.join(outDir, filename);
    fs.writeFileSync(outPath, outputHtml, "utf8");
    console.log(`Prerendered ${route} -> ${path.relative(process.cwd(), outPath)}`);
  }
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
