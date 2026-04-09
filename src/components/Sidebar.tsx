import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Inbox, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  ShieldCheck,
  LogOut,
  Fuel,
  Activity,
  CheckSquare
} from 'lucide-react';
import { useApp } from '@/App';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Sidebar() {
  const { role, user, switchUser, users, aiRecommendations } = useApp();
  const location = useLocation();
  const pendingCount = aiRecommendations.filter(r => r.status === 'PENDING').length;

  // Define nav links per role
  const roleMenus = {
    SUPER_ADMIN: [
      { label: 'Global Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard },
      { label: 'Company Management', path: '/super-admin/companies', icon: ShieldCheck },
      { label: 'Analytics & Reports', path: '/super-admin/analytics', icon: BarChart3 },
      { label: 'AI Configurator', path: '/super-admin/ai-config', icon: Settings },
    ],
    ADMIN: [
      { label: 'Company Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Approval Panel', path: '/admin/approvals', icon: CheckSquare, badge: pendingCount },
      { label: 'AI Inbox', path: '/admin/inbox', icon: Inbox },
      { label: 'User Management', path: '/admin/users', icon: Users },
    ],
    DISPATCHER: [
      { label: 'Live Dispatch Map', path: '/dispatcher/map', icon: MapIcon },
      { label: 'Trip Management', path: '/dispatcher/trips', icon: Truck },
      { label: 'Fleet Management', path: '/dispatcher/fleet', icon: Users },
    ],
    DRIVER: [
      { label: 'My Dashboard', path: '/driver/dashboard', icon: Truck },
    ]
  };

  const currentMenu = roleMenus[role] || roleMenus['DISPATCHER'];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex-col hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Fuel size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight">Synergy<span className="text-blue-600">Flow</span></span>
      </div>

      <div className="px-4 mb-4">
        <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 px-2">Simulate User Login</div>
        <div className="space-y-1">
          {users.map((u) => (
            <button
              key={u.id}
              onClick={() => switchUser(u.id)}
              className={cn(
                "w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors",
                user.id === u.id 
                  ? "bg-slate-100 dark:bg-zinc-800 font-bold text-blue-600" 
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800/50"
              )}
            >
              <span className="truncate block">{u.name} ({u.role.split('_')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="mx-4 w-auto mb-4" />

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {currentMenu.map((item, idx) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={idx}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 h-10 font-medium transition-all rounded-lg text-sm",
                isActive 
                  ? "bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400" 
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800/50"
              )}
            >
              <item.icon size={18} className={isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <Activity size={16} className="text-green-500" />
            <span className="text-xs font-semibold">System Status</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Global Efficiency</span>
              <span className="font-bold">96.4%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-[96.4%]" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
