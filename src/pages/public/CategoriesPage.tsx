import React from 'react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Utensils, Scissors, ShoppingBag, Store, CheckCircle, ArrowRight } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="teal">Multi-Tenant Business Adaptability</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
              Tailored Workflows For Every Industry
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Revisit provides dedicated schema fields and customized loyalty engines so you never have to force a restaurant menu into a clothing shop or salon context.
            </p>
          </div>

          <div className="space-y-12">
            {/* RESTAURANT SECTION */}
            <Card className="p-8 bg-slate-900 border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-100">Restaurants, Cafes & Food Outlets</h2>
                      <p className="text-xs text-teal-400 font-medium">Diet Tags • Appetizers • Dining Milestones</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Set up digital food menus, classify dishes with Veg/Non-Veg/Vegan tags, and reward frequent diners with complimentary appetizers on their 5th visit or ₹1000 off on anniversary visits.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /> Dynamic table & counter QR posters</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /> Minimum spend requirement (e.g. ₹300)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /> Instagram food tagging tasks</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /> Peak hour visit cooldowns</li>
                  </ul>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Example Reward Track</span>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="font-semibold text-slate-200">Visit 1: Welcome Drink</span>
                      <span className="text-teal-400">Free Lassi</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="font-semibold text-slate-200">Visit 3: Bill Discount</span>
                      <span className="text-teal-400">15% Off</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="font-semibold text-slate-200">Visit 5: Starter Treat</span>
                      <span className="text-teal-400">Free Paneer Tikka</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* SALON SECTION */}
            <Card className="p-8 bg-slate-900 border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-100">Salons, Barbershops & Spas</h2>
                      <p className="text-xs text-teal-400 font-medium">Service Durations • Stylist Allocation • Skincare Perks</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Manage service catalogs with exact duration minutes (e.g. 60 min Keratin treatment), assign primary stylists, and offer free head massages or hair treatments to loyal repeat clients.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /> Service duration tracking</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /> Assigned stylist metadata</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /> Churn reminders for 30+ day absences</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /> Referral rewards for bringing friends</li>
                  </ul>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Example Salon Track</span>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="font-semibold text-slate-200">Visit 2: Head Massage</span>
                      <span className="text-teal-400">Complimentary</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="font-semibold text-slate-200">Visit 6: Hair Cut & Styling</span>
                      <span className="text-teal-400">50% Off</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center pt-8">
            <Button variant="primary" size="lg" onClick={() => navigate('/register')} rightIcon={<ArrowRight className="w-5 h-5" />}>
              Create Business Profile Now
            </Button>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
