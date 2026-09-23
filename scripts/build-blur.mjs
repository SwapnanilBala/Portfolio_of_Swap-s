// Regenerates lib/blur.ts from every .webp in public/media.
//
//   node scripts/build-blur.mjs
//
// Each placeholder is the image resized to 12px wide and encoded as WebP at
// quality 45 -- around 80 bytes, inlined as a data URL. `next/image` only
// derives a placeholder itself for statically imported images, and these are
// addressed by path. The script also prints each file's intrinsic size, which
// is what `width` / `height` in lib/content.ts must match.
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const MEDIA = join(ROOT, "public", "media");

const files = readdirSync(MEDIA)
  .filter((f) => f.endsWith(".webp"))
  .sort();

const entries = [];
for (const file of files) {
  const input = join(MEDIA, file);
  const { width, height } = await sharp(input).metadata();
  const tiny = await sharp(input)
    .resize({ width: 12 })
    .webp({ quality: 45 })
    .toBuffer();
  const key = `/media/${file}`;
  entries.push({ key, url: `data:image/webp;base64,${tiny.toString("base64")}` });
  console.log(`${key.padEnd(44)} ${width}x${height}`);
}

const union = entries.map((e) => `  | "${e.key}"`).join("\n");
const record = entries.map((e) => `  "${e.key}":\n    "${e.url}",`).join("\n");

const source = `/**
 * Blur placeholders for every still in \`public/media\`. Generated -- do not
 * edit by hand. Run \`node scripts/build-blur.mjs\` after adding or re-cropping
 * a capture.
 *
 * Kept out of \`lib/content.ts\` on purpose: that file holds the site's prose
 * and reviews as a clean diff of English. These are build output.
 */

/**
 * The media paths that have a placeholder. Referencing a capture from content
 * fails to compile until the script has been run over it -- the same guarantee
 * \`LINK_LABELS\` gives link roles.
 */
export type BlurredMedia =
${union};

export const BLUR_PLACEHOLDERS: Readonly<Record<BlurredMedia, string>> = {
${record}
};
`;

writeFileSync(join(ROOT, "lib", "blur.ts"), source);
console.log(`\nwrote lib/blur.ts (${entries.length} entries)`);
