import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ArrowRight, 
  TrendingDown, 
  Clock, 
  ShieldAlert,
  ChevronRight,
  Info,
  History,
  ThumbsUp,
  ThumbsDown,
  Inbox
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

// Mock AI Recommendations
const RECOMMENDATIONS = [
  {
    id: 'REC-001',
    type: 'BULK_BUY',
    title: 'Strategic Bulk Purchase Opportunity',
    description: 'Regional fuel prices in Houston are projected to rise by 8% in the next 48 hours due to supply chain disruptions.',
    rationale: 'AI analysis of market trends and weather patterns suggests a temporary bottleneck. Buying 500,000L now will save approximately $42,000.',
    savings: '$42,500',
    impact: 'HIGH',
    time: '10m ago'
  },
  {
    id: 'REC-002',
    type: 'ROUTE_OPTIMIZATION',
    title: 'Route Re-routing: Austin Deliveries',
    description: 'Current traffic patterns on I-35 are causing 45-minute delays for 3 active trips.',
    rationale: 'Switching to Highway 130 (Toll) will reduce total fleet transit time by 120 minutes and save $1,200 in fuel/idle costs.',
    savings: '$1,200',
    impact: 'MEDIUM',
    time: '25m ago'
  },
  {
    id: 'REC-003',
    type: 'FLEET_REALLOCATION',
    title: 'Dynamic Asset Reallocation',
    description: 'Surge in demand detected in San Antonio station #12.',
    rationale: 'Reallocating 2 available trucks from Dallas will meet the 15% demand spike with minimal impact on Dallas operations.',
    savings: '15% Efficiency Gain',
    impact: 'LOW',
    time: '1h ago'
  }
];

export function AdminInbox() {
  const [selectedRec, setSelectedRec] = useState<typeof RECOMMENDATIONS[0] | null>(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [isOverrideDialogOpen, setIsOverrideDialogOpen] = useState(false);

  const handleApprove = (id: string) => {
    // Logic for approval
    console.log('Approved:', id);
  };

  const handleOverride = () => {
    // Logic for override with reason
    console.log('Overridden:', selectedRec?.id, 'Reason:', overrideReason);
    setIsOverrideDialogOpen(false);
    setOverrideReason('');
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Approval Inbox</h1>
          <p className="text-slate-500 text-sm">Review and authorize AI-generated operational optimizations.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">
          <Button variant="ghost" size="sm" className="text-xs font-bold h-8">Pending (3)</Button>
          <Button variant="ghost" size="sm" className="text-xs font-bold h-8 text-slate-500">History</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Recommendations List */}
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
          <ScrollArea className="flex-1">
            <div className="space-y-4 pr-4">
              {RECOMMENDATIONS.map((rec) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  <Card className={cn(
                    "border-none shadow-sm overflow-hidden transition-all cursor-pointer",
                    selectedRec?.id === rec.id ? "ring-2 ring-blue-500" : "hover:shadow-md"
                  )} onClick={() => setSelectedRec(rec)}>
                    <div className="flex flex-col md:flex-row">
                      <div className={cn(
                        "w-full md:w-2 bg-gradient-to-b",
                        rec.impact === 'HIGH' ? "from-red-500 to-red-600" : 
                        rec.impact === 'MEDIUM' ? "from-amber-500 to-amber-600" : "from-blue-500 to-blue-600"
                      )} />
                      <div className="flex-1 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <Sparkles size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{rec.type.replace('_', ' ')}</div>
                              <h3 className="text-base font-bold leading-tight">{rec.title}</h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                              <div className="text-[10px] font-bold text-slate-400 uppercase">Est. Savings</div>
                              <div className="text-sm font-bold text-green-600">{rec.savings}</div>
                            </div>
                            <Badge variant="outline" className={cn(
                              "text-[10px] px-2 py-0.5",
                              rec.impact === 'HIGH' ? "border-red-200 text-red-600 bg-red-50" : 
                              rec.impact === 'MEDIUM' ? "border-amber-200 text-amber-600 bg-amber-50" : "border-blue-200 text-blue-600 bg-blue-50"
                            )}>
                              {rec.impact} IMPACT
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6 line-clamp-2">
                          {rec.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            <Clock size={14} />
                            {rec.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-slate-500">View Details</Button>
                            <Button size="sm" className="h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700" onClick={(e) => { e.stopPropagation(); handleApprove(rec.id); }}>Approve</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Detail Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-4 min-h-0">
          <AnimatePresence mode="wait">
            {selectedRec ? (
              <motion.div
                key={selectedRec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full"
              >
                <Card className="h-full border-none shadow-sm flex flex-col overflow-hidden">
                  <CardHeader className="bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-100 dark:border-zinc-800">
                    <CardTitle className="text-lg font-bold">Decision Rationale</CardTitle>
                    <CardDescription className="text-xs">AI Engine v4.2 Analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden p-0">
                    <ScrollArea className="h-full p-6">
                      <div className="space-y-6">
                        <section>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">AI Rationale</h4>
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <p className="text-sm text-blue-900 dark:text-blue-100 leading-relaxed italic">
                              "{selectedRec.rationale}"
                            </p>
                          </div>
                        </section>

                        <section>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Projected Outcome</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-100 dark:border-zinc-700">
                              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Cost Saving</div>
                              <div className="text-lg font-bold text-green-600">{selectedRec.savings}</div>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-100 dark:border-zinc-700">
                              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Confidence</div>
                              <div className="text-lg font-bold text-blue-600">94%</div>
                            </div>
                          </div>
                        </section>

                        <section>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Risk Assessment</h4>
                          <div className="space-y-3">
                            {[
                              { label: 'Operational Risk', value: 'Low', color: 'text-green-600' },
                              { label: 'Supply Chain Impact', value: 'Moderate', color: 'text-amber-600' },
                              { label: 'Regulatory Compliance', value: 'Verified', color: 'text-blue-600' },
                            ].map((risk, i) => (
                              <div key={i} className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 font-medium">{risk.label}</span>
                                <span className={cn("font-bold", risk.color)}>{risk.value}</span>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section className="pt-4 border-t border-slate-100 dark:border-zinc-800">
                          <div className="flex items-center gap-2 mb-4">
                            <History size={16} className="text-slate-400" />
                            <span className="text-xs font-bold">Similar Historical Decisions</span>
                          </div>
                          <div className="space-y-2">
                            <div className="p-2 bg-slate-50 dark:bg-zinc-800 rounded-lg text-[10px]">
                              <div className="flex justify-between mb-1">
                                <span className="font-bold">Oct 12, 2025</span>
                                <span className="text-green-600 font-bold">SUCCESS</span>
                              </div>
                              <p className="text-slate-500 line-clamp-1">Bulk buy Houston: Saved $12k</p>
                            </div>
                          </div>
                        </section>
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="p-6 bg-slate-50 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
                    <Dialog open={isOverrideDialogOpen} onOpenChange={setIsOverrideDialogOpen}>
                      <DialogTrigger
                        render={
                          <Button variant="outline" className="w-full font-bold text-xs gap-2 border-slate-200 dark:border-zinc-700">
                            <XCircle size={14} />
                            Override
                          </Button>
                        }
                      />
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Override AI Recommendation</DialogTitle>
                          <DialogDescription>
                            Please provide a rationale for overriding this recommendation. This helps the AI learn and improve its future suggestions.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rationale for Override</h4>
                            <Textarea 
                              placeholder="e.g., Local knowledge of upcoming roadwork not yet in system..." 
                              value={overrideReason}
                              onChange={(e) => setOverrideReason(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                            <ShieldAlert size={16} className="text-amber-600" />
                            <p className="text-[10px] text-amber-800 dark:text-amber-200 font-medium leading-tight">
                              Overriding high-impact recommendations requires secondary confirmation from a Synergy Analyst.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="ghost" onClick={() => setIsOverrideDialogOpen(false)}>Cancel</Button>
                          <Button disabled={!overrideReason} onClick={handleOverride} className="bg-red-600 hover:bg-red-700">Confirm Override</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button className="w-full font-bold text-xs gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => handleApprove(selectedRec.id)}>
                      <CheckCircle2 size={14} />
                      Approve
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Inbox size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">No Recommendation Selected</h3>
                    <p className="text-sm text-slate-500">Select an item from the inbox to view AI rationale and take action.</p>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
