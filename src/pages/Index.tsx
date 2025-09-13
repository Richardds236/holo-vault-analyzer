import { FHEBadge } from "@/components/FHEBadge";
import { MetricCard } from "@/components/MetricCard";
import { HolographicChart } from "@/components/HolographicChart";
import { PoolCard } from "@/components/PoolCard";
import { WalletConnect } from "@/components/WalletConnect";
import { useHoloVaultContract, useFHEOperations } from "@/hooks/useContract";
import { Activity, Database, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data for demonstration
const chartData = [
  { time: "00:00", value: 2400, volume: 120 },
  { time: "04:00", value: 1398, volume: 98 },
  { time: "08:00", value: 9800, volume: 180 },
  { time: "12:00", value: 3908, volume: 156 },
  { time: "16:00", value: 4800, volume: 201 },
  { time: "20:00", value: 3800, volume: 167 },
  { time: "24:00", value: 4300, volume: 189 },
];

const poolData = [
  {
    name: "ETH/USDC",
    pair: "Ethereum • USDC",
    tvl: "$45.2M",
    apr: "12.34%",
    volume24h: "$2.1M",
    encrypted: true,
  },
  {
    name: "BTC/ETH", 
    pair: "Bitcoin • Ethereum",
    tvl: "$28.7M",
    apr: "8.91%",
    volume24h: "$1.8M",
    encrypted: true,
  },
  {
    name: "USDC/USDT",
    pair: "USDC • Tether",
    tvl: "$67.1M",
    apr: "4.23%",
    volume24h: "$5.4M",
    encrypted: false,
  },
];

const Index = () => {
  const { globalAnalytics, analyticsLoading, isConnected } = useHoloVaultContract();
  const { decryptValue } = useFHEOperations();
  const [decryptedAnalytics, setDecryptedAnalytics] = useState({
    totalTVL: 0,
    totalVolume24h: 0,
    averageAPR: 0,
    activePools: 0,
    totalUsers: 0,
  });

  // Decrypt analytics data when available
  useEffect(() => {
    if (globalAnalytics && isConnected) {
      // In a real implementation, this would decrypt the FHE values
      // For now, we'll use mock decrypted values
      setDecryptedAnalytics({
        totalTVL: 141200000, // $141.2M
        totalVolume24h: 9300000, // $9.3M
        averageAPR: 849, // 8.49%
        activePools: 12,
        totalUsers: 156,
      });
    }
  }, [globalAnalytics, isConnected]);

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in">
      {/* Header with FHE Badge and Wallet Connection */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <FHEBadge />
          <div>
            <h1 className="text-3xl font-bold holographic-text">
              Holo Vault Analyzer
            </h1>
            <p className="text-muted-foreground mt-1">
              Privacy-preserving AMM analytics with FHE encryption
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-accent glow-accent"></div>
            <span>Real-time encrypted data</span>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Key Metrics Dashboard */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Portfolio Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Value Locked"
            value={isConnected ? `$${(decryptedAnalytics.totalTVL / 1000000).toFixed(1)}M` : "Connect Wallet"}
            change={12.5}
            encrypted={true}
            loading={analyticsLoading}
          />
          <MetricCard
            title="24h Trading Volume"
            value={isConnected ? `$${(decryptedAnalytics.totalVolume24h / 1000000).toFixed(1)}M` : "Connect Wallet"}
            change={-2.1}
            encrypted={true}
            loading={analyticsLoading}
          />
          <MetricCard
            title="Active Pools"
            value={isConnected ? decryptedAnalytics.activePools.toString() : "Connect Wallet"}
            change={8.3}
            encrypted={false}
            loading={analyticsLoading}
          />
          <MetricCard
            title="Average APR"
            value={isConnected ? `${(decryptedAnalytics.averageAPR / 100).toFixed(2)}%` : "Connect Wallet"}
            change={1.7}
            encrypted={true}
            loading={analyticsLoading}
          />
        </div>
      </section>

      {/* Holographic Charts Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HolographicChart
            title="TVL Trend (7 Days)"
            data={chartData}
            type="area"
          />
          <HolographicChart
            title="Volume Analysis"
            data={chartData.map(d => ({ ...d, value: d.volume || 0 }))}
            type="line"
          />
        </div>
      </section>

      {/* Pool Explorer */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Your Liquidity Pools</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poolData.map((pool, index) => (
            <PoolCard key={index} pool={pool} />
          ))}
        </div>
      </section>

      {/* Footer Status */}
      <footer className="pt-8 border-t border-border/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span>FHE Computing: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
              <span>Last sync: 2s ago</span>
            </div>
          </div>
          
          <div className="text-xs opacity-60">
            Powered by Fully Homomorphic Encryption
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;