import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  User, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare, 
  Search, 
  Filter,
  MoreVertical,
  Navigation,
  Fuel,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';



import { useApp } from '@/App';

export function DispatcherMap() {
  const { trips, drivers, setTrips } = useApp();
  const [activeTab, setActiveTab] = useState<'queue' | 'fleet'>('queue');
  const [searchQuery, setSearchQuery] = useState('');

  const UNASSIGNED_TRIPS = trips.filter(t => t.status === 'PENDING').map(t => ({
    id: t.id,
    origin: t.origin,
    dest: t.destination,
    liters: t.liters,
    type: t.fuelType,
    priority: t.priority || 'MEDIUM',
    ai_score: 95
  }));

  const FLEET = drivers.map(d => ({
    id: d.id,
    name: d.name,
    truck: 'TR-' + Math.floor(Math.random() * 900 + 100),
    status: d.status,
    fuel: 85,
    hos: 6.5,
    avatar: 'https://i.pravatar.cc/150?u=' + d.id
  }));

  const ACTIVE_TRIPS = trips.filter(t => t.status !== 'PENDING' && t.status !== 'DELIVERED').map((t, idx) => ({
    id: t.id,
    driver: drivers.find(d => d.id === t.driverId)?.name || 'Unknown',
    progress: t.status === 'STARTED' ? 20 : t.status === 'LOADED' ? 70 : 100,
    status: (t.estimatedDelayMins && t.estimatedDelayMins > 0) ? 'DELAYED' : 'ON_TIME',
    lat: 30 + idx * 10,
    lng: 40 + idx * 15,
    delayMsg: t.estimatedDelayMins ? `+${t.estimatedDelayMins}m Delay` : '',
    aiRecommendation: t.aiSuggestedRoute || ''
  }));

  const focusTrip = ACTIVE_TRIPS[ACTIVE_TRIPS.length - 1] || { id: 'T-000', driver: 'Unknown', status: 'ON_TIME', delayMsg: '', progress: 0 };


  return (
    <div className="h-full flex flex-col gap-6">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Trips', value: '24', icon: Navigation, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Available Drivers', value: '12', icon: User, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending AI Plans', value: '8', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Critical Alerts', value: '2', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
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

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left Sidebar: Dispatch Board */}
        <div className="w-full lg:w-80 flex flex-col gap-4 min-h-0">
          <Card className="flex-1 flex flex-col border-none shadow-sm overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-lg font-bold">Dispatch Board</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter size={16} />
                </Button>
              </div>
              <div className="flex p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg">
                <button 
                  onClick={() => setActiveTab('queue')}
                  className={cn(
                    "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                    activeTab === 'queue' ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-slate-500"
                  )}
                >
                  Unassigned ({UNASSIGNED_TRIPS.length})
                </button>
                <button 
                  onClick={() => setActiveTab('fleet')}
                  className={cn(
                    "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                    activeTab === 'fleet' ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-slate-500"
                  )}
                >
                  Fleet ({FLEET.length})
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
                <AnimatePresence mode="wait">
                  {activeTab === 'queue' ? (
                    <motion.div 
                      key="queue"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-3"
                    >
                      {UNASSIGNED_TRIPS.map((trip) => (
                        <div 
                          key={trip.id} 
                          className="p-3 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all cursor-pointer group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant={trip.priority === 'HIGH' ? 'destructive' : 'secondary'} className="text-[10px] h-5">
                              {trip.priority}
                            </Badge>
                            <div className="flex items-center gap-1 text-blue-600 font-bold text-xs">
                              <Zap size={12} />
                              {trip.ai_score}% Match
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              <span className="text-xs font-medium truncate">{trip.origin}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                              <span className="text-xs font-bold truncate">{trip.dest}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                              <Fuel size={12} />
                              {trip.liters.toLocaleString()}L {trip.type}
                            </div>
                            <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700">Assign</Button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="fleet"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-3"
                    >
                      {FLEET.map((driver) => (
                        <div 
                          key={driver.id} 
                          className="p-3 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={driver.avatar} />
                              <AvatarFallback>{driver.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold truncate">{driver.name}</div>
                              <div className="text-[10px] text-slate-500 font-medium">{driver.truck}</div>
                            </div>
                            <Badge className={cn(
                              "text-[10px] h-5",
                              driver.status === 'AVAILABLE' ? "bg-green-100 text-green-700" : 
                              driver.status === 'ON_TRIP' ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                            )}>
                              {driver.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">Fuel</div>
                              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                                <div className={cn("h-full", driver.fuel < 20 ? "bg-red-500" : "bg-blue-500")} style={{ width: `${driver.fuel}%` }} />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">HOS</div>
                              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                                <div className={cn("h-full", driver.hos > 10 ? "bg-amber-500" : "bg-green-500")} style={{ width: `${(driver.hos / 14) * 100}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <Card className="flex-1 border-none shadow-sm overflow-hidden relative bg-slate-100 dark:bg-zinc-900">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 1000 1000">
                <path d="M0 200 L1000 200 M0 500 L1000 500 M0 800 L1000 800 M200 0 L200 1000 M500 0 L500 1000 M800 0 L800 1000" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M100 100 Q 300 150 500 100 T 900 150" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M150 800 Q 400 700 600 850 T 850 750" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Map UI Overlays */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="bg-white dark:bg-zinc-800 p-1 rounded-lg shadow-lg flex flex-col gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Navigation size={16} /></Button>
                <Separator />
                <Button variant="ghost" size="icon" className="h-8 w-8"><MapPin size={16} /></Button>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold">Live Traffic: Normal</span>
              </div>
            </div>

            {/* Mock Truck Markers */}
            {ACTIVE_TRIPS.map((trip) => (
              <motion.div 
                key={trip.id}
                className="absolute cursor-pointer group"
                style={{ left: `${trip.lng}%`, top: `${trip.lat}%` }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-2 border-white dark:border-zinc-800",
                    trip.status === 'DELAYED' ? "bg-red-500" : "bg-blue-600"
                  )}>
                    <Truck size={18} className="text-white" />
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-2 py-1 rounded shadow-lg border border-slate-100 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] font-bold">{trip.driver}</div>
                    <div className="text-[8px] text-slate-500">{trip.progress}% Complete</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map Legend / Bottom Info */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="flex gap-2">
                <Card className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-none shadow-xl p-3 w-64">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold">Active Trip: {focusTrip.id}</span>
                    <Badge variant="outline" className={cn("text-[9px]", focusTrip.status === 'DELAYED' ? "text-red-500 border-red-200 bg-red-50" : "text-blue-500 border-blue-200 bg-blue-50")}>
                      {focusTrip.status}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">Destination ETA</span>
                      <span className={cn("font-bold", focusTrip.status === 'DELAYED' ? "text-red-500" : "text-blue-500")}>{focusTrip.delayMsg || 'On track'}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all" style={{ width: `${focusTrip.progress}%` }} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[8px]">{focusTrip.driver[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] font-medium">{focusTrip.driver}</span>
                      <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto">
                        <MessageSquare size={12} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm p-2 rounded-lg shadow-xl border border-white/20">
                  <div className="text-[10px] font-bold mb-2">Weather Alerts</div>
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle size={14} />
                    <span className="text-[9px] font-medium">Storm Warning: Austin Area</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Bottom Row: Communication & Alerts */}
          <div className="h-48 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm overflow-hidden flex flex-col">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <MessageSquare size={16} className="text-blue-600" />
                  Ops Communication
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">4 New</Badge>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full px-4 pb-4">
                  <div className="space-y-3">
                    {[
                      { user: 'Marcus Chen', msg: 'Arrived at Houston Terminal. Loading now.', time: '2m ago' },
                      { user: 'Elena Rodriguez', msg: 'Traffic heavy on I-35. Expect 10m delay.', time: '5m ago' },
                      { user: 'System AI', msg: 'New route optimization available for AT-501.', time: '12m ago', ai: true },
                    ].map((chat, i) => (
                      <div key={i} className={cn(
                        "p-2 rounded-lg text-xs",
                        chat.ai ? "bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30" : "bg-slate-50 dark:bg-zinc-800/50"
                      )}>
                        <div className="flex justify-between mb-1">
                          <span className={cn("font-bold", chat.ai ? "text-blue-600" : "text-slate-900 dark:text-zinc-100")}>{chat.user}</span>
                          <span className="text-[10px] text-slate-400">{chat.time}</span>
                        </div>
                        <p className="text-slate-600 dark:text-zinc-400 leading-tight">{chat.msg}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden flex flex-col">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" />
                  Operational Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full px-4 pb-4">
                  <div className="space-y-2">
                    {[
                      { type: 'DELAY', msg: 'TR-901 (Tom Hardy) is 15m behind schedule.', severity: 'MEDIUM' },
                      { type: 'FUEL', msg: 'TR-223 (Sarah Jenkins) fuel level critical (15%).', severity: 'HIGH' },
                      { type: 'WEATHER', msg: 'Severe thunderstorm approaching Austin station.', severity: 'LOW' },
                    ].map((alert, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          alert.severity === 'HIGH' ? "bg-red-500" : alert.severity === 'MEDIUM' ? "bg-amber-500" : "bg-blue-500"
                        )} />
                        <span className="text-xs text-slate-600 dark:text-zinc-400 flex-1">{alert.msg}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical size={12} /></Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
