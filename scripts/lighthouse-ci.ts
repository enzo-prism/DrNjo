import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";

const THRESHOLD = Number(process.env.LHCI_THRESHOLD || "0.9");

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      { stdio: "inherit" },
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

