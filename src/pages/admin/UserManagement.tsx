import React from 'react';
import { useApp } from '@/App';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Check, AlertCircle, Plus, Users as UsersIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserManagement() {
  const { user, users } = useApp();
  
  // Get users for the current admin's company
  const companyUsers = users.filter(u => u.companyId === user.companyId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-slate-500 text-sm">Invite drivers and dispatchers to your company hub.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold gap-2 whitespace-nowrap">
          <Plus size={18} />
          Invite User
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-slate-50 dark:bg-zinc-900 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-bold">User</th>
              <th className="px-6 py-4 font-bold">Role</th>
              <th className="px-6 py-4 font-bold">Invitation Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
            {companyUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200 dark:border-zinc-700">
                      <AvatarImage src={u.avatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xs">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-zinc-100">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="text-xs font-semibold bg-slate-50">
                    {u.role.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  {u.status === 'ACTIVE' ? (
                    <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                      <Check size={14} /> Active / Joined
                    </div>
                  ) : u.status === 'PENDING' ? (
                    <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
                      <Mail size={14} /> Invite Sent (Pending)
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                      <AlertCircle size={14} /> Inactive
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 h-8 text-xs font-medium">Edit Role</Button>
                  <Button variant="ghost" size="sm" className="text-red-500 h-8 text-xs font-medium hover:bg-red-50 hover:text-red-700">Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex gap-4 mt-6">
        <UsersIcon className="text-blue-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Bulk Upload Team Members</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 mb-3 max-w-lg">Having trouble inviting drivers one by one? You can upload a CSV file with names and emails to bulk-invite your entire fleet instantly.</p>
          <Button size="sm" variant="outline" className="bg-white hover:bg-slate-50 text-xs">Download CSV Template</Button>
        </div>
      </div>
    </div>
  );
}
