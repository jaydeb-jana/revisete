import React, { useState } from 'react';
import {
  Award,
  Plus,
  Trash2,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Percent,
  Gift,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { RewardType } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const LoyaltyProgramPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { loyaltyProgram, milestones, updateLoyaltyProgram, addMilestone, deleteMilestone } = useBusiness();

  // Settings form
  const [cooldown, setCooldown] = useState(loyaltyProgram.cooldown_hours.toString());
  const [minSpend, setMinSpend] = useState(loyaltyProgram.min_purchase_amount.toString());

  // Add Milestone Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [visitNum, setVisitNum] = useState('3');
  const [title, setTitle] = useState('3-Visit Special Perk');
  const [rewardType, setRewardType] = useState<RewardType>('percent_discount');
  const [rewardValue, setRewardValue] = useState('15');
  const [rewardDesc, setRewardDesc] = useState('15% Off your bill');
  const [expiryDays, setExpiryDays] = useState('30');

  const currencySymbol = activeBusiness?.currency === 'USD' ? '$' : activeBusiness?.currency === 'EUR' ? '€' : '₹';

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateLoyaltyProgram({
      cooldown_hours: parseInt(cooldown) || 4,
      min_purchase_amount: parseFloat(minSpend) || 0,
    });
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    addMilestone({
      visit_number: parseInt(visitNum) || 1,
      title,
      reward_type: rewardType,
      reward_value: parseFloat(rewardValue) || 0,
      reward_description: rewardDesc,
      expiry_days: parseInt(expiryDays) || 30,
    });
    setIsAddModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Loyalty Engine & Milestones
            <Badge variant="druto">Configurable Rules</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Set visit milestone tiers, reward vouchers, and cooldown parameters</p>
        </div>
        <Button variant="druto" size="sm" onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add Milestone Tier
        </Button>
      </div>

      {/* LOYALTY RULES SETTINGS */}
      <Card className="p-6 bg-white border-slate-200/80 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#800A12]" /> Visit Cooldown & Minimum Spend Controls
        </h3>
        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <Input
            label="Visit Cooldown (Hours)"
            type="number"
            value={cooldown}
            onChange={e => setCooldown(e.target.value)}
            helperText="Hours required between QR scans"
          />
          <Input
            label={`Minimum Spend Amount (${currencySymbol})`}
            type="number"
            value={minSpend}
            onChange={e => setMinSpend(e.target.value)}
            helperText="Minimum order spend to count as a visit"
          />
          <Button variant="druto" size="md" type="submit">
            Save Engine Rules
          </Button>
        </form>
      </Card>

      {/* MILESTONES TIER GRID */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-serif text-slate-900">Active Milestone Tiers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {milestones.sort((a,b) => a.visit_number - b.visit_number).map(m => (
            <Card key={m.id} className="p-5 bg-white border-slate-200/80 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-sm hover:border-slate-300 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="druto" size="sm">
                    Visit #{m.visit_number}
                  </Badge>
                  <button
                    onClick={() => deleteMilestone(m.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{m.title}</h4>
                <p className="text-xs text-slate-600">{m.reward_description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="capitalize font-medium">{m.reward_type.replace('_', ' ')}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Expiry: {m.expiry_days}d</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ADD MILESTONE MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Loyalty Milestone Tier">
        <form onSubmit={handleAddMilestone} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Visit Number Target"
              type="number"
              required
              value={visitNum}
              onChange={e => setVisitNum(e.target.value)}
              helperText="e.g. 1st visit, 5th visit, 10th visit"
            />
            <Input
              label="Reward Title"
              placeholder="e.g. 15% Off Total Bill"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Reward Type</label>
              <select
                value={rewardType}
                onChange={e => setRewardType(e.target.value as RewardType)}
                className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12]"
              >
                <option value="percent_discount">Percentage Discount (%)</option>
                <option value="fixed_discount">Fixed Value Discount ({currencySymbol})</option>
                <option value="free_product">Free Product / Dish</option>
                <option value="free_service">Free Service Perk</option>
              </select>
            </div>

            <Input
              label={`Value (${rewardType === 'percent_discount' ? '%' : currencySymbol})`}
              type="number"
              value={rewardValue}
              onChange={e => setRewardValue(e.target.value)}
            />
          </div>

          <Input
            label="Reward Description / Customer Facing Text"
            value={rewardDesc}
            onChange={e => setRewardDesc(e.target.value)}
            placeholder="e.g. Present this voucher to redeem 15% off your dining bill."
          />

          <Input
            label="Expiry (Days after unlocked)"
            type="number"
            value={expiryDays}
            onChange={e => setExpiryDays(e.target.value)}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="druto" size="sm" type="submit">Create Milestone Tier</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
