import React, { useState } from 'react';
import { useApp } from '@/App';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Truck,
  Search,
  Filter,
  MapPin,
  Clock,
  Fuel,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Phone,
  MessageSquare,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function FleetManagement() {
  const { drivers, trips } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'AVAILABLE' | 'ON_TRIP' | 'OFFLINE'>('ALL');

  const filteredDrivers = drivers.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    AVAILABLE: drivers.filter((d) => d.status === 'AVAILABLE').length,
    ON_TRIP: drivers.filter((d) => d.status === 'ON_TRIP').length,
    OFFLINE: drivers.filter((d) => d.status === 'OFFLINE').length,
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return { color: 'bg-green-100 text-green-700', dot: 'bg-green-500', icon: CheckCircle2 };
      case 'ON_TRIP':
        return { color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', icon: Navigation };
      case 'OFFLINE':
        return { color: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400', icon: WifiOff };
      default:
        return { color: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400', icon: WifiOff };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fleet Management</h1>
          <p className="text-slate-500 text-sm">Monitor driver status, vehicle health, and real-time locations.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold gap-2 whitespace-nowrap">
          <Truck size={18} />
          Add Vehicle
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Drivers', value: drivers.length, icon: Truck, color: 'text-slate-700', bg: 'bg-slate-50' },
          { label: 'Available', value: counts.AVAILABLE, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'On Trip', value: counts.ON_TRIP, icon: Navigation, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Offline', value: counts.OFFLINE, icon: WifiOff, color: 'text-slate-400', bg: 'bg-slate-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={cn('p-3 rounded-xl', stat.bg)}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input
            placeholder="Search drivers by name..."
            className="pl-9 h-9 bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {(['ALL', 'AVAILABLE', 'ON_TRIP', 'OFFLINE'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border',
                statusFilter === status
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-zinc-900 text-slate-500 border-slate-200 dark:border-zinc-800 hover:border-blue-300'
              )}
            >
              {status.replace('_', ' ')}
              {status !== 'ALL' && (
                <span className="ml-1.5 opacity-70">
                  ({status === 'AVAILABLE' ? counts.AVAILABLE : status === 'ON_TRIP' ? counts.ON_TRIP : counts.OFFLINE})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Table */}
      <div className="grid gap-3">
        {filteredDrivers.map((driver) => {
          const statusConfig = getStatusConfig(driver.status);
          const activeTrip = trips.find((t) => t.driverId === driver.id && t.status !== 'DELIVERED' && t.status !== 'CANCELLED');
          const hosHours = Math.floor(driver.hosMins / 60);
          const hosMinsLeft = driver.hosMins % 60;
          const hosPercent = Math.min(100, (driver.hosMins / (14 * 60)) * 100);

          return (
            <Card key={driver.id} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-950">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  {/* Driver Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative shrink-0">
                      <Avatar className="h-11 w-11 border-2 border-slate-100 dark:border-zinc-800">
                        <AvatarImage src={driver.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-sm">
                          {driver.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={cn('absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900', statusConfig.dot)} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-zinc-100 truncate">{driver.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge className={cn('text-[10px] py-0 px-2 border-none font-bold', statusConfig.color)}>
                          {driver.status.replace('_', ' ')}
                        </Badge>
                        {activeTrip && (
                          <span className="text-xs text-slate-500 truncate">→ {activeTrip.destination}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Fuel Level */}
                  <div className="flex-1 space-y-1 min-w-[120px]">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Fuel size={12} /> Fuel</span>
                      <span className={driver.fuelLevel < 20 ? 'text-red-500' : 'text-slate-600 dark:text-zinc-300'}>
                        {driver.fuelLevel}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', driver.fuelLevel < 20 ? 'bg-red-500' : 'bg-blue-500')}
                        style={{ width: `${driver.fuelLevel}%` }}
                      />
                    </div>
                  </div>

                  {/* HOS */}
                  <div className="flex-1 space-y-1 min-w-[120px]">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Clock size={12} /> HOS Left</span>
                      <span className={hosHours < 2 ? 'text-amber-500' : 'text-slate-600 dark:text-zinc-300'}>
                        {hosHours}h {hosMinsLeft}m
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', hosHours < 2 ? 'bg-amber-500' : 'bg-green-500')}
                        style={{ width: `${hosPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Location & Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {driver.currentLocation ? (
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-50 dark:bg-zinc-900 px-2 py-1 rounded-lg border border-slate-100 dark:border-zinc-800">
                        <Wifi size={12} className="text-green-500" />
                        <span className="font-mono">{driver.currentLocation.lat.toFixed(2)}, {driver.currentLocation.lng.toFixed(2)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-slate-400 font-medium bg-slate-50 dark:bg-zinc-900 px-2 py-1 rounded-lg border border-slate-100 dark:border-zinc-800">
                        <WifiOff size={12} />
                        <span>Offline</span>
                      </div>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                      <MessageSquare size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                      <Phone size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>

                {/* Active Trip Banner */}
                {activeTrip && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 flex-1">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">
                        <span className="font-semibold">{activeTrip.truckId}</span> · {activeTrip.origin} → {activeTrip.destination}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-[80px]">
                        <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${activeTrip.progress}%` }} />
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 text-right">{activeTrip.progress}% complete</div>
                      </div>
                      {activeTrip.estimatedDelayMins && activeTrip.estimatedDelayMins > 0 ? (
                        <Badge className="bg-red-100 text-red-700 border-none text-[10px] shrink-0 flex items-center gap-1">
                          <AlertTriangle size={10} />
                          +{activeTrip.estimatedDelayMins}m delay
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 border-none text-[10px] shrink-0">
                          On Time
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {filteredDrivers.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            <Truck size={40} className="mx-auto mb-4 text-slate-300" />
            <p className="font-bold">No drivers found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
