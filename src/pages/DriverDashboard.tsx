import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Camera, 
  AlertTriangle, 
  Phone, 
  MessageSquare,
  ChevronRight,
  Fuel,
  Info,
  ArrowRight,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { useApp } from '@/App';

export function DriverDashboard() {
  const { user, trips, setTrips } = useApp();
  const myTrip = trips.find(t => t.driverId === user.id && t.status !== 'DELIVERED' && t.status !== 'CANCELLED') || {
      id: 'AT-502',
      origin: 'Houston Terminal B',
      destination: 'Austin Station #4',
      liters: 15000,
      fuelType: 'Diesel B20',
      status: 'PENDING'
  };
  const [step, setStep] = useState(0); // 0: Next Trip, 1: Arrived, 2: Loading, 3: En Route, 4: Delivered
  const [showSafety, setShowSafety] = useState(true);

  const steps = [
    { label: 'Upcoming Trip', action: 'Start Trip', color: 'bg-blue-600' },
    { label: 'At Terminal', action: 'Arrived at Terminal', color: 'bg-amber-500' },
    { label: 'Loading Fuel', action: 'Loading Complete', color: 'bg-purple-600' },
    { label: 'En Route', action: 'Delivered', color: 'bg-green-600' },
    { label: 'Completed', action: 'Back to Dashboard', color: 'bg-slate-600' },
  ];

  const currentStep = steps[step];

  return (
    <div className="max-w-md mx-auto h-full flex flex-col gap-6 pb-20">
      {/* Safety Alert Pop-up (Simulated) */}
      <AnimatePresence>
        {showSafety && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-x-4 top-20 z-50"
          >
            <Card className="bg-red-600 text-white border-none shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <ShieldAlert size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Safety Protocol</h3>
                    <p className="text-sm text-red-100 leading-tight mb-4">
                      Hazardous Material (Class 3 Flammable) detected. Ensure static grounding and vapor recovery are engaged before loading.
                    </p>
                    <Button 
                      className="w-full bg-white text-red-600 font-bold hover:bg-red-50"
                      onClick={() => setShowSafety(false)}
                    >
                      I Understand & Comply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Focus Mode</h1>
          <div className="flex items-center gap-2 text-slate-500 font-bold text-sm uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Active Duty • TR-901
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-blue-600">04:22</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">HOS Remaining</div>
        </div>
      </div>

      {/* Main Trip Card */}
      <Card className="border-none shadow-xl overflow-hidden bg-white dark:bg-zinc-900">
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-start">
            <Badge className="bg-blue-100 text-blue-700 font-bold px-3 py-1">{myTrip.id}</Badge>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock size={16} />
              <span className="text-sm font-bold">ETA 14:45</span>
            </div>
          </div>

          <div className="relative space-y-12">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-zinc-800" />
            
            <div className="relative flex items-start gap-6">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 z-10">
                <MapPin size={16} className="text-slate-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pickup</div>
                <div className="text-xl font-bold leading-tight">{myTrip.origin}</div>
                <div className="text-sm text-slate-500">Scheduled loading</div>
              </div>
            </div>

            <div className="relative flex items-start gap-6">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 z-10 shadow-lg shadow-blue-500/30">
                <Navigation size={16} className="text-white" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Destination</div>
                <div className="text-xl font-bold leading-tight text-blue-600">{myTrip.destination}</div>
                <div className="text-sm text-slate-500">Standard drop-off</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                <Fuel size={18} className="text-slate-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Load</div>
                <div className="text-sm font-bold">{myTrip.liters.toLocaleString()}L</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                <Info size={18} className="text-slate-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Type</div>
                <div className="text-sm font-bold">{myTrip.fuelType}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Area */}
      <div className="flex flex-col gap-4">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <Button 
            className={cn(
              "w-full h-24 text-2xl font-black rounded-3xl shadow-2xl transition-all flex flex-col items-center justify-center gap-1",
              currentStep.color
            )}
            onClick={() => setStep((s) => (s + 1) % steps.length)}
          >
            <span className="text-sm opacity-70 uppercase tracking-widest">{currentStep.label}</span>
            <div className="flex items-center gap-3">
              {currentStep.action}
              <ArrowRight size={24} />
            </div>
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" className="h-16 rounded-2xl border-2 border-slate-200 dark:border-zinc-800 font-bold gap-2">
                  <Camera size={20} className="text-slate-400" />
                  Report Issue
                </Button>
              }
            />
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Exception Reporting</DialogTitle>
                <DialogDescription>
                  Document any discrepancies or vehicle issues. Photos are automatically geotagged.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="h-48 bg-slate-100 dark:bg-zinc-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-700 cursor-pointer hover:bg-slate-50 transition-colors">
                  <Camera size={48} className="text-slate-300 mb-2" />
                  <span className="text-sm font-bold text-slate-400">Tap to Take Photo</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="text-xs">Fuel Discrepancy</Button>
                  <Button variant="outline" className="text-xs">Vehicle Issue</Button>
                  <Button variant="outline" className="text-xs">Terminal Delay</Button>
                  <Button variant="outline" className="text-xs">Other</Button>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full bg-blue-600">Submit Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="h-16 rounded-2xl border-2 border-slate-200 dark:border-zinc-800 font-bold gap-2">
            <Phone size={20} className="text-slate-400" />
            Contact Ops
          </Button>
        </div>
      </div>

      {/* Bottom Navigation (Mobile Style) */}
      <div className="fixed bottom-0 inset-x-0 h-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-zinc-800 flex items-center justify-around px-6 z-40">
        <div className="flex flex-col items-center gap-1 text-blue-600">
          <Navigation size={24} />
          <span className="text-[10px] font-bold uppercase">Trip</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <MessageSquare size={24} />
          <span className="text-[10px] font-bold uppercase">Chat</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <Clock size={24} />
          <span className="text-[10px] font-bold uppercase">Logs</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <User size={24} />
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </div>
      </div>
    </div>
  );
}
