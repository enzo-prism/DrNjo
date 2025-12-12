import fs from "node:fs";
import path from "node:path";

type ImgCheck = {
  file: string;
  name: string;
};

const pages: ImgCheck[] = [
  { name: "home", file: path.resolve(process.cwd(), "client", "src", "pages", "home.tsx") },
  { name: "michael-njo-dds", file: path.resolve(process.cwd(), "client", "src", "pages", "michael-njo-dds.tsx") },
];

function extractImgTags(source: string): string[] {
  return source.match(/<img[\s\S]*?>/g) || [];
}

function assertAltPresent(tag: string, context: string) {
  if (!/\balt=/.test(tag)) {
    throw new Error(`Missing alt text on <img> in ${context}: ${tag}`);
  }

  const altLiteral = tag.match(/\balt=["']([^"']*)["']/);
  if (altLiteral && !altLiteral[1].trim()) {
    throw new Error(`Empty alt attribute on <img> in ${context}: ${tag}`);
  }
}

function assertNotLazy(tag: string, context: string) {
  if (/\bloading=["']lazy["']/.test(tag)) {
    throw new Error(`Hero image should not be lazy-loaded in ${context}: ${tag}`);
  }
}

function assertLazy(tag: string, context: string) {
  if (!/\bloading=["']lazy["']/.test(tag)) {
    throw new Error(`Below-the-fold image should be lazy-loaded in ${context}: ${tag}`);
  }
}

function main() {
  const homeSource = fs.readFileSync(pages[0].file, "utf8");
  const homeImgs = extractImgTags(homeSource);
  if (!homeImgs.length) throw new Error("Expected at least one <img> on home page.");

  for (const tag of homeImgs) {
    assertAltPresent(tag, "home page");
  }

  const heroImg = homeImgs.find((tag) => tag.includes("drNjoHeadshot"));
  if (!heroImg) {
    throw new Error("Could not find hero image tag on home page.");
  }
  assertNotLazy(heroImg, "home hero");

  const belowFoldSelectors = ["dugoni-business-club-donation-ceremony", "dr-njo-clients-"];
  for (const selector of belowFoldSelectors) {
    const tag = homeImgs.find((img) => img.includes(selector));
    if (!tag) {
      throw new Error(`Expected below-the-fold image containing "${selector}" on home page.`);
    }
    assertLazy(tag, `home (${selector})`);
  }

  const profileSource = fs.readFileSync(pages[1].file, "utf8");
  const profileImgs = extractImgTags(profileSource);
  for (const tag of profileImgs) {
    assertAltPresent(tag, "michael-njo-dds page");
    if (tag.includes("drNjoHeadshot")) {
      assertNotLazy(tag, "michael-njo-dds hero");
    }
  }

  console.log("Image SEO checks OK.");
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}

