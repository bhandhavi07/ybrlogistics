/** Small logistics-style marker for home “Why us” list */
export function HomeBulletIcon({ variant }: { variant: "route" | "clock" | "package" | "chat" }) {
  const s = { stroke: "currentColor", strokeWidth: 1.75, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const cn = "homeBulletIconSvg";
  switch (variant) {
    case "route":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 17h4l2-6 4 6h6" />
          <circle {...s} cx="6" cy="17" r="2" />
        </svg>
      );
    case "clock":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx="12" cy="12" r="9" />
          <path {...s} d="M12 7v6l4 2" />
        </svg>
      );
    case "package":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 7h16v10H4V7zm8-3v20M4 12h16" />
        </svg>
      );
    case "chat":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M21 12a8 8 0 01-8 8H5l-4 3v-3a8 8 0 01-1-13 8 8 0 0116 5z" />
        </svg>
      );
    default:
      return null;
  }
}
