import { TrendingUp, TrendingDown, Lock, Loader2 } from "lucide-react";
import { HolographicCard } from "./HolographicCard";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  encrypted?: boolean;
  loading?: boolean;
}

export const MetricCard = ({ title, value, change, encrypted = true, loading = false }: MetricCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <HolographicCard className="relative group hover:scale-105 transition-transform">
      {encrypted && (
        <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity">
          <Lock className="h-4 w-4 text-primary" />
        </div>
      )}
      
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-center gap-2">
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <p className="text-2xl font-bold text-foreground">{value}</p>
          )}
        </div>
        
        {!loading && (
          <div className="flex items-center gap-1 text-sm">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-accent" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className={isPositive ? "text-accent" : "text-destructive"}>
              {isPositive ? "+" : ""}{change.toFixed(2)}%
            </span>
          </div>
        )}
      </div>
    </HolographicCard>
  );
};