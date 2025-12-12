import {
  getContactStructuredData,
  getContactSuccessStructuredData,
  getHomeStructuredData,
  getMichaelNjoStructuredData,
} from "../client/src/seo/structured-data";

type SchemaValue = unknown;

const PROHIBITED_TYPES = new Set(["Review", "AggregateRating", "Rating"]);

function toTypeArray(value: SchemaValue): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  return [];
}

function walk(value: SchemaValue, ancestors: string[], path: string[], errors: string[]) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, ancestors, [...path, String(index)], errors));
    return;
  }

  if (!value || typeof value !== "object") return;

  const record = value as Record<string, SchemaValue>;
  const nodeTypes = toTypeArray(record["@type"]);
  const nextAncestors = [...ancestors, ...nodeTypes];

  const hasProhibited = nodeTypes.some((type) => PROHIBITED_TYPES.has(type));
  if (hasProhibited) {
    errors.push(
      `Disallowed schema type ${nodeTypes.join(", ")} at ${path.join(".") || "root"} (ancestors: ${ancestors.join(
        ", ",
      ) || "none"})`,
    );
  }

  for (const [key, child] of Object.entries(record)) {
    if (key === "@context") continue;
    walk(child, nextAncestors, [...path, key], errors);
  }
}

function assertNoSelfServingReviews(data: SchemaValue, label: string) {
  const errors: string[] = [];
  walk(data, [], [], errors);
  if (errors.length) {
    throw new Error(`Review schema policy violations in ${label}:\n${errors.join("\n")}`);
  }
}

function main() {
  const pages = [
    ["home", getHomeStructuredData()],
    ["michael-njo-dds", getMichaelNjoStructuredData()],
    ["contact", getContactStructuredData()],
    ["contact-success", getContactSuccessStructuredData()],
  ] as const;

  for (const [label, data] of pages) {
    assertNoSelfServingReviews(data, label);
  }

  console.log("Review schema policy OK (no Review/AggregateRating/Rating).");
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
