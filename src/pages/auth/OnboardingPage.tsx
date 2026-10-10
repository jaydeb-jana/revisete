import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Utensils,
  Scissors,
  ShoppingBag,
  Store,
  Briefcase,
  QrCode,
  Award,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../context/AuthContext';
import { Business, BusinessCategory, RewardType } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const OnboardingPage: React.FC = () => {
  const { user, addBusiness, updateOnboardingStatus } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(2);

  // Form State
  const [bizName, setBizName] = useState('My New Boutique Cafe');
  const [bizSlug, setBizSlug] = useState('my-boutique-cafe');
  const [bizCategory, setBizCategory] = useState<BusinessCategory>('cafe');
  const [bizPhone, setBizPhone] = useState('+91 98765 11223');
  const [bizCity, setBizCity] = useState('Bengaluru');
  const [bizCurrency, setBizCurrency] = useState('INR');

  // Product / Service State
  const [itemName, setItemName] = useState('Special Artisan Coffee');
  const [itemPrice, setItemPrice] = useState('220');

  // Loyalty Program State
  const [cooldownHours, setCooldownHours] = useState('4');
  const [minSpend, setMinSpend] = useState('100');

  // First Reward State
  const [milestoneVisit, setMilestoneVisit] = useState('3');
  const [rewardTitle, setRewardTitle] = useState('15% Off Total Dining Bill');
  const [rewardType, setRewardType] = useState<RewardType>('percent_discount');
  const [rewardValue, setRewardValue] = useState('15');

  const categories = [
    { id: 'cafe' as BusinessCategory, title: 'Cafe / Restaurant', icon: Utensils, desc: 'Food menus, diet tags, dining milestones' },
    { id: 'salon' as BusinessCategory, title: 'Salon / Barbershop', icon: Scissors, desc: 'Hair, skincare, duration & stylist assignment' },
    { id: 'fashion' as BusinessCategory, title: 'Clothing & Fashion', icon: ShoppingBag, desc: 'SKU, sizes, stock quantity, seasonal perks' },
    { id: 'retail' as BusinessCategory, title: 'General Retail', icon: Store, desc: 'Supermarkets, groceries, general items' },
    { id: 'services' as BusinessCategory, title: 'Service Provider', icon: Briefcase, desc: 'Consulting, fitness, automotive, repair' },
  ];

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1);
    } else {
      const newBiz: Business = {
        id: 'biz-' + Date.now(),
        owner_id: user?.id || 'usr-owner-1',
        name: bizName,
        slug: bizSlug || bizName.toLowerCase().replace(/\s+/g, '-'),
        category: bizCategory,
        phone: bizPhone,
        city: bizCity,
        currency: bizCurrency,
        status: 'active',
        plan: 'growth',
        branches: [
          {
            id: 'br-' + Date.now(),
            business_id: 'biz-' + Date.now(),
            name: `${bizName} Main Outlet`,
            address: 'Main Street',
            city: bizCity,
            latitude: 12.9716,
            longitude: 77.5946,
            phone: bizPhone,
            is_main: true,
          }
        ],
        created_at: new Date().toISOString(),
      };

      addBusiness(newBiz);
      updateOnboardingStatus(true);
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="teal">Step {step} of 8 — Druto Business Setup</Badge>
          <h1 className="text-3xl font-extrabold text-slate-100">Setup Your Druto SaaS Workspace</h1>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-400 h-full transition-all duration-300"
              style={{ width: `${(step / 8) * 100}%` }}
            />
          </div>
        </div>

        {step === 2 && (
          <Card className="p-8 bg-slate-900 border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-400" /> Business Profile Details
            </h2>
            <div className="space-y-4">
              <Input
                label="Business Name"
                value={bizName}
                onChange={(e) => {
                  setBizName(e.target.value);
                  setBizSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                }}
                required
              />
              <Input
                label="Customer Loyalty Portal Slug URL"
                value={bizSlug}
                onChange={(e) => setBizSlug(e.target.value)}
                helperText={`Your portal will be: druto.in/c/${bizSlug}`}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Phone"
                  value={bizPhone}
                  onChange={(e) => setBizPhone(e.target.value)}
                />
                <Input
                  label="City / Location"
                  value={bizCity}
                  onChange={(e) => setBizCity(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Currency</label>
                <select
                  value={bizCurrency}
                  onChange={(e) => setBizCurrency(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm p-2.5 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="INR">INR (₹) Indian Rupee</option>
                  <option value="USD">USD ($) US Dollar</option>
                  <option value="EUR">EUR (€) Euro</option>
                  <option value="GBP">GBP (£) British Pound</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 bg-slate-900 border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-slate-100">Select Business Category</h2>
            <div className="space-y-3">
              {categories.map((c) => {
                const Icon = c.icon;
                const isSelected = bizCategory === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setBizCategory(c.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'bg-teal-500/15 border-teal-500 text-slate-100'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-teal-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{c.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="p-8 bg-slate-900 border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-slate-100">Add Your First Product or Service</h2>
            <p className="text-xs text-slate-400">Populate your catalog with an initial record for your customer portal.</p>
            <div className="space-y-4">
              <Input
                label="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. Signature Haircut / Butter Chicken"
                required
              />
              <Input
                label={`Price (${bizCurrency})`}
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                required
              />
            </div>
          </Card>
        )}

        {step === 5 && (
          <Card className="p-8 bg-slate-900 border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-slate-100">Configure Visit Engine Rules</h2>
            <div className="space-y-4">
              <Input
                label="Visit Cooldown Hours (Prevents Duplicate Scans)"
                type="number"
                value={cooldownHours}
                onChange={(e) => setCooldownHours(e.target.value)}
                helperText="Minimum hours required between consecutive customer QR scans."
              />
              <Input
                label={`Minimum Purchase Amount for Eligible Visit (${bizCurrency})`}
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(e.target.value)}
                helperText="Scans below this amount will not increment visit count."
              />
            </div>
          </Card>
        )}

        {step === 6 && (
          <Card className="p-8 bg-slate-900 border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-slate-100">Create Your First Loyalty Reward</h2>
            <div className="space-y-4">
              <Input
                label="Visits Required For Reward"
                type="number"
                value={milestoneVisit}
                onChange={(e) => setMilestoneVisit(e.target.value)}
                helperText="e.g. 3rd visit or 5th visit reward"
              />
              <Input
                label="Reward Title"
                value={rewardTitle}
                onChange={(e) => setRewardTitle(e.target.value)}
                placeholder="e.g. 15% Off Total Bill"
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Reward Type</label>
                <select
                  value={rewardType}
                  onChange={(e) => setRewardType(e.target.value as RewardType)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm p-2.5"
                >
                  <option value="percent_discount">Percentage Discount (%)</option>
                  <option value="fixed_discount">Fixed Value Discount (₹/$)</option>
                  <option value="free_product">Free Product / Dish</option>
                  <option value="free_service">Free Service Perk</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {step === 7 && (
          <Card className="p-8 bg-slate-900 border-slate-800 text-center space-y-6">
            <h2 className="text-xl font-bold text-slate-100">Your Business Customer QR Poster</h2>
            <p className="text-xs text-slate-400">Customers will scan this QR code at your store checkout to check-in.</p>
            <div className="bg-white p-6 rounded-2xl w-56 h-56 mx-auto flex items-center justify-center shadow-xl">
              <QRCodeSVG
                value={`https://druto.in/c/${bizSlug}`}
                size={180}
                level="H"
              />
            </div>
            <p className="text-xs text-teal-400 font-semibold font-mono">https://druto.in/c/{bizSlug}</p>
          </Card>
        )}

        {step === 8 && (
          <Card className="p-8 bg-slate-900 border-slate-800 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Workspace Ready!</h2>
            <p className="text-sm text-slate-300">
              Your business workspace <strong className="text-teal-400">{bizName}</strong> has been configured with catalog items, loyalty rules, and RLS database isolation.
            </p>
          </Card>
        )}

        <div className="flex items-center justify-between pt-4">
          {step > 2 ? (
            <Button variant="outline" size="md" onClick={() => setStep(step - 1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button variant="teal" size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
            {step === 8 ? 'Open Tenant Dashboard' : 'Continue Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};
