/**
 * Simple 24×24 stroke icons for the homepage “How It Works” steps.
 */
const s = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const common = { width: 28, height: 28, viewBox: "0 0 24 24" as const, "aria-hidden": true as const };

export function HowItWorksIcon({ step }: { step: 1 | 2 | 3 | 4 }) {
  switch (step) {
    case 1:
      return (
        <svg {...common}>
          <path {...s} d="M8 5h8v4H8V5zM6 9h12v10H6V9zM9 13h6M9 17h4" />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <rect {...s} x="3" y="5" width="18" height="14" rx="2" />
          <path {...s} d="M3 10h18M7 15h4" />
        </svg>
      );
    case 3:
      return (
        <svg {...common}>
          <path {...s} d="M2 17h12v-7H2v7zm12-4h3l3 3v1" />
          <circle {...s} cx="7" cy="20" r="2" />
          <circle {...s} cx="17" cy="20" r="2" />
          <path {...s} d="M2 10V7h8v3" />
        </svg>
      );
    case 4:
      return (
        <svg {...common}>
          <path {...s} d="M4 7h16v10H4V7z" />
          <path {...s} d="M4 11h16M8 15h4" />
        </svg>
      );
    default:
      return null;
  }
}
