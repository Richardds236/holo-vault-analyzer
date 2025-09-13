import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

export const HolographicCard = ({ 
  children, 
  className,
  animated = false 
}: HolographicCardProps) => {
  return (
    <div className={cn(
      "holographic-border rounded-xl p-6 bg-card/50 backdrop-blur-sm",
      "hover:glow-data transition-all duration-300",
      animated && "data-scan",
      className
    )}>
      {children}
    </div>
  );
};