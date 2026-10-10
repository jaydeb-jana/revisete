import React from 'react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { QrCode, Award, CheckSquare, Gift, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: 'Step 1',
      title: 'Create Your Business Workspace',
      description: 'Register and set up your business profile, logo, operating hours, currency, and catalog items.',
      icon: QrCode,
    },
    {
      step: 'Step 2',
      title: 'Configure Loyalty Program & Rewards',
      description: 'Define visit milestones (e.g. 1st visit bonus, 3rd visit discount, 5th visit free starter, 10th visit VIP perk).',
      icon: Award,
    },
    {
      step: 'Step 3',
      title: 'Display QR Code Poster at Store',
      description: 'Print or present your unique QR code at your checkout counter or dining tables.',
      icon: CheckSquare,
    },
    {
      step: 'Step 4',
      title: 'Customers Scan & Redeem Rewards',
      description: 'Customers scan to record visits. Server logic unlocks rewards which staff validate instantly upon redemption.',
      icon: Gift,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="teal">Simple 4-Step Workflow</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
              How Revisit Grows Your Business
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Get up and running in under 5 minutes without technical expertise or expensive hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Card key={idx} className="p-6 bg-slate-900 border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">{s.step}</span>
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
                </Card>
              );
            })}
          </div>

          <div className="text-center pt-8">
            <Button variant="primary" size="lg" onClick={() => navigate('/register')} rightIcon={<ArrowRight className="w-5 h-5" />}>
              Get Started Free Today
            </Button>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
