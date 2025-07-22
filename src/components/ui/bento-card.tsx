import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const BentoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "bg-gradient-to-br from-white/5 to-transparent backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg h-full flex flex-col transition-all duration-300 hover:border-white/20 hover:shadow-xl",
      className
    )}
    {...props}
  />
))
BentoCard.displayName = "BentoCard"

export { BentoCard, CardHeader as BentoCardHeader, CardFooter as BentoCardFooter, CardTitle as BentoCardTitle, CardDescription as BentoCardDescription, CardContent as BentoCardContent }
