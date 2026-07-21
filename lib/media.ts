import fs from "node:fs";
import path from "node:path";

/**
 * True if the given path under /public exists on disk. Lets photo panels
 * fall back to their placeholder until real photography lands — drop a file
 * in at the expected path and the swap happens with no code changes.
 */
export function publicImageExists(relativePath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", relativePath));
}
