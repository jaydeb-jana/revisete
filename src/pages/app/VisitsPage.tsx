import React, { useState } from 'react';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Clock,
  DollarSign,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const VisitsPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { customers, visits, loyaltyProgram, recordVisit } = useBusiness();

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedCustId, setSelectedCustId] = useState('');
  const [purchaseAmt, setPurchaseAmt] = useState('350');
  const [visitNotes, setVisitNotes] = useState('');

  const [toastResult, setToastResult] = useState<{ success: boolean; message: string } | null>(null);

  const currencySymbol = activeBusiness?.currency === 'USD' ? '$' : activeBusiness?.currency === 'EUR' ? '€' : '₹';

  const handleRecordVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustId) return;

    const res = recordVisit(selectedCustId, parseFloat(purchaseAmt) || 0, visitNotes);
    setToastResult(res);

    if (res.success) {
      setIsRecordModalOpen(false);
      setVisitNotes('');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Visits & QR Check-In Engine
            <Badge variant="druto">{visits.length} Total Visits</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Server validated check-in rules: {loyaltyProgram.cooldown_hours}h cooldown • Min {currencySymbol}{loyaltyProgram.min_purchase_amount}</p>
        </div>
        <Button variant="druto" size="sm" onClick={() => setIsRecordModalOpen(true)} leftIcon={<QrCode className="w-4 h-4" />}>
          Scan / Record Customer Visit
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

      {/* VISITS AUDIT LOG TABLE */}
      <Card className="p-0 bg-white border-slate-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Purchase Amount</th>
                <th className="py-3.5 px-4">Scanned Date & Time</th>
                <th className="py-3.5 px-4">Validation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {visits.map(v => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {v.customer_name || 'Customer'}
                  </td>

                  <td className="py-3.5 px-4 text-[#800A12] font-extrabold text-sm">
                    {currencySymbol}{v.purchase_amount}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(v.scanned_at).toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={v.status === 'approved' ? 'success' : 'danger'} size="sm">
                      <ShieldCheck className="w-3 h-3" /> {v.status.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* RECORD VISIT MODAL */}
      <Modal isOpen={isRecordModalOpen} onClose={() => setIsRecordModalOpen(false)} title="Record Customer Check-In Visit">
        <form onSubmit={handleRecordVisit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Select Customer</label>
            <select
              value={selectedCustId}
              onChange={e => setSelectedCustId(e.target.value)}
              required
              className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12]"
            >
              <option value="">-- Choose Customer --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.membership_number}) - {c.total_visits} Visits</option>
              ))}
            </select>
          </div>

          <Input
            label={`Purchase Amount (${currencySymbol})`}
            type="number"
            step="0.01"
            required
            value={purchaseAmt}
            onChange={e => setPurchaseAmt(e.target.value)}
            helperText={`Minimum spend rule: ${currencySymbol}${loyaltyProgram.min_purchase_amount}`}
          />

          <Input
            label="Visit Notes / Order Ref (Optional)"
            placeholder="e.g. Table #4 dining or Hair spa service"
            value={visitNotes}
            onChange={e => setVisitNotes(e.target.value)}
          />

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#800A12]" /> Server Validation Rules</p>
            <p>1. Cooldown window: {loyaltyProgram.cooldown_hours} hours required between check-ins.</p>
            <p>2. Automatic reward issuance when loyalty milestone (e.g. 3rd visit) is hit.</p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsRecordModalOpen(false)}>Cancel</Button>
            <Button variant="druto" size="sm" type="submit">Verify & Record Visit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
