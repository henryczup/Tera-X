'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { SParameterCurve } from '@/types/antenna';
import { motion } from 'framer-motion';

interface ChartData {
  frequency: number;
  s11: number;
}

interface SingleChartProps {
  title: string;
  subtitle?: string;
  sParams: SParameterCurve;
  color: string;
  resonance: number;
  targetFreq?: number;
}

function SingleChart({
  title,
  subtitle,
  sParams,
  color,
  resonance,
  targetFreq = 3.5,
}: SingleChartProps) {
  // Compute data directly - no useMemo to avoid stale references
  const data: ChartData[] = sParams?.frequency && sParams?.s11
    ? sParams.frequency.map((freq, i) => ({
        frequency: freq,
        s11: sParams.s11[i],
      }))
    : [];

  // Find the minimum S11 value (resonance dip)
  const minS11 = sParams?.s11?.length ? Math.min(...sParams.s11) : 0;
  
  return (
    <div className="h-full flex flex-col p-4 rounded-xl border border-border bg-card/50">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-bold" style={{ color }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Resonance</div>
          <div className="text-sm font-mono font-bold" style={{ color }}>
            {resonance.toFixed(2)} GHz
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart key={`chart-${resonance.toFixed(2)}`} data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(100, 100, 150, 0.2)"
              vertical={false}
            />
            
            <XAxis
              dataKey="frequency"
              type="number"
              domain={[1.5, 5.5]}
              tickCount={5}
              tick={{ fill: '#666', fontSize: 10 }}
              axisLine={{ stroke: '#444' }}
              tickLine={{ stroke: '#444' }}
              tickFormatter={(v) => `${v.toFixed(1)}`}
            />
            
            <YAxis
              domain={[-35, 0]}
              tickCount={4}
              tick={{ fill: '#666', fontSize: 10 }}
              axisLine={{ stroke: '#444' }}
              tickLine={{ stroke: '#444' }}
              tickFormatter={(v) => `${v}`}
            />
            
            {/* Target frequency reference line */}
            <ReferenceLine
              x={targetFreq}
              stroke="#22c55e"
              strokeDasharray="5 5"
              strokeWidth={1}
              label={{
                value: 'Target',
                position: 'top',
                fill: '#22c55e',
                fontSize: 9,
              }}
            />

            {/* -10 dB reference line (common matching threshold) */}
            <ReferenceLine
              y={-10}
              stroke="#f97316"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{
                value: '-10dB',
                position: 'right',
                fill: '#f97316',
                fontSize: 9,
              }}
            />
            
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 10, 20, 0.9)',
                border: '1px solid rgba(100, 100, 150, 0.3)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelFormatter={(v) => `${Number(v).toFixed(2)} GHz`}
              formatter={(v) => [`${Number(v).toFixed(1)} dB`, 'S11']}
            />
            
            <Line
              type="monotone"
              dataKey="s11"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
              isAnimationActive={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Stats footer */}
      <div className="flex justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
        <span>Min S11: <span className="font-mono" style={{ color }}>{minS11.toFixed(1)} dB</span></span>
        <span>Target: <span className="font-mono text-green-500">{targetFreq} GHz</span></span>
      </div>
    </div>
  );
}

interface DualSParamChartProps {
  userDesign: {
    name: string;
    sParams: SParameterCurve;
    color: string;
    resonance: number;
  } | null;
  bestDesign: {
    name: string;
    sParams: SParameterCurve;
    color: string;
    resonance: number;
  } | null;
}

export default function DualSParamChart({
  userDesign,
  bestDesign,
}: DualSParamChartProps) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 h-full p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* User's design chart */}
      <div className="h-full">
        {userDesign ? (
          <SingleChart
            title="Your Design"
            subtitle={userDesign.name}
            sParams={userDesign.sParams}
            color={userDesign.color}
            resonance={userDesign.resonance}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground rounded-xl border border-border bg-card/50">
            No design selected
          </div>
        )}
      </div>

      {/* Best design chart */}
      <div className="h-full">
        {bestDesign ? (
          <SingleChart
            title="Best Design"
            subtitle={bestDesign.name}
            sParams={bestDesign.sParams}
            color={bestDesign.color}
            resonance={bestDesign.resonance}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground rounded-xl border border-border bg-card/50">
            Waiting for race...
          </div>
        )}
      </div>
    </motion.div>
  );
}
