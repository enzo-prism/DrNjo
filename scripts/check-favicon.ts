import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "favicon.svg",
  "favicon.ico",
  "favicon-32x32.png",
  "favicon-16x16.png",
  "favicon-256x256.png",
  "apple-touch-icon.png",
];

const requiredHrefPaths = [
  "/favicon.svg",
  "/favicon.ico",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/favicon-256x256.png",
  "/apple-touch-icon.png",
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
  const iconRegex =
    /<link[^>]+rel=["'](?:icon|apple-touch-icon|shortcut icon)["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = iconRegex.exec(html))) {
    links.push(match[1]);
  }
  return links;
}

function readPngDimensions(buffer: Buffer): { width: number; height: number } | null {
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(pngSignature)) {
    return null;
  }

  const ihdr = buffer.toString("ascii", 12, 16);
  if (ihdr !== "IHDR") {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function assertSvgFavicon(svgPath: string, label: string) {
  const svg = fs.readFileSync(svgPath, "utf8");
  const pngDataUriMatch = svg.match(/data:image\/png;base64,([^"']+)/i);
  if (!pngDataUriMatch) {
    throw new Error(`Expected ${label} favicon.svg to contain an embedded PNG data URI`);
  }

  const decoded = Buffer.from(pngDataUriMatch[1], "base64");
  const dimensions = readPngDimensions(decoded);
  if (!dimensions) {
    throw new Error(`Expected ${label} favicon.svg embedded data to be a valid PNG`);
  }

  if (dimensions.width !== dimensions.height) {
    throw new Error(
      `Expected ${label} favicon.svg embedded PNG to be square, got ${dimensions.width}x${dimensions.height}`,
    );
  }
}

function assertIconLinks(htmlPath: string, publicDir: string, label: string) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const iconLinks = extractIconLinks(html);
  if (!iconLinks.length) {
    throw new Error(`No favicon <link rel="icon"> tags found in ${label} index.html`);
  }

  for (const href of requiredHrefPaths) {
    if (!iconLinks.includes(href)) {
      throw new Error(`Expected ${label} index.html to include favicon link: ${href}`);
    }
  }

  for (const href of iconLinks) {
    if (!href.startsWith("/")) continue;
    const filePath = path.join(publicDir, href.replace(/^\/+/, ""));
    if (!fs.existsSync(filePath)) {
      throw new Error(`Favicon link in ${label} index.html points to missing file: ${href}`);
    }
  }
}

function main() {
  const clientPublicDir = path.resolve(process.cwd(), "client", "public");
  const distPublicDir = path.resolve(process.cwd(), "dist", "public");
  const clientIndexPath = path.resolve(process.cwd(), "client", "index.html");
  const distIndexPath = path.join(distPublicDir, "index.html");

  assertFilesExist(clientPublicDir, "client/public");
  assertSvgFavicon(path.join(clientPublicDir, "favicon.svg"), "client/public");
  assertIconLinks(clientIndexPath, clientPublicDir, "client");

  const hasDistIndex = fs.existsSync(distIndexPath);
  if (hasDistIndex) {
    assertFilesExist(distPublicDir, "dist/public");
    assertSvgFavicon(path.join(distPublicDir, "favicon.svg"), "dist/public");
    assertIconLinks(distIndexPath, distPublicDir, "dist/public");
  }

  console.log("favicon assets OK");
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
