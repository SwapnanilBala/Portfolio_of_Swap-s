/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Stops `next dev`/`next build` appending its agent-rules block to
  // CLAUDE.md on every run. That file is hand-written; the generated
  // block only ever showed up as an uncommitted diff.
  agentRules: false,
  images: {
    // 75 is Next's default and its only allowed value unless listed here.
    // Screenshots ask for 90 (SCREENSHOT_QUALITY in lib/media.ts): at 75 the
    // optimizer's re-encode rings around small interface text.
    qualities: [75, 90],
  },
};

export default nextConfig;
