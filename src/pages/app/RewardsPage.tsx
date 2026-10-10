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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            Reward Entitlements & Redemption
            <Badge variant="teal">{rewards.length} Issued Vouchers</Badge>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Validate single-use redemption codes with real-time audit logs</p>
        </div>
        <Button variant="teal" size="sm" onClick={() => setIsRedeemModalOpen(true)} leftIcon={<Gift className="w-4 h-4" />}>
          Redeem Customer Voucher Code
        </Button>
      </div>

      {/* RESULT TOAST ALERT */}
      {toastResult && (
        <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold ${
          toastResult.success ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
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
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filterStatus === 'all' ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
        >
          All Rewards ({rewards.length})
        </button>
        <button
          onClick={() => setFilterStatus('available')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filterStatus === 'available' ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
        >
          Available ({rewards.filter(r => r.status === 'available').length})
        </button>
        <button
          onClick={() => setFilterStatus('redeemed')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filterStatus === 'redeemed' ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
        >
          Redeemed ({rewards.filter(r => r.status === 'redeemed').length})
        </button>
      </div>

      {/* REWARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map(r => (
          <Card key={r.id} className="p-5 bg-slate-900 border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={r.status === 'available' ? 'teal' : 'neutral'} size="sm">
                  {r.status.toUpperCase()}
                </Badge>
                <span className="text-xs font-mono font-bold text-teal-400">{r.redemption_code}</span>
              </div>
              <h3 className="font-bold text-slate-100 text-base">{r.title}</h3>
              <p className="text-xs text-slate-400">{r.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Unlocked: {new Date(r.unlocked_at).toLocaleDateString()}</span>
              {r.status === 'available' ? (
                <Button variant="outline" size="sm" onClick={() => { setInputCode(r.redemption_code); setIsRedeemModalOpen(true); }}>
                  Redeem
                </Button>
              ) : (
                <span className="text-emerald-400 font-semibold">Redeemed</span>
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

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-300 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Single-Use Validation Safeguard</p>
            <p>1. Validates code existence and expiration date in real-time.</p>
            <p>2. Marks status as REDEEMED instantly to prevent reuse.</p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsRedeemModalOpen(false)}>Cancel</Button>
            <Button variant="teal" size="sm" type="submit">Verify & Redeem</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
