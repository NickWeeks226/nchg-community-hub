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
        "bg-card text-card-foreground rounded-lg p-4 text-center border shadow-card hover:shadow-elegant transition-smooth",
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
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  )
)
StatsCard.displayName = "StatsCard"

export { StatsCard }