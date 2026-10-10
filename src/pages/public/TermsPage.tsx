import React from 'react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="p-8 bg-slate-900 border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-100">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last updated: October 10, 2026</p>
          <p>
            By accessing or using the Revisit SaaS platform, you agree to comply with and be bound by these Terms of Service.
          </p>
          <h2 className="text-lg font-bold text-slate-200">1. Permitted Use & Verification Integrity</h2>
          <p>
            Business owners agree not to create fraudulent visits, manipulate customer reward redemptions, or condition rewards on forced positive Google or social ratings in violation of platform policies.
          </p>
          <h2 className="text-lg font-bold text-slate-200">2. Account Responsibility</h2>
          <p>
            Businesses are responsible for maintaining the confidentiality of staff access credentials and approving customer task submissions in good faith.
          </p>
        </Card>
      </main>
      <PublicFooter />
    </div>
  );
};
