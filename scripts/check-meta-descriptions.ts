import fs from "node:fs";
import path from "node:path";
import { buildPageDescription } from "../server/head";

function getRoutesFromApp(): string[] {
  const appPath = path.resolve(process.cwd(), "client", "src", "App.tsx");
  if (!fs.existsSync(appPath)) return ["/"];
  const source = fs.readFileSync(appPath, "utf8");
  const routes = new Set<string>();
  const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = routeRegex.exec(source))) routes.add(match[1]);
  if (!routes.size) routes.add("/");
  return Array.from(routes);
}

function isIndexableRoute(route: string): boolean {
  if (!route.startsWith("/")) return false;
  if (route.includes("*") || route.includes(":")) return false;
  const disallowedPrefixes = ["/admin", "/api/private", "/_internal"];
  if (disallowedPrefixes.some((prefix) => route.startsWith(prefix))) return false;
  const excludedExact = new Set<string>(["/contact/success"]);
  if (excludedExact.has(route)) return false;
  return true;
}

function main() {
  const routes = getRoutesFromApp().filter(isIndexableRoute);
  const missing: string[] = [];

  for (const route of routes) {
    const desc = buildPageDescription(route);
    if (!desc || !desc.trim()) missing.push(route);
  }

  if (missing.length) {
    throw new Error(`Missing meta description for routes: ${missing.join(", ")}`);
  }

  console.log(`Meta descriptions OK for ${routes.length} indexable routes.`);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}

