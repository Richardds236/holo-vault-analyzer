import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Droplets, 
  Lock, 
  TrendingUp, 
  Users, 
  Activity, 
  BarChart3,
  DollarSign,
  Clock,
  Shield,
  Eye,
  EyeOff
} from "lucide-react";
import { HolographicCard } from "./HolographicCard";
import { HolographicChart } from "./HolographicChart";

interface PoolData {
  name: string;
  pair: string;
  tvl: string;
  apr: string;
  volume24h: string;
  encrypted: boolean;
}

interface PoolDetailProps {
  pool: PoolData;
  isOpen: boolean;
  onClose: () => void;
}

// Mock detailed data for the pool
const getPoolDetailData = (pool: PoolData) => ({
  ...pool,
  totalLiquidity: "$45.2M",
  fees24h: "$12,450",
  fees7d: "$89,230",
  volume7d: "$15.2M",
  priceChange24h: "+2.34%",
  priceChange7d: "+8.67%",
  liquidityProviders: 1247,
  transactions24h: 3456,
  averageTradeSize: "$2,340",
  impermanentLoss: "0.12%",
  chartData: [
    { time: "00:00", value: 2400, volume: 120 },
    { time: "04:00", value: 1398, volume: 98 },
    { time: "08:00", value: 9800, volume: 180 },
    { time: "12:00", value: 3908, volume: 156 },
    { time: "16:00", value: 4800, volume: 201 },
    { time: "20:00", value: 3800, volume: 167 },
    { time: "24:00", value: 4300, volume: 189 },
  ],
  tokenInfo: {
    tokenA: {
      symbol: "ETH",
      name: "Ethereum",
      price: "$2,450.67",
      change24h: "+1.23%",
      balance: "18.45 ETH"
    },
    tokenB: {
      symbol: "USDC",
      name: "USD Coin",
      price: "$1.00",
      change24h: "0.00%",
      balance: "45,230 USDC"
    }
  }
});

export const PoolDetail = ({ pool, isOpen, onClose }: PoolDetailProps) => {
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  const detailData = getPoolDetailData(pool);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold holographic-text">{pool.name}</h2>
              <p className="text-muted-foreground">{pool.pair}</p>
            </div>
            {pool.encrypted && (
              <Badge variant="outline" className="holographic-border glow-primary">
                <Shield className="h-3 w-3 mr-1" />
                FHE Encrypted
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <HolographicCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Value Locked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{detailData.totalLiquidity}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +2.34% from yesterday
                  </p>
                </CardContent>
              </HolographicCard>

              <HolographicCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    24h Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{detailData.volume24h}</div>
                  <p className="text-xs text-muted-foreground">
                    <Activity className="h-3 w-3 inline mr-1" />
                    {detailData.transactions24h} transactions
                  </p>
                </CardContent>
              </HolographicCard>

              <HolographicCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    APR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{detailData.apr}</div>
                  <p className="text-xs text-muted-foreground">
                    <DollarSign className="h-3 w-3 inline mr-1" />
                    {detailData.fees24h} fees today
                  </p>
                </CardContent>
              </HolographicCard>

              <HolographicCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Liquidity Providers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{detailData.liquidityProviders}</div>
                  <p className="text-xs text-muted-foreground">
                    <Users className="h-3 w-3 inline mr-1" />
                    Active providers
                  </p>
                </CardContent>
              </HolographicCard>
            </div>

            {/* Price Chart */}
            <HolographicCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Price Chart (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HolographicChart
                  title=""
                  data={detailData.chartData}
                  type="area"
                />
              </CardContent>
            </HolographicCard>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <HolographicCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    7d Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{detailData.volume7d}</div>
                </CardContent>
              </HolographicCard>

              <HolographicCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Trade Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{detailData.averageTradeSize}</div>
                </CardContent>
              </HolographicCard>

              <HolographicCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Impermanent Loss
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-accent">{detailData.impermanentLoss}</div>
                </CardContent>
              </HolographicCard>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HolographicCard>
                <CardHeader>
                  <CardTitle>Volume Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <HolographicChart
                    title=""
                    data={detailData.chartData.map(d => ({ ...d, value: d.volume || 0 }))}
                    type="line"
                  />
                </CardContent>
              </HolographicCard>

              <HolographicCard>
                <CardHeader>
                  <CardTitle>Liquidity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ETH</span>
                      <span className="font-medium">40.8%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '40.8%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">USDC</span>
                      <span className="font-medium">59.2%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '59.2%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </HolographicCard>
            </div>
          </TabsContent>

          <TabsContent value="tokens" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HolographicCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                    {detailData.tokenInfo.tokenA.symbol}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">{detailData.tokenInfo.tokenA.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Change:</span>
                    <span className="font-medium text-accent">{detailData.tokenInfo.tokenA.change24h}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance:</span>
                    <span className="font-medium">{detailData.tokenInfo.tokenA.balance}</span>
                  </div>
                </CardContent>
              </HolographicCard>

              <HolographicCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">U</span>
                    </div>
                    {detailData.tokenInfo.tokenB.symbol}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">{detailData.tokenInfo.tokenB.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Change:</span>
                    <span className="font-medium text-accent">{detailData.tokenInfo.tokenB.change24h}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance:</span>
                    <span className="font-medium">{detailData.tokenInfo.tokenB.balance}</span>
                  </div>
                </CardContent>
              </HolographicCard>
            </div>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <HolographicCard>
              <CardHeader>
                <CardTitle>Your Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No positions found</p>
                  <p className="text-sm">Connect your wallet to view your positions</p>
                </div>
              </CardContent>
            </HolographicCard>
          </TabsContent>
        </Tabs>

        {/* Encryption Toggle */}
        {pool.encrypted && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>FHE Encrypted Data</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEncryptedData(!showEncryptedData)}
              className="holographic-border"
            >
              {showEncryptedData ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Raw Data
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Show Raw Data
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
