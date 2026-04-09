import React, { useState } from 'react';
import { useApp } from '@/App';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Fuel, Phone, AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Trip } from '@/types';

export function DriverDashboard() {
  const { user, trips, setTrips } = useApp();
  // Find current trip assigned to this driver
  const myTrip = trips.find(t => t.driverId === user.id && t.status !== 'DELIVERED' && t.status !== 'CANCELLED');
  const [showDetails, setShowDetails] = useState(false);

  // If Mike Road, trip t1 is STARTED. If Dave Lane, trip t2 is PENDING.
  
  const handleStatusUpdate = (newStatus: Trip['status']) => {
    if (myTrip) {
      setTrips(prev => prev.map(t => t.id === myTrip.id ? { ...t, status: newStatus } : t));
    }
  };

  if (!myTrip) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-black">All Done!</h2>
        <p className="text-slate-500 font-medium max-w-sm">You have no active trip assignments. Rest up or contact dispatch.</p>
        <Button className="mt-8 px-8 font-bold text-white bg-slate-900 border-none shadow-none hover:bg-slate-800">
          Sync with Dispatch
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-full pb-20 pt-4 flex flex-col">
      {/* Driver Header / AI Alerts */}
      <div className="mb-6 px-2 text-center">
        <h1 className="text-xl font-bold tracking-tight">Active Assignment</h1>
        <p className="text-slate-500 text-xs font-semibold uppercase">{myTrip.truckId}</p>
      </div>

      {myTrip.aiSuggestedRoute && (
        <div className="mx-2 mb-6 bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-600/30">
          <div className="flex items-center gap-2 mb-2 font-bold select-none">
            <Navigation size={18} fill="currentColor" /> Reroute Notice
          </div>
          <p className="text-sm font-medium opacity-90 leading-snug">
            {myTrip.aiSuggestedRoute}
          </p>
        </div>
      )}

      {/* Main Job Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-zinc-800 mx-2 flex-1">
        
        <div className="flex justify-between items-start mb-6">
          <Badge className={cn(
            "text-xs px-3 py-1 font-black uppercase shadow-none border-none",
            myTrip.status === 'PENDING' ? "bg-amber-100 text-amber-700" :
            myTrip.status === 'STARTED' ? "bg-blue-100 text-blue-700" :
            myTrip.status === 'LOADED' ? "bg-purple-100 text-purple-700" : "bg-slate-100"
          )}>
            {myTrip.status}
          </Badge>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Est. Delivery</div>
            <div className="font-black text-lg text-slate-900 dark:text-zinc-100">{myTrip.eta}</div>
          </div>
        </div>

        <div className="relative pl-6 space-y-6">
          <div className="absolute left-1.5 top-2 bottom-4 w-1 bg-slate-100 dark:bg-zinc-800 rounded-full"></div>
          
          <div className="relative">
            <div className={cn(
              "absolute -left-[27px] top-1 w-4 h-4 rounded-full border-4 border-white dark:border-zinc-900",
              myTrip.status !== 'PENDING' ? "bg-blue-500" : "bg-slate-300 dark:bg-zinc-700"
            )}></div>
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Pickup</div>
            <div className="font-bold text-lg leading-tight">{myTrip.origin}</div>
            <div className="text-xs text-slate-500 mt-1">{myTrip.originAddress}</div>
          </div>

          <div className="relative">
            <div className={cn(
              "absolute -left-[27px] top-1 w-4 h-4 rounded-full border-4 border-white dark:border-zinc-900",
              myTrip.status === 'LOADED' || myTrip.status === 'DELIVERED' ? "bg-purple-500" : "bg-slate-300 dark:bg-zinc-700"
            )}></div>
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Drop-off</div>
            <div className="font-bold text-lg leading-tight">{myTrip.destination}</div>
            <div className="text-xs text-slate-500 mt-1">{myTrip.destinationAddress}</div>
          </div>
        </div>

        {/* Expandable Details */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <button 
            className="w-full flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-300"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span>View Load Details</span>
            <ChevronDown size={18} className={cn("transition-transform", showDetails && "rotate-180")} />
          </button>
          
          {showDetails && (
            <div className="mt-4 space-y-3 bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-1.5"><Fuel size={14}/> Fuel Type</span>
                <span className="font-bold">{myTrip.fuelType}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-1.5"><Fuel size={14}/> Volume</span>
                <span className="font-bold text-blue-600">{myTrip.liters.toLocaleString()} Liters</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 flex items-center gap-1.5"><Phone size={14}/> Terminal Contact</span>
                <a href="tel:5550192" className="font-bold text-blue-600">(555) 012-3941</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Fixed to Bottom on Mobile */}
      <div className="fixed bottom-[4.5rem] md:bottom-auto md:relative md:mt-6 left-0 right-0 px-4 md:px-0">
        <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-4 md:p-0 border-t md:border-none border-slate-200 dark:border-zinc-800 flex gap-3">
          
          <Button variant="outline" size="lg" className="w-14 h-14 shrink-0 rounded-full bg-white text-red-500 border-slate-200 hover:bg-red-50 hover:text-red-600">
            <AlertTriangle size={20} />
          </Button>

          {myTrip.status === 'PENDING' && (
            <Button size="lg" className="flex-1 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-black shadow-lg shadow-blue-500/20 text-white"
              onClick={() => handleStatusUpdate('STARTED')}>
              Start Trip
            </Button>
          )}

          {myTrip.status === 'STARTED' && (
            <Button size="lg" className="flex-1 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-lg font-black shadow-lg shadow-purple-500/20 text-white"
              onClick={() => handleStatusUpdate('LOADED')}>
              Mark Loaded
            </Button>
          )}

          {myTrip.status === 'LOADED' && (
            <Button size="lg" className="flex-1 h-14 rounded-full bg-green-600 hover:bg-green-700 text-lg font-black shadow-lg shadow-green-500/20 text-white"
              onClick={() => handleStatusUpdate('DELIVERED')}>
              Complete Delivery
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}
