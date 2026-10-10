import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Utensils,
  Users,
  QrCode,
  Award,
  CheckSquare,
  Gift,
  Share2,
  Settings,
  ShieldAlert,
  Bell,
  LogOut,
  ChevronDown,
  Building2,
  Plus,
  RefreshCw,
  User,
  Sparkles,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const AppLayout: React.FC = () => {
  const { user, businesses, activeBusiness, setActiveBusiness, logout } = useAuth();
  const { notifications, markNotificationRead, visits, customers, rewards } = useBusiness();
  const navigate = useNavigate();
  const location = useLocation();

  // Metric calculation for Druto Header Strip
  const scansCount = visits.length;
  const usersCount = customers.length;
  const rewardsCount = rewards.filter(r => r.status === 'redeemed').length;
  const repeatCount = customers.filter(c => c.total_visits > 1).length;
  const repeatPercent = usersCount > 0 ? Math.round((repeatCount / usersCount) * 100) : 0;

  const mobileNavItems = [
    { to: '/app/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/app/customers', label: 'Customers', icon: Users },
    { to: '/app/rewards', label: 'Winners', icon: Gift },
    { to: '/app/loyalty', label: 'Create Offer', icon: Settings },
  ];

  const desktopNavItems = [
    { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/app/catalog', label: 'Catalog', icon: Utensils },
    { to: '/app/customers', label: 'Customers', icon: Users },
    { to: '/app/visits', label: 'Visits & Stamp Engine', icon: QrCode },
    { to: '/app/branches', label: 'Multi-Branch GPS', icon: MapPin },
    { to: '/app/loyalty', label: 'Loyalty Milestones', icon: Award },
    { to: '/app/tasks', label: 'Tasks & Approvals', icon: CheckSquare },
    { to: '/app/rewards', label: 'Rewards & Redemption', icon: Gift },
    { to: '/app/referrals', label: 'Referral Program', icon: Share2 },
    { to: '/app/settings', label: 'Business Settings', icon: Settings },
  ];

  if (user?.is_platform_admin) {
    desktopNavItems.push({ to: '/admin', label: 'Platform Admin', icon: ShieldAlert });
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      {/* DESKTOP SIDEBAR NAVIGATION */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200/80 flex-col shrink-0">
        {/* BRAND & WORKSPACE */}
        <div className="p-4 border-b border-slate-200 relative">
          <div className="flex items-center justify-between mb-3">
            <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-900 font-serif">
              <div className="w-8 h-8 rounded-xl bg-[#900A12] flex items-center justify-center text-white shadow-md">
                <RefreshCw className="w-4.5 h-4.5" />
              </div>
              <span className="text-[#900A12]">Druto</span>
            </Link>
          </div>

          <div className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center gap-2.5 text-left">
            {activeBusiness?.logo_url ? (
              <img
                src={activeBusiness.logo_url}
                alt={activeBusiness.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#900A12] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {activeBusiness?.name.slice(0, 2).toUpperCase() || 'AR'}
              </div>
            )}
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">{activeBusiness?.name}</p>
              <p className="text-[10px] text-slate-500 font-medium capitalize">
                {activeBusiness?.category?.replace('_', ' ') || 'Cafe'}
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#900A12] text-white shadow-md shadow-rose-950/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* USER PROFILE FOOTER */}
        <div className="p-3 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#900A12] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-800 truncate">{user?.full_name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* DRUTO CRIMSON MAROON TOP HEADER (RENDERED ONLY ON DASHBOARD PAGE) */}
        {location.pathname === '/app/dashboard' && (
          <header className="bg-[#800A12] text-white p-5 rounded-b-[2rem] shadow-lg space-y-4">
            {/* HEADER TOP ROW */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeBusiness?.logo_url ? (
                  <img
                    src={activeBusiness.logo_url}
                    alt={activeBusiness.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0 border-2 border-white/40 shadow-md"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-white/40 flex items-center justify-center shrink-0 shadow-md">
                    <div className="w-full h-full rounded-full bg-[#800A12] flex items-center justify-center font-extrabold text-xs text-white">
                      {activeBusiness?.name.slice(0, 2).toUpperCase() || 'AR'}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-serif">{activeBusiness?.name}</h2>
                    <span className="bg-[#4D0409]/80 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {activeBusiness?.status === 'trial' ? 'Trial' : activeBusiness?.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-200 capitalize font-medium">{activeBusiness?.category} • Druto Partner</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/app/settings')}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                title="Account Settings"
              >
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* TOP 4 METRICS STRIP (EXACT SCREENSHOT REPLICA) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div className="bg-white/10 border border-white/15 rounded-2xl p-2.5 text-center space-y-1">
                <TrendingUp className="w-4 h-4 mx-auto text-rose-200" />
                <p className="text-lg font-extrabold text-white">{scansCount}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-rose-200">SCANS</p>
              </div>

              <div className="bg-white/10 border border-white/15 rounded-2xl p-2.5 text-center space-y-1">
                <Users className="w-4 h-4 mx-auto text-rose-200" />
                <p className="text-lg font-extrabold text-white">{usersCount}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-rose-200">USERS</p>
              </div>

              <div className="bg-white/10 border border-white/15 rounded-2xl p-2.5 text-center space-y-1">
                <Gift className="w-4 h-4 mx-auto text-rose-200" />
                <p className="text-lg font-extrabold text-white">{rewardsCount}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-rose-200">REWARDS</p>
              </div>

              <div className="bg-white/10 border border-white/15 rounded-2xl p-2.5 text-center space-y-1">
                <Award className="w-4 h-4 mx-auto text-rose-200" />
                <p className="text-lg font-extrabold text-white">{repeatPercent}%</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-rose-200">REPEAT</p>
              </div>
            </div>
          </header>
        )}

        {/* BODY CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* DRUTO FIXED BOTTOM MOBILE NAVIGATION BAR (EXACT SCREENSHOT REPLICA) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-2xl">
        {mobileNavItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-[#900A12]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-rose-100 text-[#900A12]' : 'bg-transparent'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-bold ${isActive ? 'text-[#900A12]' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
