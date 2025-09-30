import * as React from "react"
import { cn } from "@/lib/utils"

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle: string
  description: string
  icon?: React.ReactNode
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, title, subtitle, description, icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white/10 backdrop-blur-md text-white rounded-lg p-4 text-center border border-white/20 shadow-card hover:shadow-elegant hover:bg-white/15 transition-smooth",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex justify-center mb-2">
          {icon}
        </div>
      )}
      <div className="text-xl font-extrabold text-primary mb-0.5">{title}</div>
      <div className="text-sm font-semibold text-foreground mb-1">{subtitle}</div>
      <div className="text-xs text-foreground/70">{description}</div>
    </div>
  )
)
StatsCard.displayName = "StatsCard"

export { StatsCard }