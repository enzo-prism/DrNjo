import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";

const THRESHOLD = Number(process.env.LHCI_THRESHOLD ?? "0.84");

function parseEnvBoolean(value: string | undefined): boolean | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  return undefined;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isExecutable(filePath: string) {
  try {
    fs.accessSync(filePath, fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function findExecutableInPath(executableNames: string[]) {
  const pathValue = process.env.PATH;
  if (!pathValue) return undefined;

  const dirs = pathValue.split(path.delimiter).filter(Boolean);
  for (const dir of dirs) {
    for (const name of executableNames) {
      const candidate = path.join(dir, name);
      if (fs.existsSync(candidate) && isExecutable(candidate)) {
        return candidate;
      }
    }
  }

  return undefined;
}

function resolveChromePath() {
  const envCandidates = [
    process.env.CHROME_PATH,
    process.env.CHROMIUM_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
  ].filter(Boolean) as string[];

  for (const candidate of envCandidates) {
    if (fs.existsSync(candidate) && isExecutable(candidate)) {
      return candidate;
    }
  }

  const fromPath = findExecutableInPath(
    process.platform === "win32"
      ? ["chrome.exe", "msedge.exe"]
      : ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"],
  );
  if (fromPath) return fromPath;

  const absoluteCandidates: string[] = [];

  if (process.platform === "darwin") {
    absoluteCandidates.push(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    );
  } else if (process.platform === "linux") {
    absoluteCandidates.push(
      "/usr/bin/google-chrome-stable",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
    );
  }

  for (const candidate of absoluteCandidates) {
    if (fs.existsSync(candidate) && isExecutable(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

async function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, () => {
      const address = server.address();
      if (typeof address === "object" && address?.port) {
        const port = address.port;
        server.close(() => resolve(port));
      } else {
        server.close();
        reject(new Error("Unable to allocate a free port"));
      }
    });
  });
}

async function waitForHttp(port: number, attempts = 10) {
  const url = `http://localhost:${port}/`;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // ignore
    }
    await wait(500);
  }
  throw new Error(`Server did not start on ${url}`);
}

function getAuditValue(audits: Record<string, any>, id: string): number | undefined {
  const audit = audits[id];
  return typeof audit?.numericValue === "number" ? audit.numericValue : undefined;
}

async function main() {
  const shouldSkip =
    parseEnvBoolean(process.env.LHCI_SKIP) ??
    parseEnvBoolean(process.env.SKIP_LIGHTHOUSE) ??
    false;

  if (shouldSkip) {
    console.log("Skipping Lighthouse CI (LHCI_SKIP/SKIP_LIGHTHOUSE enabled).");
    return;
  }

  const requireChrome = parseEnvBoolean(process.env.LHCI_REQUIRE_CHROME) ?? false;
  const chromePath = resolveChromePath();

  if (!chromePath) {
    const message =
      "Skipping Lighthouse CI: Chrome/Chromium not found. Set CHROME_PATH to a Chrome/Chromium executable (or set LHCI_REQUIRE_CHROME=1 to fail instead of skipping).";
    if (requireChrome) {
      throw new Error(message);
    }
    console.warn(message);
    return;
  }

  const port = await getFreePort();

  if (!fs.existsSync(path.resolve(process.cwd(), "dist", "index.js"))) {
    throw new Error("dist/index.js not found. Run npm run build first.");
  }

  const server = spawn("node", ["dist/index.js"], {
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(port),
    },
    stdio: "inherit",
  });

  try {
    await waitForHttp(port);

    const outputPath = path.resolve(process.cwd(), "dist", "lighthouse-report.json");
    execFileSync(
      "npx",
      [
        "lighthouse",
        `http://localhost:${port}/`,
        "--output=json",
        `--output-path=${outputPath}`,
        "--only-categories=performance",
        "--chrome-flags=--headless=new --no-sandbox",
        "--quiet",
      ],
      { stdio: "inherit", env: { ...process.env, CHROME_PATH: chromePath } },
    );

    const report = JSON.parse(fs.readFileSync(outputPath, "utf8"));
    const score = report?.categories?.performance?.score;
    const audits = report?.audits || {};

    const lcp = getAuditValue(audits, "largest-contentful-paint");
    const cls = getAuditValue(audits, "cumulative-layout-shift");
    const inp = getAuditValue(audits, "interaction-to-next-paint");
    const tbt = getAuditValue(audits, "total-blocking-time");

    console.log("Lighthouse performance score:", score);
    console.log("LCP (ms):", lcp);
    console.log("CLS:", cls);
    console.log("INP (ms):", inp);
    console.log("TBT (ms):", tbt);

    if (typeof score !== "number") {
      throw new Error("Could not read performance score from Lighthouse report.");
    }

    if (score < THRESHOLD) {
      throw new Error(`Performance score ${score} is below threshold ${THRESHOLD}.`);
    }
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
