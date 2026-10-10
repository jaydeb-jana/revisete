import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldCheck, Heart } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0A0A0A] text-slate-400 text-sm py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 font-extrabold text-xl text-slate-100 font-serif">
              <div className="w-8 h-8 rounded-lg bg-[#900A12]/20 border border-[#900A12]/40 flex items-center justify-center text-[#FB7185]">
                <RefreshCw className="w-4 h-4" />
              </div>
              Druto
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's leading QR loyalty program & digital stamp cards platform for local cafés, salons, gyms, car washes, and retail stores.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Product & Discovery</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/explore" className="hover:text-rose-400">Explore Local Rewards</Link></li>
              <li><Link to="/pricing" className="hover:text-rose-400">Pricing & Free Trial</Link></li>
              <li><Link to="/features" className="hover:text-rose-400">Digital Stamp Cards</Link></li>
              <li><Link to="/features" className="hover:text-rose-400">GPS Branch Auto-Detection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Use Cases</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/categories" className="hover:text-rose-400">Cafés & Restaurants</Link></li>
              <li><Link to="/categories" className="hover:text-rose-400">Salons & Spas</Link></li>
              <li><Link to="/categories" className="hover:text-rose-400">Gyms & Fitness Centers</Link></li>
              <li><Link to="/categories" className="hover:text-rose-400">Car Washes & Retail</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/contact" className="hover:text-rose-400">Contact & Support</Link></li>
              <li><Link to="/privacy" className="hover:text-rose-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-rose-400">Terms of Service</Link></li>
              <li><Link to="/faq" className="hover:text-rose-400">FAQ & Documentation</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Druto. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Multi-tenant RLS Protected & Verified
          </div>
        </div>
      </div>
    </footer>
  );
};
