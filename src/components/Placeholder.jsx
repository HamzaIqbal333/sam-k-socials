// Stand-in for real imagery. Pass src to render a real image instead.
export default function Placeholder({ label = "Image", src, alt = "", ratio = "4 / 5", className = "" }) {
  if (src) return <img src={src} alt={alt} style={{ aspectRatio: ratio, objectFit: "cover", borderRadius: "var(--r-md)", width: "100%" }} className={className} />;
  return <div className={`placeholder ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={label}>{label}</div>;
}
