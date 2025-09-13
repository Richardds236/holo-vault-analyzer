import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
import { HolographicCard } from "./HolographicCard";

interface ChartData {
  time: string;
  value: number;
  volume?: number;
}

interface HolographicChartProps {
  title: string;
  data: ChartData[];
  type?: "line" | "area";
}

export const HolographicChart = ({ 
  title, 
  data, 
  type = "area" 
}: HolographicChartProps) => {
  return (
    <HolographicCard className="h-64" animated>
      <div className="mb-4">
        <h3 className="text-lg font-semibold holographic-text">{title}</h3>
        <div className="h-px w-full bg-gradient-to-r from-primary via-accent to-transparent opacity-50 mt-2"></div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="holographicGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(194, 100%, 50%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(180, 100%, 45%)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(194, 50%, 60%)' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(194, 50%, 60%)' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(194, 100%, 50%)"
                strokeWidth={2}
                fill="url(#holographicGradient)"
                dot={{ fill: 'hsl(194, 100%, 50%)', strokeWidth: 0, r: 3 }}
                activeDot={{ 
                  r: 5, 
                  fill: 'hsl(194, 100%, 50%)',
                  stroke: 'hsl(180, 100%, 45%)',
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(194, 50%, 60%)' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(194, 50%, 60%)' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(194, 100%, 50%)"
                strokeWidth={2}
                dot={{ fill: 'hsl(194, 100%, 50%)', strokeWidth: 0, r: 3 }}
                activeDot={{ 
                  r: 5, 
                  fill: 'hsl(194, 100%, 50%)',
                  stroke: 'hsl(180, 100%, 45%)',
                  strokeWidth: 2
                }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </HolographicCard>
  );
};