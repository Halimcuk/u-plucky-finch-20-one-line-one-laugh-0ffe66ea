// SPDX-License-Identifier: MIT
// One Line, One Laugh — writes a single funny line to <output>/entry.txt.
// The line is the whole entry: one concrete image, setup first, punch last.
// Deterministic: the same line every run, so two runs are byte-identical.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I bought a cactus because I kill every plant I touch, and now even the cactus leans away from me like it has seen things.";

// The gate: 1 to 200 characters of UTF-8 text, not only whitespace,
// and exactly one line — no newline anywhere in the entry.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${chars}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} characters to ${join(outDir, "entry.txt")}`);
