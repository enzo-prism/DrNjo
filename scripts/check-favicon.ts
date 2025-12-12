import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "favicon.ico",
  "favicon-32x32.png",
  "favicon-16x16.png",
  "apple-touch-icon.png",
];

function fileExists(dir: string, file: string): boolean {
  return fs.existsSync(path.join(dir, file));
}

function assertFilesExist(dir: string, label: string) {
  const missing = requiredFiles.filter((file) => !fileExists(dir, file));
  if (missing.length) {
    throw new Error(`Missing favicon assets in ${label}: ${missing.join(", ")}`);
  }
}

function extractIconLinks(html: string): string[] {
  const links: string[] = [];
  const iconRegex = /<link[^>]+rel=["'](?:icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = iconRegex.exec(html))) {
    links.push(match[1]);
  }
  return links;
}

function main() {
  const clientPublicDir = path.resolve(process.cwd(), "client", "public");
  const distPublicDir = path.resolve(process.cwd(), "dist", "public");

  assertFilesExist(clientPublicDir, "client/public");

  const distIndexPath = path.join(distPublicDir, "index.html");
  const hasDistIndex = fs.existsSync(distIndexPath);
  if (hasDistIndex) {
    assertFilesExist(distPublicDir, "dist/public");
  }

  const indexPath = hasDistIndex
    ? distIndexPath
    : path.resolve(process.cwd(), "client", "index.html");

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Expected index.html to exist at ${indexPath}`);
  }

  const html = fs.readFileSync(indexPath, "utf8");
  const iconLinks = extractIconLinks(html);
  if (!iconLinks.length) {
    throw new Error("No favicon <link rel=\"icon\"> tags found in index.html");
  }

  const hasIco = iconLinks.some((href) => href.includes("favicon.ico"));
  if (!hasIco) {
    throw new Error("Expected favicon.ico to be referenced in index.html");
  }

  console.log("favicon assets OK");
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
