import React from 'react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { QrCode, Award, Users, CheckCircle, Shield, Gift, Share2, BarChart2 } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="teal">Platform Architecture</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
              Built For Retention, Verification & Growth
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore the technical features that prevent duplicate scans, safeguard customer data, and drive real repeat revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Dynamic QR Check-In Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Unique QR codes linked to every tenant workspace. Features configurable visit cooldowns (e.g. 4 hours) and minimum purchase rules to guarantee legitimate visit counts.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Milestone Loyalty Program</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Configure tiered rewards based on visit frequencies. Supports percentage discounts, fixed-value vouchers, free menu items, and custom add-ons with automatic expiry management.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Honest Task Proof Verification</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Enable Instagram follow or story share tasks. Customers submit proof images which staff review before issuing vouchers. Strictly avoids fake ratings or policy violations.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Single-Use Redemption Validator</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Unique cryptographic redemption codes generated for every unlocked reward. Staff validate codes in real-time with instant single-use mark to eliminate fraud.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Customer CRM & Churn Risk Alert</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Complete profile directory with visit histories, total lifetime visits, and automated flagging of inactive customers who haven't returned in over 30 days.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Supabase RLS Tenant Isolation</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Enterprise security with Supabase Row Level Security. Data is strictly isolated per business workspace ensuring zero cross-tenant data leaks.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
