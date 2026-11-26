// Entry program for make.fun's "The Long Roast: Lawmakers and the File
// They Cannot Convert".
//
// The entry is a single satirical sentence (at most 320 characters). It is
// held below as a constant and also kept verbatim in entry.txt beside this
// file; running the program writes the sentence to /output/entry.txt with
// no trailing newline, exactly as the gate expects to read it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "The committee voted to open the file, debated its format for three sessions, and adjourned — the PDF remains at large, unconverted and undefeated.";

const MAX_CHARS = 320;

// The sentence is kept in two places (the constant above and entry.txt) so
// the repository shows it plainly; refuse to run if they ever drift apart.
const here = dirname(fileURLToPath(import.meta.url));
const filed = readFileSync(join(here, "entry.txt"), "utf8");
if (filed !== ENTRY) {
  throw new Error("entry.txt and the ENTRY constant in main.ts differ");
}

// Refuse to write anything the sealed gate would mark invalid: the text
// must be one non-empty line within the character cap.
if (ENTRY.length === 0 || ENTRY.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
