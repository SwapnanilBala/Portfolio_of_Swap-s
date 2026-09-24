/**
 * Phones, by user agent: iPhone and iPod, Android phones (their UA says
 * "Mobile"; an Android tablet's does not), and the older mobile platforms.
 * iPads report a desktop user agent and get the desktop tree, which is
 * responsive. Next matches `has` values as a whole-string regex (^...$).
 */
const PHONE_UA = ".*(?:iPhone|iPod|Android.+Mobile|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini).*";
const PHONE = [{ type: "header", key: "user-agent", value: PHONE_UA }];

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
  // Two trees, one set of URLs. A phone is served the phone tree (app/m):
  // the same design without GSAP, Lenis, the cursor or three.js. These are
  // routing rules, not a Proxy function, so on Vercel they are evaluated at
  // the edge and every page stays a static file on the CDN. beforeFiles, so
  // they apply before the desktop pages at the same paths would match. Page
  // requests, client navigations and prefetches all carry the user agent, so
  // a phone never mixes the trees.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/m", has: PHONE },
        { source: "/work", destination: "/m/work", has: PHONE },
        { source: "/work/:slug", destination: "/m/work/:slug", has: PHONE },
        { source: "/about", destination: "/m/about", has: PHONE },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  // Nobody should ever see /m: a direct visit goes to the page's real address,
  // where the rewrite above serves whichever tree fits the device.
  async redirects() {
    return [
      { source: "/m", destination: "/", permanent: false },
      { source: "/m/:path*", destination: "/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
