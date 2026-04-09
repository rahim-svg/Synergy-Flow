import React, { useState } from 'react';
import { useApp } from '@/App';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, GripVertical, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Trip } from '@/types';

export function TripManagement() {
  const { trips, drivers } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');

  const filteredTrips = trips.filter(t => {
    if (activeTab === 'PENDING') return t.status === 'PENDING';
    if (activeTab === 'IN_PROGRESS') return t.status === 'STARTED' || t.status === 'LOADED';
    if (activeTab === 'COMPLETED') return t.status === 'DELIVERED';
    return true; // ALL
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trip Management</h1>
          <p className="text-slate-500 text-sm">Assign drivers, monitor ETAs, and resolve AI alerts.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold">
          Create Manual Trip
        </Button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-zinc-800 pb-[1px] overflow-x-auto">
        {(['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab 
                ? "border-blue-600 text-blue-600 dark:text-blue-400" 
                : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-zinc-100"
            )}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filteredTrips.map(trip => {
          const driver = drivers.find(d => d.id === trip.driverId);
          return (
            <Card key={trip.id} className="border-none shadow-sm hover:shadow-md transition-shadow group relative flex flex-col md:flex-row bg-white dark:bg-zinc-950">
              <div className="hidden md:flex items-center px-4 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 transition-colors">
                <GripVertical size={20} />
              </div>
              
              <CardContent className="p-4 md:pl-0 flex-1 flex flex-col md:flex-row gap-6">
                
                {/* Trip Core Info */}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                    <span className="font-bold text-lg">{trip.truckId}</span>
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-bold border-none px-2 py-0.5 rounded-full uppercase",
                      trip.status === 'PENDING' ? "bg-amber-100 text-amber-700" :
                      trip.status === 'DELIVERED' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {trip.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 relative">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold">{trip.origin}</div>
                        <div className="text-xs text-slate-500">{trip.originAddress}</div>
                      </div>
                    </div>
                    <div className="w-0.5 h-4 ml-1.5 bg-slate-200 dark:bg-zinc-800 my-1"></div>
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-slate-600 dark:text-slate-300 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold">{trip.destination}</div>
                        <div className="text-xs text-slate-500">{trip.destinationAddress}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-center space-y-3 min-w-[150px] border-t md:border-t-0 md:border-l border-slate-100 dark:border-zinc-800 pt-4 md:pt-0 md:pl-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5"><Truck size={14}/> Driver</span>
                    <span className={cn("font-bold", !driver && "text-amber-500")}>{driver?.name || 'Unassigned'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Fuel Required</span>
                    <span className="font-bold">{trip.liters.toLocaleString()}L <span className="text-xs text-slate-400">({trip.fuelType})</span></span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5"><Clock size={14}/> ETA</span>
                    <span className="font-bold text-slate-900 dark:text-zinc-100">{trip.eta}</span>
                  </div>
                </div>

                {/* Actions / AI Adjustments */}
                <div className="md:w-[220px] shrink-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-zinc-800 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center gap-2">
                  {trip.estimatedDelayMins && trip.estimatedDelayMins > 0 ? (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-2.5 text-xs">
                      <div className="font-bold text-red-600 flex items-center gap-1.5 mb-1">
                        <AlertTriangle size={14} /> {trip.estimatedDelayMins}m Delay
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">AI auto-rerouting is actively suppressing an additional 15m delay.</p>
                      <Button size="sm" variant="outline" className="w-full mt-2 h-7 text-[10px] bg-white border-red-200 text-red-600 hover:bg-red-50">Force Reroute</Button>
                    </div>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" className="w-full font-semibold">
                        Edit Trip Details
                      </Button>
                      {trip.status === 'PENDING' && (
                        <Button size="sm" className="w-full bg-slate-900 dark:bg-white dark:text-black hover:bg-slate-800 font-bold">
                          Assign & Dispatch
                        </Button>
                      )}
                      {trip.status !== 'PENDING' && trip.status !== 'DELIVERED' && (
                        <Button size="sm" variant="ghost" className="w-full font-semibold text-slate-500 hover:text-slate-900">
                          View Live on Map
                        </Button>
                      )}
                    </>
                  )}
                </div>

              </CardContent>
            </Card>
          );
        })}
        {filteredTrips.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No trips found in this category.
          </div>
        )}
      </div>

    </div>
  );
}
