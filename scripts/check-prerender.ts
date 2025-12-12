import fs from "node:fs";
import path from "node:path";

type PrerenderCheck = {
  route: string;
  file: string;
  requiredStrings: string[];
};

const checks: PrerenderCheck[] = [
  {
    route: "/",
    file: "index.html",
    requiredStrings: [
      "Michael Njo, DDS",
      "Founder of",
    ],
  },
  {
    route: "/michael-njo-dds",
    file: "michael-njo-dds.html",
    requiredStrings: [
      "Michael Njo DDS",
      "Background",
      "Services",
    ],
  },
];

function main() {
  const prerenderDir = path.resolve(process.cwd(), "dist", "public", "prerendered");
  if (!fs.existsSync(prerenderDir)) {
    throw new Error(`No prerendered output found at ${prerenderDir}. Run npm run prerender first.`);
  }

  for (const check of checks) {
    const filePath = path.join(prerenderDir, check.file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing prerendered file for ${check.route}: ${filePath}`);
    }
    const html = fs.readFileSync(filePath, "utf8");
    const missing = check.requiredStrings.filter((value) => !html.includes(value));
    if (missing.length) {
      throw new Error(
        `Prerendered HTML for ${check.route} missing key strings: ${missing.join(", ")}`,
      );
    }
  }

  console.log("Prerender output includes key text strings.");
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}

