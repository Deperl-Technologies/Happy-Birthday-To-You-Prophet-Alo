import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)] focus:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--accent-gold)] text-[var(--accent-gold-deep)] hover:bg-[var(--accent-gold-light)]",
        secondary:
          "border-[var(--border-gold)] bg-[var(--bg-glass)] text-[var(--text-primary)] hover:bg-[var(--overlay-soft)]",
        destructive:
          "border-transparent bg-[var(--accent-gold-deep)] text-[var(--text-primary)] hover:bg-[var(--accent-gold)]",
        outline:
          "border-[var(--border-gold)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--overlay-soft)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }