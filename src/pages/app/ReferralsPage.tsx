import React from 'react';
import { Share2, Users, Gift, Copy, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const ReferralsPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { customers } = useBusiness();

  const referralLink = `https://revisit.app/c/${activeBusiness?.slug}?ref=BIZ2026`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            Referral Program
            <Badge variant="teal">Viral Growth</Badge>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Reward existing customers when they introduce new patrons to your business</p>
        </div>
      </div>

      <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200">Business Referral Master Link</h3>
        <p className="text-xs text-slate-400">Share this universal referral link across SMS, WhatsApp, and social campaigns.</p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 rounded-lg bg-slate-950 border border-slate-700 text-teal-400 text-xs p-3 font-mono"
          />
          <Button variant="teal" size="md" onClick={copyLink} leftIcon={<Copy className="w-4 h-4" />}>
            Copy Link
          </Button>
        </div>
      </Card>

      {/* REFERRAL LOG TABLE */}
      <Card className="p-0 bg-slate-900 border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-200">Customer Referral Codes & History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Personal Referral Code</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-slate-200">{c.name}</td>
                  <td className="py-3 px-4 font-mono text-teal-400 font-bold">{c.referral_code}</td>
                  <td className="py-3 px-4">
                    <Badge variant="teal" size="sm">Active Referrer</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
