import React, { useState } from 'react';
import {
  Gift,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Search,
  ShieldCheck,
  Clock,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Reward } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const RewardsPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { rewards, redeemReward, auditLogs } = useBusiness();

  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [redemptionNotes, setRedemptionNotes] = useState('');
  const [toastResult, setToastResult] = useState<{ success: boolean; message: string } | null>(null);

  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'redeemed'>('all');

  const filteredRewards = rewards.filter(r => {
    if (filterStatus === 'available') return r.status === 'available';
    if (filterStatus === 'redeemed') return r.status === 'redeemed';
    return true;
  });

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;

    const result = redeemReward(inputCode, redemptionNotes);
    setToastResult(result);

    if (result.success) {
      setIsRedeemModalOpen(false);
      setInputCode('');
      setRedemptionNotes('');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Reward Entitlements & Redemption
            <Badge variant="druto">{rewards.length} Issued Vouchers</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Validate single-use redemption codes with real-time audit logs</p>
        </div>
        <Button variant="druto" size="sm" onClick={() => setIsRedeemModalOpen(true)} leftIcon={<Gift className="w-4 h-4" />}>
          Redeem Customer Voucher Code
        </Button>
      </div>

      {/* RESULT TOAST ALERT */}
      {toastResult && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
          toastResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-[#800A12]'
        }`}>
          <div className="flex items-center gap-2">
            {toastResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{toastResult.message}</span>
          </div>
          <button onClick={() => setToastResult(null)} className="underline text-[10px]">Dismiss</button>
        </div>
      )}

      {/* FILTER TABS */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            filterStatus === 'all' ? 'bg-[#800A12] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Rewards ({rewards.length})
        </button>
        <button
          onClick={() => setFilterStatus('available')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            filterStatus === 'available' ? 'bg-[#800A12] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Available ({rewards.filter(r => r.status === 'available').length})
        </button>
        <button
          onClick={() => setFilterStatus('redeemed')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            filterStatus === 'redeemed' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Redeemed ({rewards.filter(r => r.status === 'redeemed').length})
        </button>
      </div>

      {/* REWARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map(r => (
          <Card key={r.id} className="p-5 bg-white border-slate-200/80 flex flex-col justify-between space-y-4 shadow-sm hover:border-slate-300 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={r.status === 'available' ? 'druto' : 'neutral'} size="sm">
                  {r.status.toUpperCase()}
                </Badge>
                <span className="text-xs font-mono font-bold text-[#800A12]">{r.redemption_code}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{r.title}</h3>
              <p className="text-xs text-slate-600">{r.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Unlocked: {new Date(r.unlocked_at).toLocaleDateString()}</span>
              {r.status === 'available' ? (
                <Button variant="outline" size="sm" onClick={() => { setInputCode(r.redemption_code); setIsRedeemModalOpen(true); }}>
                  Redeem
                </Button>
              ) : (
                <span className="text-emerald-700 font-semibold">Redeemed</span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* REDEEM CODE MODAL */}
      <Modal isOpen={isRedeemModalOpen} onClose={() => setIsRedeemModalOpen(false)} title="Validate & Redeem Reward Voucher">
        <form onSubmit={handleRedeem} className="space-y-4">
          <Input
            label="Redemption Code / QR String"
            placeholder="e.g. GOLD-1000-VIK or PERK15-ANA"
            required
            value={inputCode}
            onChange={e => setInputCode(e.target.value)}
          />

          <Input
            label="Staff Notes / Order Bill # (Optional)"
            placeholder="e.g. Order #104 checkout"
            value={redemptionNotes}
            onChange={e => setRedemptionNotes(e.target.value)}
          />

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#800A12]" /> Single-Use Validation Safeguard</p>
            <p>1. Validates code existence and expiration date in real-time.</p>
            <p>2. Marks status as REDEEMED instantly to prevent reuse.</p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsRedeemModalOpen(false)}>Cancel</Button>
            <Button variant="druto" size="sm" type="submit">Verify & Redeem</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
