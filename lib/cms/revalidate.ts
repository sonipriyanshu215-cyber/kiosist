import "server-only";
import { revalidatePath } from "next/cache";

// Best-effort full-site cache refresh after an admin write (image slot,
// content item, gallery). Never throws: the DB write has already
// happened by the time this runs, so a cache-layer hiccup must not turn a
// successful save into a 500 that makes the admin retry (and double-post).
export function revalidateSite(): void {
  try {
    revalidatePath("/", "layout");
  } catch (err) {
    console.error("revalidateSite failed (the write itself succeeded):", err);
  }
}
