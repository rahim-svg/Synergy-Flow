import React from 'react';
import { useApp } from '@/App';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, DollarSign, Map, Check, X, ArrowRight } from 'lucide-react';

export function ApprovalPanel() {
  const { aiRecommendations, setAiRecommendations } = useApp();

  const handleAction = (id: string, isApproved: boolean) => {
    setAiRecommendations(prev => prev.map(rec => 
      rec.id === id ? { ...rec, status: isApproved ? 'APPROVED' : 'REJECTED' } : rec
    ));
  };

  const pending = aiRecommendations.filter(r => r.status === 'PENDING');
  const history = aiRecommendations.filter(r => r.status !== 'PENDING');

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Approval Panel</h1>
        <p className="text-slate-500 text-sm">Review, approve, or override AI-generated dispatch and procurement suggestions.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          Requires Action
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{pending.length}</Badge>
        </h2>

        {pending.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 text-slate-500">
            <Sparkles size={32} className="mx-auto mb-3 text-slate-300" />
            <p className="font-medium">You're all caught up!</p>
            <p className="text-sm">No new AI recommendations at this time.</p>
          </div>
        ) : (
          pending.map(rec => (
            <Card key={rec.id} className="border-blue-100 dark:border-blue-900/30 shadow-md shadow-blue-500/5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-bold uppercase border-blue-200 text-blue-700 bg-blue-50 flex items-center gap-1">
                        <Sparkles size={10} /> {rec.type.replace('_', ' ')}
                      </Badge>
                      {rec.impact === 'HIGH' && <Badge className="bg-red-100 text-red-700 text-[10px] py-0">High Impact</Badge>}
                    </div>
                    <h3 className="font-bold text-lg">{rec.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{rec.description}</p>
                    
                    <div className="bg-slate-50 dark:bg-zinc-900 p-3 rounded-lg border border-slate-100 dark:border-zinc-800 flex items-start gap-2 mt-4 text-sm">
                      <ArrowRight size={16} className="text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold block mb-0.5">AI Rationale:</span>
                        <span className="text-slate-600">{rec.rationale}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col justify-between items-end bg-blue-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-blue-50 dark:border-zinc-800 min-w-[200px]">
                    <div className="text-right w-full">
                      <div className="text-xs font-bold text-slate-400 uppercase">Estimated Impact</div>
                      <div className="font-black text-xl text-green-600 flex items-center justify-end gap-1 mt-1">
                        <DollarSign size={20} className="-mr-1"/> {rec.savings}
                      </div>
                    </div>
                    <div className="flex gap-2 w-full mt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleAction(rec.id, false)}
                      >
                        <X size={16} className="mr-1" /> Override
                      </Button>
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleAction(rec.id, true)}
                      >
                        <Check size={16} className="mr-1" /> Approve
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Recent Decisions</h2>
          <div className="space-y-3 opacity-75">
            {history.map(rec => (
              <div key={rec.id} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-lg">
                <div>
                  <div className="font-semibold text-sm">{rec.title}</div>
                  <div className="text-xs text-slate-500">Savings impact: {rec.savings}</div>
                </div>
                <Badge className={
                  rec.status === 'APPROVED' 
                    ? "bg-green-100 text-green-700" 
                    : "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-400"
                }>
                  {rec.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
