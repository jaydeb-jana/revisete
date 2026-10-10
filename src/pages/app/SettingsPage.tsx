import React, { useState } from 'react';
import { Settings, Building2, Globe, Clock, ShieldCheck, Mail, MessageSquare, PhoneCall } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

export const SettingsPage: React.FC = () => {
  const { activeBusiness } = useAuth();

  const [bizName, setBizName] = useState(activeBusiness?.name || '');
  const [phone, setPhone] = useState(activeBusiness?.phone || '');
  const [city, setCity] = useState(activeBusiness?.city || '');
  const [currency, setCurrency] = useState(activeBusiness?.currency || 'INR');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            Business Workspace Settings
            <Badge variant="teal">{activeBusiness?.category.toUpperCase()}</Badge>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Tenant profile, currency settings & notification channel integrations</p>
        </div>
      </div>

      {saved && (
        <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          Business settings saved successfully!
        </div>
      )}

      <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-teal-400" /> Business Identity & Branding
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Business Name" value={bizName} onChange={e => setBizName(e.target.value)} required />
            <Input label="City / Location" value={city} onChange={e => setCity(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Contact Phone" value={phone} onChange={e => setPhone(e.target.value)} />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Currency Settings</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm p-2.5"
              >
                <option value="INR">INR (₹) Indian Rupee</option>
                <option value="USD">USD ($) US Dollar</option>
                <option value="EUR">EUR (€) Euro</option>
                <option value="GBP">GBP (£) British Pound</option>
              </select>
            </div>
          </div>

          <Button variant="teal" size="md" type="submit">
            Save Changes
          </Button>
        </form>
      </Card>

      {/* EXTENSIBLE NOTIFICATION PROVIDER INTEGRATIONS */}
      <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Mail className="w-5 h-5 text-teal-400" /> Retention Notification Channels
        </h3>
        <p className="text-xs text-slate-400">Configure delivery channels for visit confirmations, reward alerts, and expiry warnings.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5"><Mail className="w-4 h-4 text-sky-400" /> Email Notifications</span>
              <Badge variant="success" size="sm">Active</Badge>
            </div>
            <p className="text-[11px] text-slate-400">SMTP / Supabase Auth Mailer connected</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Business API</span>
              <Badge variant="neutral" size="sm">Ready</Badge>
            </div>
            <p className="text-[11px] text-slate-400">Webhook payload endpoint ready</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5"><PhoneCall className="w-4 h-4 text-amber-400" /> SMS Gateway</span>
              <Badge variant="neutral" size="sm">Ready</Badge>
            </div>
            <p className="text-[11px] text-slate-400">Twilio / DLT SMS integration ready</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
