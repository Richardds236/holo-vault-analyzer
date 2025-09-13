import { Droplets, Lock, Eye } from "lucide-react";
import { HolographicCard } from "./HolographicCard";
import { Button } from "./ui/button";
import { PoolDetail } from "./PoolDetail";
import { useState } from "react";

interface PoolData {
  name: string;
  pair: string;
  tvl: string;
  apr: string;
  volume24h: string;
  encrypted: boolean;
}

interface PoolCardProps {
  pool: PoolData;
}

export const PoolCard = ({ pool }: PoolCardProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <HolographicCard className="group hover:glow-primary transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            {pool.encrypted && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                <Lock className="h-2.5 w-2.5 text-secondary-foreground" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{pool.name}</h3>
            <p className="text-sm text-muted-foreground">{pool.pair}</p>
          </div>
        </div>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="opacity-0 group-hover:opacity-100 transition-opacity holographic-border"
          onClick={() => setIsDetailOpen(true)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground mb-1">TVL</p>
          <p className="font-medium text-foreground">{pool.tvl}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">APR</p>
          <p className="font-medium text-accent">{pool.apr}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">24h Volume</p>
          <p className="font-medium text-foreground">{pool.volume24h}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Privacy Level</span>
          <span className="text-primary">
            {pool.encrypted ? "Fully Encrypted" : "Public"}
          </span>
        </div>
      </div>
    </HolographicCard>

    <PoolDetail 
      pool={pool} 
      isOpen={isDetailOpen} 
      onClose={() => setIsDetailOpen(false)} 
    />
    </>
  );
};