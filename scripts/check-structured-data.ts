import fs from "node:fs";
import path from "node:path";

import {
  getHomeStructuredData,
  getMichaelNjoStructuredData,
  getMichaelNealInterviewStructuredData,
} from "../client/src/seo/structured-data";

type PageCheck = {
  name: string;
  file: string;
  generator: () => Record<string, unknown>;
};

const checks: PageCheck[] = [
  {
    name: "home",
    file: path.resolve(process.cwd(), "client", "src", "pages", "home.tsx"),
    generator: getHomeStructuredData,
  },
  {
    name: "michael-njo-dds",
    file: path.resolve(process.cwd(), "client", "src", "pages", "michael-njo-dds.tsx"),
    generator: getMichaelNjoStructuredData,
  },
  {
    name: "dr-michael-neal-interview",
    file: path.resolve(process.cwd(), "client", "src", "pages", "dr-michael-neal-interview.tsx"),
    generator: getMichaelNealInterviewStructuredData,
  },
];

function assertScriptPresent(source: string, pageName: string) {
  if (!source.includes("<StructuredData")) {
    throw new Error(`Expected <StructuredData> to be rendered on ${pageName} page.`);
  }
}

function main() {
  for (const check of checks) {
    if (!fs.existsSync(check.file)) {
      throw new Error(`Expected page file to exist: ${check.file}`);
    }

    const source = fs.readFileSync(check.file, "utf8");
    assertScriptPresent(source, check.name);

    const data = check.generator();
    JSON.stringify(data);
  }

  console.log(`Structured data OK for ${checks.length} pages.`);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
