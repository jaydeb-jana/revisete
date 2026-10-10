import React, { useState } from 'react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'How does Revisit prevent customers from scanning the QR code repeatedly to get fake visits?',
      a: 'Revisit enforces server-validated cooldown periods (configurable, default 4 hours) and optional minimum spend limits per visit. Repeated scans within the cooldown window are rejected by the system.'
    },
    {
      q: 'Can Revisit support multiple businesses under one account?',
      a: 'Yes! Revisit supports multi-tenant workspace switching. A business owner can seamlessly manage a restaurant, a salon, and a clothing store from a single account login.'
    },
    {
      q: 'Does Revisit force positive Google reviews or generate fake reviews?',
      a: 'No. Revisit complies strictly with review platform guidelines. Social tasks (such as Instagram follows or story tags) require manual proof photo uploads which staff verify before issuing vouchers.'
    },
    {
      q: 'What currency settings are supported?',
      a: 'Revisit defaults to INR (₹) for Indian businesses, and can be configured to USD ($), EUR (€), GBP (£), or any standard global currency in business settings.'
    },
    {
      q: 'How are rewards redeemed safely at checkout?',
      a: 'Every unlocked reward receives a unique single-use redemption code or QR badge. Staff enter or scan the code in the tenant app to validate and immediately redeem it.'
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="teal">Help Center</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Got questions about QR check-ins, security, or business customization? We have answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                className="p-5 bg-slate-900 border-slate-800 cursor-pointer transition-colors hover:border-slate-700"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <div className="flex items-center justify-between font-semibold text-slate-100 text-base">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-teal-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-teal-400' : ''}`} />
                </div>
                {openIdx === idx && (
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3 pl-8">
                    {faq.a}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
