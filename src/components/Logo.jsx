// The SKS mark: same badge as the favicon, reused in the header and footer so the brand
// has one consistent icon everywhere (not just the "Sam K. Socials" wordmark).
export default function Logo({ size = 34, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="16" fill="var(--color-primary)" />
      <text
        x="32"
        y="34"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="-0.5"
        fill="var(--color-foreground)"
      >
        SKS
      </text>
    </svg>
  );
}
