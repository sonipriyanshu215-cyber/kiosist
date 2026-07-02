import fs from "node:fs";
import path from "node:path";

/**
 * Server-only. Returns the basenames of files that actually exist inside
 * public/<dir>, so client components can skip requesting images that
 * were never added instead of round-tripping a 400 through next/image.
 */
export function listExistingAssets(dir: string): string[] {
  const abs = path.join(process.cwd(), "public", dir);
  try {
    return fs.readdirSync(abs);
  } catch {
    return [];
  }
}
