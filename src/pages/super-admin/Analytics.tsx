import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useApp } from '@/App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown, DollarSign, Database, Fuel } from 'lucide-react';

const SAVINGS_DATA = [
  { month: 'Jan', aiRouting: 4200, bulkBuying: 8400, maintenance: 1200 },
  { month: 'Feb', aiRouting: 5100, bulkBuying: 7900, maintenance: 1500 },
  { month: 'Mar', aiRouting: 6800, bulkBuying: 9200, maintenance: 2100 },
  { month: 'Apr', aiRouting: 7400, bulkBuying: 11500, maintenance: 1800 },
  { month: 'May', aiRouting: 8200, bulkBuying: 10800, maintenance: 2400 },
  { month: 'Jun', aiRouting: 9500, bulkBuying: 14200, maintenance: 3100 },
];

const FUEL_TYPES = [
  { name: 'Diesel', value: 65, color: '#3b82f6' },
  { name: 'Unleaded', value: 25, color: '#a855f7' },
  { name: 'Premium', value: 10, color: '#f59e0b' },
];

export function Analytics() {
  const { marketPrices } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Global Analytics</h1>
          <p className="text-slate-500 text-sm">System-wide performance, efficiency metrics, and cost savings.</p>
        </div>
        <Button variant="outline" className="font-bold gap-2">
          <Download size={16} />
          Export PDF Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100 text-xs font-bold uppercase tracking-wider">Total AI Savings (YTD)</CardDescription>
            <CardTitle className="text-4xl font-black">$142,500</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-300 font-bold mt-2">
              <TrendingUp size={16} />
              <span>+24.5% vs last year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-100 text-xs font-bold uppercase tracking-wider">Fuel Volume Moved</CardDescription>
            <CardTitle className="text-4xl font-black">4.8M L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-300 font-bold mt-2">
              <TrendingUp size={16} />
              <span>+12.1% throughput</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-500 text-xs font-bold uppercase tracking-wider">Average Trip Delay</CardDescription>
            <CardTitle className="text-4xl font-black text-slate-800 dark:text-zinc-100">8.4m</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600 font-bold mt-2">
              <TrendingDown size={16} />
              <span>-18% derived from AI routing</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Cost Savings Breakdown</CardTitle>
            <CardDescription>Monthly savings across AI domains</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SAVINGS_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="bulkBuying" name="Bulk Discount Matching" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="aiRouting" name="AI Route Optimization" stackId="a" fill="#a855f7" />
                <Bar dataKey="maintenance" name="Predictive Maintenance" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Fuel Type Distribution</CardTitle>
            <CardDescription>Total volume percentage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4 pb-0 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={FUEL_TYPES}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {FUEL_TYPES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
