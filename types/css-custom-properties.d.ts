// CSS custom properties in inline styles. React's CSSProperties lists only the
// standard properties, so `style={{ "--cap": value }}` would not compile
// without a cast; custom properties are valid CSS, so the type is widened to
// admit any `--name` instead.
import "react";

declare module "react" {
  interface CSSProperties {
    [property: `--${string}`]: string | number | undefined;
  }
}
