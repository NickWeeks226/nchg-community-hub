import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CaseStudyCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'results'> {
  title: string
  problem: string
  solution: string
  results: string
  ctaText: string
  onCtaClick?: () => void
}

const CaseStudyCard = React.forwardRef<HTMLDivElement, CaseStudyCardProps>(
  ({ className, title, problem, solution, results, ctaText, onCtaClick, ...props }, ref) => (
    <Card ref={ref} className={cn("hover-lift", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-lg font-display font-bold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-destructive mb-2">Problem:</h4>
          <p className="text-sm text-muted-foreground">{problem}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-2">Solution:</h4>
          <p className="text-sm text-muted-foreground">{solution}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-success mb-2">Results:</h4>
          <p className="text-sm text-foreground font-medium">{results}</p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4"
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  )
)
CaseStudyCard.displayName = "CaseStudyCard"

export { CaseStudyCard }