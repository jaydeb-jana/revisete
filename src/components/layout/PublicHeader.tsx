import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const PublicHeader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-100 group">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all">
            <RefreshCw className="w-5 h-5" />
          </div>
          <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-teal-400 bg-clip-text text-transparent font-extrabold">
            Druto
          </span>
          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
            QR Loyalty
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/explore" className="hover:text-teal-400 transition-colors flex items-center gap-1">
            <Compass className="w-4 h-4 text-teal-400" /> Explore Rewards
          </Link>
          <Link to="/pricing" className="hover:text-teal-400 transition-colors">Pricing & Plans</Link>
          <Link to="/features" className="hover:text-teal-400 transition-colors">Features</Link>
          <Link to="/categories" className="hover:text-teal-400 transition-colors">Use Cases</Link>
          <Link to="/how-it-works" className="hover:text-teal-400 transition-colors">How it Works</Link>
          <Link to="/faq" className="hover:text-teal-400 transition-colors">FAQ</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Button variant="teal" size="sm" onClick={() => navigate('/app/dashboard')}>
              Go to Workspace <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-slate-100 px-3 py-2">
                Sign In
              </Link>
              <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                3-Day Free Trial
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
