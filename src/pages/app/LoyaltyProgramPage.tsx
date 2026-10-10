import React, { useState } from 'react';
import {
  Award,
  Plus,
  Trash2,
  Settings,
  Percent,
  Gift,
  Clock,
  Edit3,
  DollarSign,
  Sparkles,
  Tag,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { RewardType, LoyaltyMilestone } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { NoticeModal } from '../../components/ui/NoticeModal';

type RewardCategory = 'discount' | 'gift';

export const LoyaltyProgramPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const {
    loyaltyProgram,
    milestones,
    updateLoyaltyProgram,
    addMilestone,
    updateMilestone,
    deleteMilestone
  } = useBusiness();

  const currencySymbol = activeBusiness?.currency === 'USD' ? '$' : activeBusiness?.currency === 'EUR' ? '€' : '₹';

  // Cooldown & Spend Settings form state
  const [cooldown, setCooldown] = useState(loyaltyProgram.cooldown_hours.toString());
  const [minSpend, setMinSpend] = useState(loyaltyProgram.min_purchase_amount.toString());

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<LoyaltyMilestone | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Form states for Add / Edit modal
  const [visitNum, setVisitNum] = useState<string>('1');
  const [title, setTitle] = useState<string>('');
  const [rewardCategory, setRewardCategory] = useState<RewardCategory>('discount');
  const [discountType, setDiscountType] = useState<'percent_discount' | 'fixed_discount'>('fixed_discount');
  const [discountAmount, setDiscountAmount] = useState<string>('50');
  const [giftItemName, setGiftItemName] = useState<string>('');
  const [giftValue, setGiftValue] = useState<string>('150');
  const [rewardDesc, setRewardDesc] = useState<string>('');
  const [expiryDays, setExpiryDays] = useState<string>('30');
  const [minSpendAmount, setMinSpendAmount] = useState<string>('0');

  // Compute next sequential stamp number
  const sortedMilestones = [...milestones].sort((a, b) => a.visit_number - b.visit_number);
  const maxStampNumber = milestones.length > 0 ? Math.max(...milestones.map(m => m.visit_number)) : 0;
  const nextStampNumber = maxStampNumber + 1;

  // Open modal for new milestone with pre-filled sequential stamp number
  const handleOpenAddModal = (stampTarget?: number) => {
    const targetStamp = stampTarget !== undefined ? stampTarget : nextStampNumber;
    setEditingMilestone(null);
    setVisitNum(targetStamp.toString());
    setTitle(`Stamp #${targetStamp} Reward`);
    setRewardCategory('discount');
    setDiscountType('fixed_discount');
    setDiscountAmount('50');
    setGiftItemName('Free Birthday Cake');
    setGiftValue('200');
    setRewardDesc(`Unlock special reward on completing Stamp #${targetStamp}!`);
    setExpiryDays('30');
    setMinSpendAmount('0');
    setIsAddModalOpen(true);
  };

  // Open modal for editing existing milestone
  const handleOpenEditModal = (m: LoyaltyMilestone) => {
    setEditingMilestone(m);
    setVisitNum(m.visit_number.toString());
    setTitle(m.title);

    if (m.reward_type === 'percent_discount' || m.reward_type === 'fixed_discount') {
      setRewardCategory('discount');
      setDiscountType(m.reward_type);
      setDiscountAmount(m.reward_value.toString());
    } else {
      setRewardCategory('gift');
      setGiftItemName(m.reward_description.replace(/^Complimentary\s+|^Free\s+/i, '') || m.title);
      setGiftValue(m.reward_value.toString());
    }

    setRewardDesc(m.reward_description);
    setExpiryDays(m.expiry_days.toString());
    setMinSpendAmount(m.min_spend_amount ? m.min_spend_amount.toString() : '0');
    setIsAddModalOpen(true);
  };

  // Handle Save Cooldown & Spend Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateLoyaltyProgram({
      cooldown_hours: parseInt(cooldown) || 0,
      min_purchase_amount: parseFloat(minSpend) || 0,
    });
    setNoticeMessage('Loyalty engine rules & cooldown parameters updated successfully!');
  };

  // Handle Add or Update Milestone submission
  const handleSubmitMilestone = (e: React.FormEvent) => {
    e.preventDefault();

    const targetVisit = parseInt(visitNum) || 1;
    let computedRewardType: RewardType = 'fixed_discount';
    let computedValue = 0;
    let computedDesc = rewardDesc;

    if (rewardCategory === 'discount') {
      computedRewardType = discountType;
      computedValue = parseFloat(discountAmount) || 0;
      if (!computedDesc) {
        computedDesc = discountType === 'percent_discount'
          ? `${computedValue}% Off your entire bill`
          : `${currencySymbol}${computedValue} Cash Discount on order`;
      }
    } else {
      computedRewardType = 'free_product';
      computedValue = parseFloat(giftValue) || 0;
      if (!computedDesc) {
        computedDesc = `Complimentary ${giftItemName || 'Gift Item'}`;
      }
    }

    const milestonePayload = {
      visit_number: targetVisit,
      title: title.trim() || `Stamp #${targetVisit} Reward`,
      reward_type: computedRewardType,
      reward_value: computedValue,
      reward_description: computedDesc,
      expiry_days: parseInt(expiryDays) || 30,
      min_spend_amount: parseFloat(minSpendAmount) || 0,
      is_scratch_card: true,
    };

    if (editingMilestone) {
      updateMilestone(editingMilestone.id, milestonePayload);
      setNoticeMessage(`Stamp #${targetVisit} milestone updated successfully!`);
    } else {
      addMilestone(milestonePayload);
      setNoticeMessage(`Stamp #${targetVisit} milestone added to sequential reward list!`);
    }

    setIsAddModalOpen(false);
    setEditingMilestone(null);
  };

  // Delete milestone confirmation execution
  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      const targetM = milestones.find(m => m.id === deleteTargetId);
      deleteMilestone(deleteTargetId);
      setNoticeMessage(targetM ? `Stamp #${targetM.visit_number} milestone deleted.` : 'Milestone removed.');
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Loyalty Stamps & Reward Tiers
            <Badge variant="druto">Sequential Stamps</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure step-by-step loyalty stamps, cash/percentage discounts, gift rewards, and visit cooldown rules.
          </p>
        </div>
        <Button
          variant="druto"
          size="sm"
          onClick={() => handleOpenAddModal(nextStampNumber)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Next Stamp Milestone
        </Button>
      </div>

      {/* LOYALTY RULES & COOLDOWN SETTINGS CARD */}
      <Card className="p-6 bg-white border-slate-200/80 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold font-serif text-slate-900 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#800A12]" /> Visit Cooldown & Minimum Spend Rules
          </h3>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400" /> Prevents QR scan spamming
          </span>
        </div>
        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <Input
            label="Visit Cooldown (Hours)"
            type="number"
            min="0"
            value={cooldown}
            onChange={e => setCooldown(e.target.value)}
            helperText="Minimum delay required between customer QR check-ins"
          />
          <Input
            label={`Minimum Spend Amount (${currencySymbol})`}
            type="number"
            min="0"
            value={minSpend}
            onChange={e => setMinSpend(e.target.value)}
            helperText="Minimum order value to earn 1 digital stamp"
          />
          <Button variant="druto" size="md" type="submit">
            Save Engine Rules
          </Button>
        </form>
      </Card>

      {/* SEQUENTIAL STAMP MILESTONE LIST SECTION */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#800A12]" />
              Sequential Stamp Milestones List (Stamp 1 to Stamp N)
            </h3>
            <p className="text-xs text-slate-500">
              Customers collect 1 stamp per verified visit. Add rewards at specific stamp numbers.
            </p>
          </div>
          <Badge variant="neutral" size="md" className="self-start sm:self-auto">
            Total Active Milestones: {sortedMilestones.length}
          </Badge>
        </div>

        {/* SEQUENTIAL STAMP TIMELINE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedMilestones.map((m) => {
            const isDiscount = m.reward_type === 'percent_discount' || m.reward_type === 'fixed_discount';

            return (
              <Card
                key={m.id}
                className="p-5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between space-y-4 relative overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
              >
                {/* Stamp Header Badge & Action Icons */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#800A12] text-white font-extrabold text-xs rounded-lg shadow-xs flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" /> Stamp #{m.visit_number}
                      </span>
                      {isDiscount ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px] rounded-md flex items-center gap-1">
                          {m.reward_type === 'percent_discount' ? <Percent className="w-3 h-3" /> : <DollarSign className="w-3 h-3" />}
                          Cash / Discount
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 font-bold text-[11px] rounded-md flex items-center gap-1">
                          <Gift className="w-3 h-3" /> Free Gift Item
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(m)}
                        title="Edit Milestone"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(m.id)}
                        title="Delete Milestone"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {m.reward_description}
                    </p>
                  </div>
                </div>

                {/* Reward Spec Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-slate-700 font-bold">
                    {isDiscount ? (
                      m.reward_type === 'percent_discount' ? `${m.reward_value}% Off Discount` : `${currencySymbol}${m.reward_value} Off Bill`
                    ) : (
                      `🎁 Gift Perk (Val: ${currencySymbol}${m.reward_value})`
                    )}
                  </span>
                  <div className="flex items-center gap-3.5 text-slate-500">
                    {m.min_spend_amount && m.min_spend_amount > 0 ? (
                      <span className="text-[#800A12] font-semibold bg-[#800A12]/5 px-2 py-0.5 rounded">Min: {currencySymbol}{m.min_spend_amount}</span>
                    ) : null}
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {m.expiry_days}d</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* BOTTOM SEQUENTIAL ADD STAMP MILESTONE CARD */}
        <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#800A12]/10 text-[#800A12] flex items-center justify-center mx-auto font-bold text-lg">
            #{nextStampNumber}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">Add Next Stamp #{nextStampNumber} Milestone</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Automatically defaults to Stamp #{nextStampNumber} in the milestone sequence. You can choose Cash Discount or Free Gift Item.
            </p>
          </div>
          <Button
            variant="druto"
            size="md"
            onClick={() => handleOpenAddModal(nextStampNumber)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="mt-2"
          >
            + Add Stamp #{nextStampNumber} Milestone
          </Button>
        </div>
      </div>

      {/* ADD / EDIT MILESTONE MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingMilestone ? `Edit Stamp #${editingMilestone.visit_number} Milestone` : `Add Next Stamp Milestone`}
        maxWidth="md"
      >
        <form onSubmit={handleSubmitMilestone} className="space-y-5 font-sans">
          {/* STAMP TARGET & TITLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Stamp Target Number"
              type="number"
              min="1"
              required
              value={visitNum}
              onChange={e => setVisitNum(e.target.value)}
              helperText="Position in customer stamp collection sequence (1, 2, 3, 5, 10 etc.)"
            />
            <Input
              label="Milestone Title"
              placeholder="e.g. Stamp #5 Special Gift / Discount"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              helperText="Internal title for this milestone tier"
            />
          </div>

          {/* TWO DISTINCT REWARD CATEGORIES */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Reward Type Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRewardCategory('discount')}
                className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                  rewardCategory === 'discount'
                    ? 'border-[#800A12] bg-[#800A12]/5 text-[#800A12] font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${rewardCategory === 'discount' ? 'bg-[#800A12] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">1. Cash / Discount</div>
                  <div className="text-[11px] text-slate-500 font-normal">Fixed Money or % Off</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRewardCategory('gift')}
                className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                  rewardCategory === 'gift'
                    ? 'border-[#800A12] bg-[#800A12]/5 text-[#800A12] font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${rewardCategory === 'gift' ? 'bg-[#800A12] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">2. Free Gift Item</div>
                  <div className="text-[11px] text-slate-500 font-normal">Free Apparel, Cake, Dessert</div>
                </div>
              </button>
            </div>
          </div>

          {/* DYNAMIC FIELDS BASED ON CATEGORY */}
          {rewardCategory === 'discount' ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Discount Method</label>
                  <select
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value as 'percent_discount' | 'fixed_discount')}
                    className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12]"
                  >
                    <option value="fixed_discount">Fixed Cash Discount ({currencySymbol})</option>
                    <option value="percent_discount">Percentage Discount (%)</option>
                  </select>
                </div>

                <Input
                  label={`Discount Amount (${discountType === 'percent_discount' ? '%' : currencySymbol})`}
                  type="number"
                  min="1"
                  required
                  value={discountAmount}
                  onChange={e => setDiscountAmount(e.target.value)}
                  placeholder={discountType === 'percent_discount' ? '15' : '100'}
                />
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Free Gift / Physical Item Name"
                  placeholder="e.g. Free Apparel / Birthday Cake / Cold Coffee"
                  required
                  value={giftItemName}
                  onChange={e => setGiftItemName(e.target.value)}
                  helperText="Exact gift given to the customer"
                />

                <Input
                  label={`Estimated Gift Retail Value (${currencySymbol})`}
                  type="number"
                  min="0"
                  value={giftValue}
                  onChange={e => setGiftValue(e.target.value)}
                  helperText="Approximate monetary value of the gift"
                />
              </div>

              {/* Quick Select Gift Options */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Quick Suggest Gift Ideas:</label>
                <div className="flex flex-wrap gap-2">
                  {['Free Birthday Cake', 'Free Cotton T-Shirt', 'Free Cold Coffee', 'Free Dessert Bowl', 'Free Hair Trim'].map(idea => (
                    <button
                      key={idea}
                      type="button"
                      onClick={() => setGiftItemName(idea)}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 hover:border-[#800A12] hover:text-[#800A12] transition-colors"
                    >
                      + {idea}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MIN SPEND, EXPIRY & DESCRIPTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={`Minimum Spend Amount (${currencySymbol})`}
              type="number"
              min="0"
              value={minSpendAmount}
              onChange={e => setMinSpendAmount(e.target.value)}
              placeholder="0 (No Minimum)"
              helperText="Minimum order spend to unlock/redeem"
            />
            <Input
              label="Voucher Expiry (Days)"
              type="number"
              min="1"
              value={expiryDays}
              onChange={e => setExpiryDays(e.target.value)}
              helperText="Days valid after unlock"
            />
          </div>

          <Input
            label="Customer Facing Description"
            value={rewardDesc}
            onChange={e => setRewardDesc(e.target.value)}
            placeholder="e.g. Present this voucher code at checkout to claim your reward."
            helperText="Text printed on customer digital voucher card"
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="druto" size="sm" type="submit">
              {editingMilestone ? 'Update Milestone Tier' : `Save Stamp #${visitNum} Milestone`}
            </Button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Milestone Tier"
        message="Are you sure you want to remove this stamp milestone? Customers will no longer unlock rewards at this visit tier."
        confirmText="Delete Milestone"
        variant="danger"
      />

      {/* SUCCESS NOTICE MODAL */}
      <NoticeModal
        isOpen={!!noticeMessage}
        onClose={() => setNoticeMessage(null)}
        title="Loyalty Engine Notification"
        message={noticeMessage || ''}
      />
    </div>
  );
};
