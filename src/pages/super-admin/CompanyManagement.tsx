import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MoreVertical, 
  Plus,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '@/App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Company } from '@/types';

export function CompanyManagement() {
  const { companies } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Company Management</h1>
          <p className="text-slate-500 text-sm">Manage client companies, access levels, and configurations.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold gap-2 whitespace-nowrap">
          <Plus size={18} />
          Add New Company
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Search companies by name or region..." 
              className="pl-9 h-9 bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            {filteredCompanies.length} Total
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-zinc-900 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-bold">Company Name</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">Active Assets</th>
                <th className="px-6 py-4 font-bold text-center">Efficiency</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-zinc-800 flex items-center justify-center border border-blue-100 dark:border-zinc-700 shrink-0">
                        <Building2 size={20} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-zinc-100">{company.name}</div>
                        <div className="text-xs text-slate-500 max-w-[200px] truncate">{company.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {company.status === 'ACTIVE' && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2 py-0.5 gap-1.5 font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        Active
                      </Badge>
                    )}
                    {company.status === 'WARNING' && (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-2 py-0.5 gap-1.5 font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                        Warning
                      </Badge>
                    )}
                    {company.status === 'CRITICAL' && (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none px-2 py-0.5 gap-1.5 font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        Critical
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-4 text-xs font-semibold">
                      <div className="flex flex-col items-center">
                        <span className="text-slate-900 dark:text-zinc-100">{company.metrics.activeTrucks}</span>
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider">Trucks</span>
                      </div>
                      <div className="w-px h-6 bg-slate-200 dark:bg-zinc-800"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-slate-900 dark:text-zinc-100">{company.metrics.activeDrivers}</span>
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider">Drivers</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={cn(
                        "font-black text-sm",
                        company.metrics.efficiency >= 90 ? "text-green-600" :
                        company.metrics.efficiency >= 80 ? "text-amber-600" : "text-red-600"
                      )}>
                        {company.metrics.efficiency}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 dark:hover:text-zinc-100">
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
              
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-400" />
                    No companies found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
