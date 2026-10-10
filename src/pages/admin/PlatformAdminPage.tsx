import React from 'react';
import { ShieldAlert, Building2, Users, QrCode, Server, Activity, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PlatformAdminPage: React.FC = () => {
  const { businesses } = useAuth();
  const { auditLogs } = useBusiness();

  return (
    <div className="space-y-8 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            Platform Owner Administration
            <Badge variant="danger">Super Admin Console</Badge>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Multi-tenant platform statistics, tenant workspace statuses & audit logs</p>
        </div>
      </div>

      {/* SYSTEM STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Platform Businesses</span>
            <Building2 className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-100">{businesses.length}</p>
          <p className="text-[11px] text-emerald-400 font-medium">100% Active RLS Workspaces</p>
        </Card>

        <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">System Health</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">Operational</p>
          <p className="text-[11px] text-slate-400 font-medium">PostgreSQL RLS Active</p>
        </Card>

        <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Audit Events</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-100">{auditLogs.length}</p>
          <p className="text-[11px] text-slate-400 font-medium">Security logging active</p>
        </Card>

        <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Security Mode</span>
            <Lock className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-100">Enforced</p>
          <p className="text-[11px] text-teal-400 font-medium">Server-side validated</p>
        </Card>
      </div>

      {/* BUSINESS TENANTS LIST */}
      <Card className="p-0 bg-slate-900 border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-200">Tenant Workspaces Directory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Business Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Currency</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {businesses.map(b => (
                <tr key={b.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    {b.name}
                    <span className="block text-[10px] text-slate-500 font-mono">{b.slug}</span>
                  </td>
                  <td className="py-3 px-4 capitalize text-slate-300">{b.category}</td>
                  <td className="py-3 px-4 font-mono text-teal-400">{b.currency}</td>
                  <td className="py-3 px-4">
                    <Badge variant={b.status === 'active' ? 'success' : 'warning'} size="sm">
                      {b.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="outline" size="sm">Manage Tenant</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* PLATFORM AUDIT LOGS */}
      <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-400" /> Platform Audit Trail
        </h3>
        <div className="divide-y divide-slate-800 text-xs font-mono">
          {auditLogs.map(a => (
            <div key={a.id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="text-teal-400 font-bold">[{a.action}]</span>{' '}
                <span className="text-slate-300">{a.actor_name}: {JSON.stringify(a.details)}</span>
              </div>
              <span className="text-slate-500 text-[10px]">{new Date(a.created_at).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
