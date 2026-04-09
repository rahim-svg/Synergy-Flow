import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Truck, Globe, Zap, Leaf } from 'lucide-react';
import { useApp } from '@/App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function SuperAdminDashboard() {
  const { companies, marketPrices } = useApp();
  
  const activeCompanies = companies.filter(c => c.status !== 'CRITICAL').length;
  const avgEfficiency = Math.round(companies.reduce((acc, c) => acc + c.metrics.efficiency, 0) / companies.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Global Synergy Analytics</h1>
          <p className="text-slate-500 text-sm">System-wide performance monitoring and market overview.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold gap-2">
          <Globe size={18} />
          Network Status: Optimal
        </Button>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Liters Moved YTD', value: '4.8M', trend: '+12.5%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Global Fleet Efficiency', value: `${avgEfficiency}%`, trend: '+2.1%', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Network CO2 Offset', value: '42.8t', trend: '+5.4%', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Integrated Companies', value: companies.length.toString(), trend: `+${activeCompanies}`, icon: Globe, color: 'text-amber-600', bg: 'bg-amber-50' },
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
              <CardDescription>Regional fuel spot price trends (USD/Gallon)</CardDescription>
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
              <AreaChart data={marketPrices}>
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

        {/* Quick Links / Summary */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            <CardDescription>Manage global settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/super-admin/ai-config" className="block p-4 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
              <div className="font-bold text-sm text-slate-800 dark:text-zinc-200">Tune AI Heuristics</div>
              <div className="text-xs text-slate-500 mt-1">Adjust risk thresholds and routing logic.</div>
            </Link>
            <Link to="/super-admin/companies" className="block p-4 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
              <div className="font-bold text-sm text-slate-800 dark:text-zinc-200">Manage Companies</div>
              <div className="text-xs text-slate-500 mt-1">Review onboarded fleets and add new clients.</div>
            </Link>
            <Link to="/super-admin/analytics" className="block p-4 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
              <div className="font-bold text-sm text-slate-800 dark:text-zinc-200">View Analytics Report</div>
              <div className="text-xs text-slate-500 mt-1">Detailed breakdown of efficiency savings.</div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
