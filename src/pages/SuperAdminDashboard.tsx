import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Truck, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Building2, 
  Settings2,
  Leaf,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const MOCK_DATA = [
  { name: 'Mon', liters: 4000, efficiency: 85 },
  { name: 'Tue', liters: 3000, efficiency: 88 },
  { name: 'Wed', liters: 2000, efficiency: 92 },
  { name: 'Thu', liters: 2780, efficiency: 90 },
  { name: 'Fri', liters: 1890, efficiency: 95 },
  { name: 'Sat', liters: 2390, efficiency: 93 },
  { name: 'Sun', liters: 3490, efficiency: 94 },
];

const MARKET_PRICES = [
  { time: '08:00', houston: 2.45, dallas: 2.52, austin: 2.58 },
  { time: '10:00', houston: 2.48, dallas: 2.50, austin: 2.60 },
  { time: '12:00', houston: 2.42, dallas: 2.48, austin: 2.55 },
  { time: '14:00', houston: 2.40, dallas: 2.45, austin: 2.52 },
  { time: '16:00', houston: 2.44, dallas: 2.47, austin: 2.54 },
];

import { useApp } from '@/App';

export function SuperAdminDashboard() {
  const { trips, companies } = useApp();
  const [logicWeight, setLogicWeight] = useState([70]);

  const totalLiters = trips.reduce((acc, t) => acc + t.liters, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Global Synergy Analytics</h1>
          <p className="text-slate-500 text-sm">System-wide performance monitoring and AI configuration.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold gap-2">
          <Globe size={18} />
          Network Status: Optimal
        </Button>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Liters Moved', value: `${(totalLiters / 1000).toFixed(1)}k`, trend: '+12.5%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Fleet Efficiency', value: '94.2%', trend: '+2.1%', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'CO2 Offset', value: '42.8t', trend: '+5.4%', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Active Companies', value: `${companies.length}`, trend: '+8', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <Badge variant="outline" className="text-[10px] border-green-200 text-green-600 bg-green-50">
                  {stat.trend}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Insights */}
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Market Insights & Pricing Hub</CardTitle>
              <CardDescription>Regional fuel price trends (USD/Gallon)</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Houston</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Dallas</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MARKET_PRICES}>
                <defs>
                  <linearGradient id="colorHouston" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="houston" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHouston)" />
                <Area type="monotone" dataKey="dallas" stroke="#a855f7" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Configurator */}
        <Card className="lg:col-span-1 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Settings2 size={20} className="text-blue-600" />
              AI Configurator
            </CardTitle>
            <CardDescription>Adjust global optimization weights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider">Logic Priority</div>
                  <div className="text-sm text-slate-500">Balance between cost and speed</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-blue-600">{logicWeight}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Cost Saving</div>
                </div>
              </div>
              <Slider 
                value={logicWeight} 
                onValueChange={setLogicWeight} 
                max={100} 
                step={1} 
                className="py-4"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>Speed Priority</span>
                <span>Cost Priority</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold">Auto-Approve Low Risk</div>
                  <div className="text-[10px] text-slate-500">Authorize optimizations &lt; $500</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold">Predictive Maintenance</div>
                  <div className="text-[10px] text-slate-500">AI-driven vehicle health alerts</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold">Dynamic Toll Routing</div>
                  <div className="text-[10px] text-slate-500">Allow AI to authorize toll usage</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <Button className="w-full bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 font-bold">
              Deploy Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Company Health Map (Mock) */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Network Health Map</CardTitle>
            <CardDescription>Real-time status of all client company hubs</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-700 border-none">142 Healthy</Badge>
            <Badge className="bg-amber-100 text-amber-700 border-none">12 Warning</Badge>
            <Badge className="bg-red-100 text-red-700 border-none">2 Critical</Badge>
          </div>
        </CardHeader>
        <CardContent className="h-[400px] p-0 relative bg-slate-50 dark:bg-zinc-900/50">
          {/* Mock Map with Clusters */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {[
                { top: '20%', left: '30%', status: 'healthy', size: 40, label: 'North Hub' },
                { top: '45%', left: '60%', status: 'warning', size: 30, label: 'Central Depot' },
                { top: '70%', left: '25%', status: 'critical', size: 25, label: 'South Station' },
                { top: '30%', left: '80%', status: 'healthy', size: 35, label: 'East Coast' },
                { top: '60%', left: '45%', status: 'healthy', size: 50, label: 'Main Terminal' },
              ].map((cluster, i) => (
                <div 
                  key={i} 
                  className="absolute cursor-pointer group"
                  style={{ top: cluster.top, left: cluster.left }}
                >
                  <div className={cn(
                    "rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg transition-transform hover:scale-110",
                    cluster.status === 'healthy' ? "bg-green-500/80" : 
                    cluster.status === 'warning' ? "bg-amber-500/80" : "bg-red-500/80"
                  )} style={{ width: cluster.size, height: cluster.size }}>
                    {Math.floor(Math.random() * 20) + 5}
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-2 py-1 rounded shadow-lg border border-slate-100 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <span className="text-[10px] font-bold">{cluster.label}</span>
                  </div>
                </div>
              ))}
              {/* SVG Map Lines */}
              <svg className="w-full h-full opacity-10 pointer-events-none">
                <path d="M300 200 L450 600 L600 450 L800 300 M450 600 L250 700" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
