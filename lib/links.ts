/**
 * Whether a link goes through the router. Files under /public are served, not
 * routed: a client-side navigation to /resume.pdf would fail, so only
 * extensionless paths go through <Link>.
 */
export function isInternalRoute(href: string): boolean {
  return href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);
}

/** External destinations open in a new tab. */
export function isExternal(href: string): boolean {
  return /^https?:/.test(href);
}

/**
 * The phone tree is built at /m/... and served at the site's own paths by a
 * rewrite (next.config.mjs), so a phone page is prerendered with a pathname
 * the browser never shows. Anything that reads the pathname to decide what to
 * render reads it through this, so the server and the browser agree and the
 * page hydrates without a mismatch.
 */
export function canonicalPath(pathname: string): string {
  const stripped = pathname.replace(/^\/m(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}
