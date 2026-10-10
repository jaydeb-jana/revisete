import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  QrCode,
  Award,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Utensils,
  Scissors,
  ShoppingBag,
  Store,
  ShieldCheck,
  Zap,
  Repeat,
  Gift,
  Compass,
  MapPin,
  Dumbbell,
  Car,
  ChevronDown,
  HelpCircle,
  Smartphone,
  Navigation
} from 'lucide-react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { QRCodeSVG } from 'qrcode.react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Druto?',
      a: 'Druto is a digital loyalty rewards platform that helps local businesses (cafés, restaurants, salons, gyms, car washes) retain customers with QR-based digital stamp cards and scratch cards.'
    },
    {
      q: 'Do my customers need to download an app?',
      a: 'No! Customers simply scan your QR code with their phone camera and Druto opens directly in their mobile browser. They sign in with their mobile number and start collecting stamps.'
    },
    {
      q: 'Can I use one QR code for multiple branches?',
      a: 'Yes! With the Growth and Pro plans, you use a single QR code for all your branches. Druto automatically detects which branch a customer is at using GPS location.'
    },
    {
      q: 'Do I get a free QR code stand?',
      a: 'Yes! All paid plans come with a FREE physical QR code stand delivered directly to your business address so customers can easily scan and collect stamps at your counter.'
    },
    {
      q: 'What plans are available?',
      a: 'We offer Basic (₹999/year, 1 location), Growth (₹2499/year, up to 3 locations with GPS branch detection), and Pro (₹4999/year, up to 6 locations). All plans include a 3-day free trial with no credit card required.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1">
        {/* DRUTO HERO SECTION */}
        <section className="relative overflow-hidden py-20 lg:py-28 border-b border-slate-800/80">
          <div className="absolute inset-0 bg-gradient-to-b from-[#900A12]/15 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <Badge variant="danger" className="px-3.5 py-1 text-xs tracking-wide uppercase bg-[#900A12]/20 text-[#FB7185] border border-[#900A12]/40 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Turn Every Visit Into A Repeat Customer
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-slate-100 leading-tight">
                Digital Stamp Cards & QR Loyalty for{' '}
                <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-rose-500 bg-clip-text text-transparent">
                  Local Businesses
                </span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed font-normal">
                QR-based digital stamp cards, scratch cards, and an AI digital menu for cafés, salons, gyms, and restaurants. Set up in 2 minutes, 3-day free trial.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="druto" size="lg" onClick={() => navigate('/register')} rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start 3-Day Free Trial
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/explore')} leftIcon={<Compass className="w-5 h-5 text-rose-400" />}>
                  Explore Local Rewards
                </Button>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#FB7185]" /> No App Download Needed</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#FB7185]" /> GPS Branch Auto-Detection</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#FB7185]" /> Free Physical Stand Delivered</span>
              </div>
            </div>

            {/* DRUTO STAMP CARD MOCKUP DISPLAY */}
            <div className="mt-16 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-rose-900/40 shadow-2xl bg-[#1A1A1A] p-4 sm:p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-600" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-mono text-slate-400 ml-2">druto.in/c/the-curry-leaf — Customer Digital Pass</span>
                </div>
                <Badge variant="teal" size="sm">10-Stamp Card Active</Badge>
              </div>

              {/* INTERACTIVE STAMP BOARD PREVIEW */}
              <div className="bg-[#0F0F0F] p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-100 text-base">The Curry Leaf Bistro</h4>
                      <p className="text-xs text-rose-400">Collect 10 stamps = Free ₹1000 VIP Feast</p>
                    </div>
                    <Badge variant="warning" size="sm">5 Stamps Collected</Badge>
                  </div>

                  {/* 10 STAMPS GRID */}
                  <div className="grid grid-cols-5 gap-2.5 pt-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <div
                        key={n}
                        className={`h-12 rounded-xl flex flex-col items-center justify-center font-bold text-xs border ${
                          n <= 5
                            ? 'bg-[#900A12] text-white border-rose-500 shadow-lg shadow-rose-950/60'
                            : n === 10
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                            : 'bg-slate-900 text-slate-600 border-slate-800'
                        }`}
                      >
                        <span>#{n}</span>
                        {n <= 5 ? <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-white" /> : n === 10 ? <Gift className="w-3.5 h-3.5 mt-0.5 text-amber-400" /> : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#181818] p-4 rounded-xl border border-slate-800 text-center space-y-3">
                  <span className="text-[11px] font-bold uppercase text-amber-400">Scan QR to Collect Stamp</span>
                  <div className="bg-white p-3 rounded-xl inline-block mx-auto">
                    <QRCodeSVG value="https://druto.in/c/the-curry-leaf" size={110} />
                  </div>
                  <p className="text-[10px] text-slate-400">Open phone camera & scan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUSINESS CATEGORIES SECTION */}
        <section className="py-20 bg-[#171717] border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold font-serif text-slate-100">Works For Every Local Business</h2>
              <p className="text-slate-400 text-sm mt-3">
                Cafés, salons, gyms, car washes, and retail stores use Druto to turn visitors into regulars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-[#1A1A1A] border-slate-800 hover:border-rose-900/60 transition-all cursor-pointer group" onClick={() => navigate('/explore')}>
                <div className="w-11 h-11 rounded-xl bg-[#900A12]/15 border border-[#900A12]/30 flex items-center justify-center text-[#FB7185] mb-4 group-hover:scale-110 transition-transform">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-base">Cafés & Restaurants</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Digital stamp cards for meals, free coffee on 5th visit, and AI digital food menus.
                </p>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-slate-800 hover:border-rose-900/60 transition-all cursor-pointer group" onClick={() => navigate('/explore')}>
                <div className="w-11 h-11 rounded-xl bg-[#900A12]/15 border border-[#900A12]/30 flex items-center justify-center text-[#FB7185] mb-4 group-hover:scale-110 transition-transform">
                  <Scissors className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-base">Salons & Spas</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Hair spa loyalty perks, service duration tracking, and stylist allocation.
                </p>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-slate-800 hover:border-rose-900/60 transition-all cursor-pointer group" onClick={() => navigate('/explore')}>
                <div className="w-11 h-11 rounded-xl bg-[#900A12]/15 border border-[#900A12]/30 flex items-center justify-center text-[#FB7185] mb-4 group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-base">Gyms & Fitness</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Workout check-in stamps, free personal training sessions, and renewal discounts.
                </p>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-slate-800 hover:border-rose-900/60 transition-all cursor-pointer group" onClick={() => navigate('/explore')}>
                <div className="w-11 h-11 rounded-xl bg-[#900A12]/15 border border-[#900A12]/30 flex items-center justify-center text-[#FB7185] mb-4 group-hover:scale-110 transition-transform">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-base">Car Washes & Retail</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Free foam wash on 6th visit, referral discounts, and instant scratch card perks.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* DRUTO KEY FEATURES */}
        <section className="py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="danger" className="bg-[#900A12]/20 text-[#FB7185] border border-[#900A12]/40 font-bold">
                Built For Local Growth
              </Badge>
              <h2 className="text-3xl font-extrabold font-serif text-slate-100 mt-3">Why Local Businesses Choose Druto</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 bg-[#1A1A1A] border-slate-800 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#900A12]/20 border border-[#900A12]/40 flex items-center justify-center text-[#FB7185]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-100">No App Download Needed</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Customers scan your QR code with their phone camera. Druto opens instantly in the browser — no app install friction.
                </p>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-slate-800 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#900A12]/20 border border-[#900A12]/40 flex items-center justify-center text-[#FB7185]">
                  <Navigation className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-100">GPS Multi-Branch Auto-Detect</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Use one single QR code stand across all your branch outlets. Druto automatically detects which location the customer is at using GPS.
                </p>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-slate-800 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#900A12]/20 border border-[#900A12]/40 flex items-center justify-center text-[#FB7185]">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-100">Digital Scratch Cards</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Surprise customer visits with interactive digital scratch cards to unlock surprise vouchers and instant discounts.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section className="py-20 bg-[#171717] border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold font-serif text-slate-100">Simple Transparent Pricing</h2>
              <p className="text-slate-400 text-sm">3-day free trial on all plans. Free physical QR code stand delivered.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 bg-[#1A1A1A] border-slate-800 space-y-4 text-center">
                <h3 className="font-bold text-slate-100 text-lg">Basic Plan</h3>
                <p className="text-3xl font-extrabold text-slate-100">₹999 <span className="text-xs font-normal text-slate-400">/year</span></p>
                <p className="text-xs text-slate-400">1 Location included • Free Stand</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/pricing')}>View Plan</Button>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-[#900A12] space-y-4 text-center relative ring-1 ring-[#900A12]">
                <Badge variant="danger" className="bg-[#900A12] text-white">MOST POPULAR</Badge>
                <h3 className="font-bold text-slate-100 text-lg">Growth Plan</h3>
                <p className="text-3xl font-extrabold text-slate-100">₹2,499 <span className="text-xs font-normal text-slate-400">/year</span></p>
                <p className="text-xs text-slate-400">Up to 3 Locations • GPS Auto-Detect</p>
                <Button variant="druto" size="sm" className="w-full" onClick={() => navigate('/pricing')}>Start Free Trial</Button>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-slate-800 space-y-4 text-center">
                <h3 className="font-bold text-slate-100 text-lg">Pro Plan</h3>
                <p className="text-3xl font-extrabold text-slate-100">₹4,999 <span className="text-xs font-normal text-slate-400">/year</span></p>
                <p className="text-xs text-slate-400">Up to 6 Locations • Priority Support</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/pricing')}>View Plan</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold font-serif text-slate-100">Frequently Asked Questions</h2>
              <p className="text-slate-400 text-sm">Everything you need to know about Druto loyalty cards.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Card
                  key={idx}
                  className="p-5 bg-[#1A1A1A] border-slate-800 cursor-pointer transition-colors hover:border-rose-900/50"
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                >
                  <div className="flex items-center justify-between font-semibold text-slate-100 text-base">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#FB7185] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${faqOpen === idx ? 'rotate-180 text-[#FB7185]' : ''}`} />
                  </div>
                  {faqOpen === idx && (
                    <p className="mt-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 pl-8">
                      {faq.a}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};
