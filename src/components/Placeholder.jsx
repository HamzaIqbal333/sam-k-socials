import { cn } from "@/lib/utils";

// Stand-in for real imagery. Pass src to render a real image instead.
export default function Placeholder({ label = "Image", src, alt = "", ratio = "4 / 5", className = "" }) {
  const style = { aspectRatio: ratio };
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={style}
        className={cn("w-full rounded-md object-cover", className)}
      />
    );
  }
  return (
    <div
      style={style}
      role="img"
      aria-label={label}
      className={cn(
        "grid place-items-center rounded-md p-4 text-center text-sm font-semibold text-foreground",
        "bg-[repeating-linear-gradient(135deg,var(--color-sky)_0px,var(--color-sky)_14px,color-mix(in_srgb,var(--color-sky)_70%,black)_14px,color-mix(in_srgb,var(--color-sky)_70%,black)_28px)]",
        className
      )}
    >
      {label}
    </div>
  );
}
