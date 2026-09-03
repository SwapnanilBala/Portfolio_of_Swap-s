/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Stops `next dev`/`next build` appending its agent-rules block to
  // CLAUDE.md on every run. That file is hand-written; the generated
  // block only ever showed up as an uncommitted diff.
  agentRules: false,
};

export default nextConfig;
