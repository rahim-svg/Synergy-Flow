import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Map as MapIcon, Crosshair, Filter, Truck, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { useApp } from '@/App';

export function DispatcherMap() {
  const { trips, drivers, setTrips } = useApp();
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const activeTrips = trips.filter(t => t.status !== 'DELIVERED' && t.status !== 'CANCELLED');
  const details = selectedTrip ? activeTrips.find(t => t.id === selectedTrip) : null;

  return (
    <div className="h-[calc(100vh-6rem)] -m-4 md:-m-6 flex flex-col md:flex-row relative bg-slate-100 dark:bg-zinc-950 overflow-hidden">
      
      {/* Sidebar Overlay for Map */}
      <div className="w-full md:w-80 lg:w-96 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col z-10 shadow-lg h-1/2 md:h-full overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-zinc-800 flex flex-col gap-3 shrink-0">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <MapIcon className="text-blue-600" size={20} />
            Live Dispatch Map
          </h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <Input placeholder="Search truck or driver..." className="pl-8 h-8 text-xs bg-slate-50 dark:bg-zinc-800/50" />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
              <Filter size={14} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {activeTrips.map(trip => {
            const driverInfo = drivers.find(d => d.id === trip.driverId);
            return (
              <div 
                key={trip.id} 
                onClick={() => setSelectedTrip(trip.id)}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all w-full text-left",
                  selectedTrip === trip.id 
                    ? "bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800 shadow-sm" 
                    : "bg-white border-slate-100 hover:border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-sm tracking-tight">{trip.truckId}</div>
                  <Badge variant="outline" className={cn(
                    "text-[10px] font-bold border-none px-1.5 py-0",
                    trip.priority === 'HIGH' ? "bg-red-50 text-red-600" :
                    trip.status === 'STARTED' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"
                  )}>
                    {trip.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="font-medium truncate w-[100px]">{trip.origin.split(' ')[0]}...</span>
                  <ArrowRight size={10} className="text-slate-400 shrink-0" />
                  <span className="font-medium truncate w-[100px]">{trip.destination.split(' ')[0]}...</span>
                </div>

                <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    <Truck size={12} className="text-blue-500" />
                    {driverInfo?.name || 'Unassigned'}
                  </div>
                  <div>ETA: <span className="font-bold">{trip.eta}</span></div>
                </div>
                
                {trip.estimatedDelayMins && trip.estimatedDelayMins > 0 && (
                  <div className="mt-2 text-[10px] font-bold text-red-600 flex items-center gap-1 bg-red-50 dark:bg-red-900/10 px-2 py-1 rounded">
                    <AlertTriangle size={10} />
                    {trip.estimatedDelayMins}m Delay Detected
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-[#e5e3df] dark:bg-[#1a1b1e] w-full min-h-[50vh] md:min-h-full">
        {/* Mock Map Background SVG Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83 10.04L60 10.52v24.96l-5.323.51-.762 9.21L60 45.69v14.31H0V45.68l6.085-.49.762-9.21L0 35.48V10.52l5.459-.52.83-10.04H54.627zM28.09 51.52l4.89-2.02L32 46.48l-4.89 2.02.98 3.02zm-6.26-11.45l-4.14-5.3-3.66 2.86 4.14 5.3 3.66-2.86zm19.98-5.3l-4.14 5.3 3.66 2.86 4.14-5.3-3.66-2.86zm-17.5-6.52l-5.69-1.92-1.02 3.02 5.69 1.92 1.02-3.02zm12.38-1.92l-5.69 1.92 1.02 3.02 5.69-1.92-1.02-3.02zm-12.72-8.5l-2.02-4.89-3.02.98 2.02 4.89 3.02-.98zm11.54-4.89l-2.02 4.89 3.02.98 2.02-4.89-3.02-.98z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button variant="secondary" size="icon" className="shadow-lg h-10 w-10 bg-white dark:bg-zinc-800 rounded-xl">
            <Crosshair size={18} />
          </Button>
        </div>

        {/* Mock Pins */}
        <div className="absolute top-1/3 left-1/4">
          <div className="relative group cursor-pointer" onClick={() => setSelectedTrip('t1')}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg transition-transform",
              selectedTrip === 't1' ? "bg-blue-600 scale-125 ring-4 ring-blue-600/30" : "bg-black dark:bg-white dark:text-black hover:scale-110"
            )}>
              <Truck size={14} />
            </div>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-2 py-1 rounded shadow-lg border border-slate-100 dark:border-zinc-700 whitespace-nowrap z-10 font-bold text-[10px]">
              TRK-902
            </div>
          </div>
        </div>

        <div className="absolute top-2/3 left-[60%]">
          <div className="relative group cursor-pointer" onClick={() => setSelectedTrip('t2')}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg transition-transform",
              selectedTrip === 't2' ? "bg-blue-600 scale-125 ring-4 ring-blue-600/30" : "bg-slate-500 hover:scale-110"
            )}>
              <Truck size={14} />
            </div>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-2 py-1 rounded shadow-lg border border-slate-100 dark:border-zinc-700 whitespace-nowrap z-10 font-bold text-[10px]">
              TRK-304
            </div>
          </div>
        </div>
        
        {/* Detail Panel overlay if selected */}
        {details && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:w-80 lg:w-96 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-4 border border-slate-200 dark:border-zinc-800 z-20 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-black text-lg">{details.truckId}</h3>
                <p className="text-xs text-slate-500 font-medium">Driver: <span className="text-slate-900 dark:text-zinc-100 font-bold">{drivers.find(d => d.id === details.driverId)?.name}</span></p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mr-2 -mt-2" onClick={() => setSelectedTrip(null)}>
                <Crosshair size={14} className="rotate-45" />
              </Button>
            </div>
            
            <div className="space-y-4 text-sm mt-4 border-t pt-4 border-slate-100 dark:border-zinc-800">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current Route</div>
                <div className="font-semibold">{details.origin}</div>
                <div className="h-4 border-l-2 border-dashed border-slate-300 dark:border-zinc-700 ml-2 my-1"></div>
                <div className="font-semibold">{details.destination}</div>
              </div>

              {details.aiSuggestedRoute && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <div className="text-[10px] uppercase font-black tracking-wider text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                    <Zap size={12} fill="currentColor" /> AI Recommendation Active
                  </div>
                  <div className="font-semibold text-blue-900 dark:text-blue-100 text-xs">
                    {details.aiSuggestedRoute}
                  </div>
                </div>
              )}
            </div>

            <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 font-bold">
              Message Driver
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
