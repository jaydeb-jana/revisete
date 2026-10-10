import React from 'react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="p-8 bg-slate-900 border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-100">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last updated: October 10, 2026</p>
          <p>
            Revisit ("we", "our", "us") values your privacy and is committed to protecting customer and business data.
            This Privacy Policy outlines how we collect, use, and safeguard personal information when using our customer retention SaaS platform.
          </p>
          <h2 className="text-lg font-bold text-slate-200">1. Data Minimization & Collection</h2>
          <p>
            We collect only necessary personal data: customer name, phone number, optional email, visit timestamp logs, and reward entitlement records required to operate loyalty check-ins.
          </p>
          <h2 className="text-lg font-bold text-slate-200">2. Tenant Isolation & RLS Protection</h2>
          <p>
            Customer data is strictly isolated per business tenant using Supabase PostgreSQL Row Level Security. Data is never shared or sold across tenants or third-party advertising networks.
          </p>
          <h2 className="text-lg font-bold text-slate-200">3. Customer Rights & Data Export</h2>
          <p>
            Business owners and end customers may request a complete export or deletion of their stored profile history by contacting support@revisit.saas.
          </p>
        </Card>
      </main>
      <PublicFooter />
    </div>
  );
};
