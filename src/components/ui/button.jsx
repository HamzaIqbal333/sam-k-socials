import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Brand-specific variants added alongside the standard shadcn set: "brand" (pink pill, our
// primary CTA look) and "brand-outline" (ink-outlined pill) match the site's existing .btn
// vocabulary so pages read as one system, not a generic shadcn default.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-foreground hover:bg-secondary",
        brand: "bg-primary text-primary-foreground border-2 border-foreground hover:bg-secondary",
        outline: "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        "brand-outline": "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary: "bg-secondary text-secondary-foreground border-2 border-foreground hover:opacity-90",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-foreground underline-offset-4 hover:underline rounded-none",
        destructive: "bg-destructive text-destructive-foreground border-2 border-destructive hover:opacity-90",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-full px-4 text-sm",
        lg: "h-13 rounded-full px-8 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
