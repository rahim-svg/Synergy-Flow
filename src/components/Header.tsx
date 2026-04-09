import React from 'react';
import { Search, Bell, ChevronDown, Sparkles, AlertTriangle } from 'lucide-react';
import { useApp } from '@/App';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function Header() {
  const { user, role, aiRecommendations } = useApp();

  const pendingRecs = aiRecommendations.filter(r => r.status === 'PENDING').length;

  return (
    <header className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search trips, drivers, companies..." 
            className="pl-10 bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-full h-9 transition-shadow hover:shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {role !== 'DRIVER' && (
          <div className="hidden lg:flex items-center gap-2 mr-2 bg-blue-50/50 dark:bg-blue-900/10 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/30">
            <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Synergy AI Engine: Active</span>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 dark:hover:text-zinc-100 rounded-full">
              <Bell size={20} />
              {pendingRecs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2">
            <DropdownMenuLabel className="pb-2">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {aiRecommendations.map((rec) => (
              <DropdownMenuItem key={rec.id} className="p-3 mb-1 cursor-pointer items-start gap-3 rounded-lg focus:bg-slate-50 dark:focus:bg-zinc-800">
                <div className={cn(
                  "p-2 rounded-full shrink-0 flex items-center justify-center",
                  rec.impact === 'HIGH' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                )}>
                  {rec.impact === 'HIGH' ? <AlertTriangle size={16} /> : <Sparkles size={16} />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-bold leading-none">{rec.title}</p>
                  <p className="text-xs text-slate-500">{rec.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
            {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
              <div className="p-2 pt-1 border-t mt-2">
                <Link to={role === 'ADMIN' ? "/admin/approvals" : "/super-admin/dashboard"}>
                  <Button variant="outline" className="w-full text-xs h-8">View All Recommendations</Button>
                </Link>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6 mx-2 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 py-1 h-auto hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-full">
              <Avatar className="h-8 w-8 border-2 border-slate-100 dark:border-zinc-800 shadow-sm">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-bold leading-none text-slate-800 dark:text-slate-200">{user.name}</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-1 uppercase tracking-wider">{role.replace('_', ' ')}</div>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 font-medium">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function Separator({ orientation = 'horizontal', className }: { orientation?: 'horizontal' | 'vertical', className?: string }) {
  return (
    <div className={cn(
      "bg-slate-200 dark:bg-zinc-800",
      orientation === 'horizontal' ? "h-[1px] w-full" : "w-[1px] h-full",
      className
    )} />
  );
}
