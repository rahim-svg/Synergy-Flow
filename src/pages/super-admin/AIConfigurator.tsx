import React, { useState } from 'react';
import { Settings2, Cpu, Zap, Activity, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

export function AIConfigurator() {
  const [logicWeight, setLogicWeight] = useState([65]);
  const [riskTolerance, setRiskTolerance] = useState([30]);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI & Optimization Configurator</h1>
          <p className="text-slate-500 text-sm">Tune the global parameters for the Synergy AI engine.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logistics Optimization Weights */}
        <Card className="border-none shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Settings2 size={20} className="text-blue-600" />
              Routing & Dispatch Heuristics
            </CardTitle>
            <CardDescription>Adjust the balance between operational cost savings and delivery speed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="font-bold text-slate-800 dark:text-zinc-200">Cost Focus vs. Speed Focus</div>
                  <div className="text-xs text-slate-500 mt-1">Controls how AI suggestions prioritize routes.</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-blue-600">{logicWeight}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Speed Bias</div>
                </div>
              </div>
              <Slider 
                value={logicWeight} 
                onValueChange={setLogicWeight} 
                max={100} 
                step={1} 
                className="py-2"
              />
              <div className="flex justify-between mt-2 text-xs font-bold text-slate-400 uppercase">
                <span>Maximum Savings (100% Cost)</span>
                <span>Fastest Delivery (100% Speed)</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="font-bold text-slate-800 dark:text-zinc-200">Risk Variance Tolerance</div>
                  <div className="text-xs text-slate-500 mt-1">Acceptable risk level for weather and traffic delays.</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-purple-600">{riskTolerance}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tolerance</div>
                </div>
              </div>
              <Slider 
                value={riskTolerance} 
                onValueChange={setRiskTolerance} 
                max={100} 
                step={1} 
                className="py-2"
              />
              <div className="flex justify-between mt-2 text-xs font-bold text-slate-400 uppercase">
                <span>Conservative (0%)</span>
                <span>Aggressive (100%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Features */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Zap size={20} className="text-amber-500" />
              Automated Operations
            </CardTitle>
            <CardDescription>Enable autonomous AI decisions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 pr-6">
                <div className="font-semibold text-sm">Auto-Approve Low Risk Reroutes</div>
                <div className="text-xs text-slate-500">Allow AI to silently reroute drivers for issues causing &lt; 15m delay without needing human approval.</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1 pr-6">
                <div className="font-semibold text-sm">Supplier Auto-Switching</div>
                <div className="text-xs text-slate-500">Automatically purchase fuel from alternate regional suppliers if cost saves exceed $500.</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between items-start">
              <div className="space-y-1 pr-6">
                <div className="font-semibold text-sm">Predictive Maintenance Alerts</div>
                <div className="text-xs text-slate-500">Use ML models on telemetry to preemptively flag trucks for servicing.</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Signals */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Activity size={20} className="text-green-500" />
              Data Source Integration
            </CardTitle>
            <CardDescription>Configure external signals fed into the AI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 pr-6">
                <div className="font-semibold text-sm">Google Maps Traffic & Weather API</div>
                <div className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 z-10" /> Connected
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1 pr-6">
                <div className="font-semibold text-sm">Live Regional Fuel Spot Prices</div>
                <div className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 z-10" /> Connected (OPIS)
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1 pr-6">
                <div className="font-semibold text-sm">Twilio SMS Gateway</div>
                <div className="text-xs text-amber-600 font-bold flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 z-10" /> Rate Limited
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs">Configure</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold px-8 gap-2">
          <Save size={16} />
          Save & Deploy Configurations
        </Button>
      </div>
    </div>
  );
}
