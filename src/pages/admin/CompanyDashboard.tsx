import React from 'react';
import { useApp } from '@/App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Map, Truck, Activity, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function CompanyDashboard() {
  const { user, companies, trips } = useApp();
  const company = companies.find(c => c.id === user.companyId);

  if (!company) return <div>No company context found for this user.</div>;

  const activeTrips = trips.filter(t => t.status === 'STARTED' || t.status === 'LOADED');
  const delayedTrips = activeTrips.filter(t => t.estimatedDelayMins && t.estimatedDelayMins > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{company.name} Hub</h1>
          <p className="text-slate-500 text-sm">{company.address}</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
            <CheckCircle2 size={16} /> Operational
          </div>
        </div>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase">Active Trucks</CardDescription>
            <CardTitle className="text-3xl font-black">{company.metrics.activeTrucks}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase">Available Drivers</CardDescription>
            <CardTitle className="text-3xl font-black">{company.metrics.activeDrivers}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-900/10">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase text-blue-600">Company Efficiency</CardDescription>
            <CardTitle className="text-3xl font-black text-blue-700">{company.metrics.efficiency}%</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase">Trips in Progress</CardDescription>
            <CardTitle className="text-3xl font-black">{activeTrips.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Savings from Synergy AI */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="text-green-500" size={20}/> Cost Savings Summary</CardTitle>
            <CardDescription>Synergy AI savings for current month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <span className="font-medium text-slate-700 dark:text-slate-300">Route Optimizations</span>
              <span className="font-bold text-green-600">+$2,450.00</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <span className="font-medium text-slate-700 dark:text-slate-300">Supplier Sourcing Adjustments</span>
              <span className="font-bold text-green-600">+$4,120.00</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <span className="font-medium text-slate-700 dark:text-slate-300">Fuel Efficiency</span>
              <span className="font-bold text-green-600">+$890.00</span>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center">
              <span className="font-bold uppercase text-sm">Total Saved</span>
              <span className="font-black text-xl text-green-600">$7,460.00</span>
            </div>
          </CardContent>
        </Card>

        {/* Live Trip Warnings */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="text-blue-500" size={20}/> Trip Exceptions</CardTitle>
            <CardDescription>Active delays or issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {delayedTrips.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500" />
                <p>No active exceptions. All trips nominal.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {delayedTrips.map(trip => (
                  <div key={trip.id} className="p-3 border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-900 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={16} />
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-zinc-100">Truck {trip.truckId} Delayed</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Heading to {trip.destination}. Estimated delay: <span className="font-bold text-red-500">{trip.estimatedDelayMins} mins</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
