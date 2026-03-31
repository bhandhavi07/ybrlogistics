/**
 * Logistics-only icons — single stroke weight, 24×24.
 */
const s = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export type ServiceIconId =
  | "truck"
  | "truckDedicated"
  | "warehouse"
  | "van"
  | "cargo"
  | "moving"
  | "bolt"
  | "route";

export function ServiceIcon({ id, className }: { id: ServiceIconId; className?: string }) {
  const cn = className ?? "serviceIconSvg";
  switch (id) {
    case "truck":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M14 18h5l3-3v-5h-8v8zM1 18h11v-8H1v8z" />
          <circle {...s} cx="6.5" cy="20" r="2" />
          <circle {...s} cx="18.5" cy="20" r="2" />
        </svg>
      );
    case "truckDedicated":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M2 17h12v-7H2v7zm12-4h3l3 3v1" />
          <circle {...s} cx="7" cy="20" r="2" />
          <circle {...s} cx="17" cy="20" r="2" />
          <path {...s} d="M2 10V7h8v3" />
        </svg>
      );
    case "warehouse":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M3 21V10.5L12 4l9 6.5V21M3 21h18M9 21v-5h6v5" />
        </svg>
      );
    case "van":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M2 17h11v-5H2v5zm11-5h3l4 4v1" />
          <circle {...s} cx="6.5" cy="20" r="2" />
          <circle {...s} cx="16.5" cy="20" r="2" />
        </svg>
      );
    case "cargo":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 7h16v10H4V7zm0 5h16M9 7v10M15 7v10" />
          <path {...s} d="M8 3h8v4H8V3z" />
        </svg>
      );
    case "moving":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M1 16h13v-6H1v6zm13-4h3l4 3v1" />
          <circle {...s} cx="5.5" cy="20" r="2" />
          <circle {...s} cx="17.5" cy="20" r="2" />
          <path {...s} d="M5 10V6h6v4" />
        </svg>
      );
    case "bolt":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M13 2L3 14h7l-1 8 11-12h-6l1-8z" />
        </svg>
      );
    case "route":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M3 17h3a4 4 0 014 0h4a4 4 0 014 0h3M3 7h3a4 4 0 014 4h4a4 4 0 014-4h3" />
          <circle {...s} cx="7" cy="7" r="2" />
          <circle {...s} cx="17" cy="17" r="2" />
        </svg>
      );
    default:
      return null;
  }
}
