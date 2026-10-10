import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, MapPin, QrCode, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic Plan',
      price: '₹999',
      period: '/year',
      desc: 'Ideal for single location cafes, salons, or retail shops.',
      locations: '1 Business Location',
      popular: false,
      features: [
        '1 Business Location included',
        'Digital QR Stamp Card Engine',
        'FREE Physical QR Code Stand Delivered',
        'Customer CRM Directory & Churn Alerts',
        'Single-Use Reward Voucher Redemption',
        '3-Day Free Trial (No Card Required)',
      ],
    },
    {
      name: 'Growth Plan',
      price: '₹2,499',
      period: '/year',
      desc: 'Perfect for growing businesses with multiple branch outlets.',
      locations: 'Up to 3 Locations + GPS Auto-Detection',
      popular: true,
      features: [
        'Up to 3 Business Locations',
        'Single Universal QR Code for All Branches',
        'GPS Location Branch Auto-Detection',
        'Digital Stamp Cards & Scratch Cards',
        'FREE Physical QR Code Stands Delivered',
        'WhatsApp & SMS Automated Alerts',
        '3-Day Free Trial (No Card Required)',
      ],
    },
    {
      name: 'Pro Plan',
      price: '₹4,999',
      period: '/year',
      desc: 'For multi-outlet chains requiring deep analytics and staff controls.',
      locations: 'Up to 6 Locations + Priority Support',
      popular: false,
      features: [
        'Up to 6 Business Locations',
        'Single Universal QR Code + GPS Auto-Detect',
        'AI Digital Menu & Catalog Generator',
        'Unlimited Task Approvals & Social Proofs',
        'Dedicated Priority WhatsApp Support',
        'FREE Physical QR Code Stands Delivered',
        '3-Day Free Trial (No Card Required)',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="teal" className="px-3 py-1 uppercase tracking-wider text-xs">
              <Sparkles className="w-3.5 h-3.5" /> Simple Transparent Pricing
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
              Start Your 3-Day Free Trial Today
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              No credit card required. All paid plans include a FREE physical acrylic QR code stand delivered to your business.
            </p>
          </div>

          {/* PRICING CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, idx) => (
              <Card
                key={idx}
                className={`p-8 bg-slate-900 border flex flex-col justify-between space-y-6 relative ${
                  p.popular ? 'border-teal-500 shadow-2xl ring-1 ring-teal-500' : 'border-slate-800'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="teal" className="px-3 py-1 shadow-lg font-bold">
                      MOST POPULAR FOR MULTI-BRANCH
                    </Badge>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-100">{p.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-100">{p.price}</span>
                    <span className="text-xs text-slate-400 font-medium">{p.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  <p className="text-xs text-teal-400 font-bold bg-teal-500/10 p-2.5 rounded-lg border border-teal-500/20">
                    📍 {p.locations}
                  </p>

                  <ul className="space-y-2.5 pt-4 text-xs text-slate-300">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <Button
                    variant={p.popular ? 'teal' : 'outline'}
                    size="lg"
                    className="w-full"
                    onClick={() => navigate('/register')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Start 3-Day Free Trial
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-3xl mx-auto space-y-3">
            <h3 className="text-lg font-bold text-slate-100">Need Enterprise Multi-Location Support?</h3>
            <p className="text-xs text-slate-400">
              For enterprise chains with 10+ locations, custom POS integrations, or white-label mobile apps.
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate('/contact')}>
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
