import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent-gold)] text-[var(--accent-gold-deep)] shadow hover:bg-[var(--accent-gold-light)]",
        destructive:
          "bg-[var(--accent-gold-deep)] text-[var(--text-primary)] shadow-sm hover:bg-[var(--accent-gold)]",
        outline:
          "border border-[var(--border-gold)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm hover:bg-[var(--bg-glass)] hover:text-[var(--accent-gold-light)]",
        secondary:
          "bg-[var(--bg-glass)] text-[var(--text-primary)] shadow-sm hover:bg-[var(--overlay-soft)]",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--overlay-soft)] hover:text-[var(--text-primary)]",
        link: "text-[var(--accent-gold-light)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }