import React, { useState, useRef } from 'react';
import { Building2, User, Mail, Phone, Upload, Image as ImageIcon, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { NoticeModal } from '../../components/ui/NoticeModal';

const INDIAN_STATES = [
  'West Bengal',
  'Karnataka',
  'Maharashtra',
  'Delhi',
  'Tamil Nadu',
  'Gujarat',
  'Uttar Pradesh',
  'Telangana',
  'Kerala',
  'Punjab',
  'Rajasthan',
  'Odisha',
  'Bihar',
  'Assam',
  'Haryana',
  'Madhya Pradesh',
  'Andhra Pradesh',
];

const BUSINESS_CATEGORIES = [
  { value: 'restaurant_cafe', label: 'Restaurant & Cafe' },
  { value: 'salon_spa', label: 'Salon, Beauty Parlour & Spa' },
  { value: 'hotel_resort', label: 'Hotel, Resort & Hospitality' },
  { value: 'fashion_retail', label: 'Fashion, Apparel & Boutique' },
  { value: 'grocery_supermarket', label: 'Grocery, Mart & Supermarket' },
  { value: 'bakery_sweet', label: 'Bakery, Sweets & Confectionery' },
  { value: 'gym_fitness', label: 'Gym, Fitness & Sports Club' },
  { value: 'electronics_mobile', label: 'Electronics, Computer & Mobile Shop' },
  { value: 'pharmacy_health', label: 'Pharmacy, Medical & Healthcare' },
  { value: 'auto_workshop', label: 'Auto Workshop & Garage' },
  { value: 'other', label: 'Other Business' },
];

export const SettingsPage: React.FC = () => {
  const { activeBusiness, updateActiveBusiness, user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Business Information State
  const [bizName, setBizName] = useState(activeBusiness?.name || 'The Curry Leaf Bistro');
  const [bizCategory, setBizCategory] = useState(activeBusiness?.category || 'restaurant_cafe');
  const [customCategory, setCustomCategory] = useState('');
  const [logoUrl, setLogoUrl] = useState(activeBusiness?.logo_url || '');
  const country = 'India'; // Fixed default, read-only
  const [selectedState, setSelectedState] = useState('Karnataka');
  const [bizPhone, setBizPhone] = useState(activeBusiness?.phone || '+91 98765 43210');
  const [bizEmail, setBizEmail] = useState(activeBusiness?.email || 'hello@curryleafbistro.com');

  // Admin / Owner Information State
  const [ownerName, setOwnerName] = useState(user?.full_name || 'Ajay Deb');
  const [ownerEmail, setOwnerEmail] = useState(user?.email || 'janajaydeb36@gmail.com');

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Logo File Upload Handling with 2MB Max Limit
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE_BYTES) {
      setNoticeMessage('Logo file size exceeds the 2MB maximum limit! Please select an image under 2MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setLogoUrl(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const catToSave = bizCategory === 'other' && customCategory ? customCategory : bizCategory;
    
    updateActiveBusiness({
      name: bizName,
      category: catToSave as any,
      logo_url: logoUrl,
      phone: bizPhone,
      email: bizEmail,
    });

    setNoticeMessage('Business settings and logo updated successfully! Changes are live across the application.');
  };

  const getCategoryLabel = () => {
    if (bizCategory === 'other' && customCategory) {
      return customCategory.toUpperCase();
    }
    const found = BUSINESS_CATEGORIES.find(c => c.value === bizCategory);
    return found ? found.label.toUpperCase() : 'RESTAURANT & CAFE';
  };

  return (
    <div className="space-y-8 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Business Workspace Settings
            <Badge variant="druto">{getCategoryLabel()}</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage your business profile, logo, location details, currency and admin credentials</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. BUSINESS DETAILS SECTION */}
        <Card className="p-6 bg-white border-slate-200/80 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#800A12]" /> Business Details
            </h3>
            <Badge variant="druto" size="sm">Primary Workspace</Badge>
          </div>

          <div className="space-y-6">
            {/* Business Logo Upload Section */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Business Logo (Max Size: 2MB)
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Business Logo Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#800A12] text-white flex items-center justify-center font-extrabold text-lg">
                      {bizName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-file-upload"
                    />
                    <label
                      htmlFor="logo-file-upload"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#800A12] text-white hover:bg-rose-900 cursor-pointer transition-colors shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload Logo
                    </label>

                    {logoUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveLogo}
                        className="text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove Logo
                      </Button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Supported formats: PNG, JPG, WEBP, SVG. Maximum file size: 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Name */}
            <Input
              label="Business Name *"
              value={bizName}
              onChange={e => setBizName(e.target.value)}
              required
              placeholder="e.g. The Curry Leaf Bistro"
            />

            {/* Business Type / Category Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Business Type / Category *
              </label>
              <select
                value={bizCategory}
                onChange={e => setBizCategory(e.target.value)}
                className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12] font-semibold"
              >
                {BUSINESS_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Business Type Input if 'Other' is selected */}
            {bizCategory === 'other' && (
              <Input
                label="Specify Custom Business Type *"
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
                required
                placeholder="e.g. Pet Care & Grooming Clinic, Event Management, Photography Studio"
              />
            )}

            {/* Country & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  disabled
                  readOnly
                  className="w-full rounded-xl bg-slate-100 border border-slate-300 text-slate-500 text-sm p-2.5 font-semibold cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400">Country is fixed to India by default.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  State *
                </label>
                <select
                  value={selectedState}
                  onChange={e => setSelectedState(e.target.value)}
                  className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12] font-semibold"
                >
                  {INDIAN_STATES.map(st => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Business Phone & Business Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Business Phone Number *"
                type="tel"
                value={bizPhone}
                onChange={e => setBizPhone(e.target.value)}
                required
                placeholder="+91 98765 43210"
              />

              <Input
                label="Business Email Address *"
                type="email"
                value={bizEmail}
                onChange={e => setBizEmail(e.target.value)}
                required
                placeholder="hello@curryleafbistro.com"
              />
            </div>

            {/* Currency Settings */}
            <div className="space-y-1.5 max-w-md">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Currency Settings
              </label>
              <input
                type="text"
                value="INR (₹) Indian Rupee"
                disabled
                readOnly
                className="w-full rounded-xl bg-slate-100 border border-slate-300 text-slate-500 text-sm p-2.5 font-semibold cursor-not-allowed"
              />
              <p className="text-[11px] text-slate-400">Currency is fixed to Indian Rupee (INR) by default.</p>
            </div>
          </div>
        </Card>

        {/* 2. ADMIN / OWNER DETAILS SECTION */}
        <Card className="p-6 bg-white border-slate-200/80 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-[#800A12]" /> Admin / Owner Information
            </h3>
            <Badge variant="success" size="sm">Verified Account Owner</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Owner Name *"
              value={ownerName}
              onChange={e => setOwnerName(e.target.value)}
              required
              placeholder="e.g. Ajay Deb"
            />

            <Input
              label="Owner Email Address *"
              type="email"
              value={ownerEmail}
              onChange={e => setOwnerEmail(e.target.value)}
              required
              placeholder="janajaydeb36@gmail.com"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="druto" size="md" type="submit">
              Save Settings
            </Button>
          </div>
        </Card>
      </form>

      {/* CUSTOM NOTICE MODAL */}
      <NoticeModal
        isOpen={Boolean(noticeMessage)}
        onClose={() => setNoticeMessage(null)}
        title="Settings & Logo Notice"
        message={noticeMessage || ''}
      />
    </div>
  );
};
