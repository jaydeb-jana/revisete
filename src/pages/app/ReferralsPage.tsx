import React, { useState } from 'react';
import { Share2, Users, Gift, Copy, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { NoticeModal } from '../../components/ui/NoticeModal';

export const ReferralsPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { customers } = useBusiness();
  const [copied, setCopied] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const referralLink = `https://revisit.app/c/${activeBusiness?.slug}?ref=BIZ2026`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setShowNotice(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Referral Program
            <Badge variant="druto">Viral Growth</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Reward existing customers when they introduce new patrons to your business</p>
        </div>
      </div>

      <Card className="p-6 bg-white border-slate-200/80 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold font-serif text-slate-900">Business Referral Master Link</h3>
        <p className="text-xs text-slate-500 font-medium">Share this universal referral link across SMS, WhatsApp, and social campaigns.</p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 rounded-xl bg-slate-50 border border-slate-300 text-[#800A12] text-xs p-3 font-mono font-bold"
          />
          <Button
            variant="druto"
            size="md"
            onClick={copyLink}
            leftIcon={copied ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
      </Card>

      {/* REFERRAL LOG TABLE */}
      <Card className="p-0 bg-white border-slate-200/80 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-bold font-serif text-slate-900">Customer Referral Codes & History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Personal Referral Code</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{c.name}</td>
                  <td className="py-3.5 px-4 font-mono text-[#800A12] font-extrabold text-sm">{c.referral_code}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="druto" size="sm">Active Referrer</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <NoticeModal
        isOpen={showNotice}
        onClose={() => setShowNotice(false)}
        title="Referral Link Copied"
        message="Master referral link has been copied to your clipboard!"
      />
    </div>
  );
};
