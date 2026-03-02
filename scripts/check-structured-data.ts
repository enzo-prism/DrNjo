import fs from "node:fs";
import path from "node:path";

import {
  getHomeStructuredData,
  getMichaelNjoStructuredData,
  getMichaelNjoInterviewStructuredData,
} from "../client/src/seo/structured-data";
import { testimonialPages } from "../client/src/data/testimonials";
import { buildPageStructuredData } from "../server/head";

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
    name: "dr-michael-njo-interview",
    file: path.resolve(process.cwd(), "client", "src", "pages", "dr-michael-njo-interview.tsx"),
    generator: getMichaelNjoInterviewStructuredData,
  },
];

function assertScriptPresent(source: string, pageName: string) {
  if (!source.includes("<StructuredData")) {
    throw new Error(`Expected <StructuredData> to be rendered on ${pageName} page.`);
  }
}

function collectTopLevelTypes(data: Record<string, unknown>): Set<string> {
  const types = new Set<string>();
  const graph = Array.isArray(data["@graph"]) ? (data["@graph"] as Record<string, unknown>[]) : [data];

  for (const node of graph) {
    const typeField = node["@type"];
    if (typeof typeField === "string") {
      types.add(typeField);
      continue;
    }
    if (Array.isArray(typeField)) {
      for (const typeValue of typeField) {
        if (typeof typeValue === "string") {
          types.add(typeValue);
        }
      }
    }
  }

  return types;
}

function assertIncludesType(data: Record<string, unknown>, expectedType: string, route: string) {
  const types = collectTopLevelTypes(data);
  if (!types.has(expectedType)) {
    throw new Error(`Expected route ${route} to include JSON-LD type "${expectedType}". Found: ${Array.from(types).join(", ")}`);
  }
}

function assertIncludesAnyType(data: Record<string, unknown>, expectedTypes: string[], route: string) {
  const types = collectTopLevelTypes(data);
  const found = expectedTypes.some((expectedType) => types.has(expectedType));
  if (!found) {
    throw new Error(
      `Expected route ${route} to include one of JSON-LD types [${expectedTypes.join(", ")}]. Found: ${Array.from(types).join(", ")}`,
    );
  }
}

function assertServerStructuredData(pathname: string) {
  const data = buildPageStructuredData(pathname);
  if (!data) {
    throw new Error(`Expected server route-level JSON-LD for ${pathname}, but got null.`);
  }
  JSON.stringify(data);
  return data;
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

  const homeRouteData = assertServerStructuredData("/");
  assertIncludesType(homeRouteData, "ProfilePage", "/");

  const michaelRouteData = assertServerStructuredData("/michael-njo-dds");
  assertIncludesType(michaelRouteData, "ProfilePage", "/michael-njo-dds");
  assertIncludesAnyType(michaelRouteData, ["EducationEvent", "Event"], "/michael-njo-dds");

  const interviewRouteData = assertServerStructuredData("/dr-michael-njo-interview");
  assertIncludesType(interviewRouteData, "VideoObject", "/dr-michael-njo-interview");

  const contactRouteData = assertServerStructuredData("/contact");
  assertIncludesType(contactRouteData, "ContactPage", "/contact");

  const contactSuccessRouteData = assertServerStructuredData("/contact/success");
  assertIncludesType(contactSuccessRouteData, "WebPage", "/contact/success");

  const testimonialCollectionData = assertServerStructuredData("/testimonials");
  assertIncludesType(testimonialCollectionData, "CollectionPage", "/testimonials");
  assertIncludesType(testimonialCollectionData, "ItemList", "/testimonials");

  const sampleTestimonialSlug = testimonialPages[0]?.slug;
  if (!sampleTestimonialSlug) {
    throw new Error("Expected at least one testimonial to validate detail route structured data.");
  }
  const testimonialDetailData = assertServerStructuredData(`/testimonials/${sampleTestimonialSlug}`);
  assertIncludesType(testimonialDetailData, "Article", `/testimonials/${sampleTestimonialSlug}`);
  assertIncludesType(testimonialDetailData, "CreativeWork", `/testimonials/${sampleTestimonialSlug}`);

  console.log(`Structured data OK for ${checks.length} pages and 7 server-routed paths.`);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
