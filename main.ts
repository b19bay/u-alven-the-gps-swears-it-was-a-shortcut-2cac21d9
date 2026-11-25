import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My satellite blinked, my map panicked, and this cul-de-sac has excellent acoustics.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
if (LINE.length < 1 || LINE.length > 200) {
  console.error("entry must be 1-200 characters");
  process.exit(1);
}
if (Buffer.byteLength(LINE, "utf8") !== 83) {
  console.error("entry must be exactly 83 bytes");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  console.error("read-back mismatch");
  process.exit(1);
}
