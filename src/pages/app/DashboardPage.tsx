import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Repeat,
  QrCode,
  Gift,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  CreditCard,
  Rocket
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { customers, visits, rewards } = useBusiness();
  const navigate = useNavigate();

  const now = new Date().getTime();
  const inactiveCustomers = customers.filter(c => {
    if (!c.last_visit_at) return true;
    const days = (now - new Date(c.last_visit_at).getTime()) / (1000 * 60 * 60 * 24);
    return days > 30;
  });

  const chartData = [
    { day: 'Mon', visits: 18, rewards: 4 },
    { day: 'Tue', visits: 24, rewards: 6 },
    { day: 'Wed', visits: 32, rewards: 9 },
    { day: 'Thu', visits: 28, rewards: 7 },
    { day: 'Fri', visits: 45, rewards: 14 },
    { day: 'Sat', visits: 62, rewards: 22 },
    { day: 'Sun', visits: 54, rewards: 18 },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* DRUTO EXACT UPGRADE BANNER CARD (EXACT REPLICA FROM SCREENSHOT) */}
      <div className="bg-[#F0F7FF] border border-sky-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Upgrade Your Customer Experience & Boost Loyalty! <Rocket className="w-7 h-7 text-[#900A12]" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Join Druto and start rewarding your best customers instantly. Subscribe now to get your account set up and receive your physical QR code kit in the mail.
          </p>
        </div>

        {/* SUBSCRIPTION PRICE BOX */}
        <div className="bg-[#FFFBEB] text-slate-900 p-4 rounded-2xl max-w-sm border border-amber-200 shadow-sm space-y-1 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">SPECIAL ANNUAL SUBSCRIPTION</p>
          <p className="text-3xl font-extrabold text-slate-900">
            Just ₹999 <span className="text-xs font-bold text-slate-600">/ YEAR</span>
          </p>
        </div>

        <div>
          <Button
            variant="druto"
            size="lg"
            className="bg-[#0F172A] hover:bg-slate-900 text-white font-bold px-8 py-3.5 shadow-md border border-slate-800"
            onClick={() => navigate('/pricing')}
            leftIcon={<CreditCard className="w-5 h-5 text-amber-400" />}
          >
            💳 PAY NOW
          </Button>
        </div>
      </div>

      {/* QUICK SCAN & QR CODE ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-serif">
              <QrCode className="w-5 h-5 text-[#900A12]" /> Scan Customer Check-In
            </h3>
            <Badge variant="druto">Quick Action</Badge>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Record customer QR scan at checkout to increment their digital stamp card (10 stamps per card).
          </p>
          <Button variant="druto" size="md" className="w-full" onClick={() => navigate('/app/visits')} leftIcon={<QrCode className="w-4 h-4" />}>
            Open QR Scan Tool
          </Button>
        </Card>

        <Card className="p-6 bg-white border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-serif">
              <Gift className="w-5 h-5 text-amber-600" /> Redeem Reward Voucher
            </h3>
            <Badge variant="warning">Single-Use Code</Badge>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Validate customer single-use redemption codes or digital scratch card vouchers.
          </p>
          <Button variant="outline" size="md" className="w-full" onClick={() => navigate('/app/rewards')} leftIcon={<Gift className="w-4 h-4 text-amber-600" />}>
            Open Voucher Scanner
          </Button>
        </Card>
      </div>

      {/* VISIT TREND CHART & CHURN RISK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border-slate-200/80 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-serif text-slate-900">Customer Visit Trends</h3>
            <Badge variant="druto">Weekly Data</Badge>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#900A12" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#900A12" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="visits" stroke="#900A12" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* INACTIVE CHURN RISK CUSTOMERS */}
        <Card className="p-6 bg-white border-slate-200/80 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Churn Risk Alert
              </h3>
              <Badge variant="warning">{inactiveCustomers.length} Absent</Badge>
            </div>
            <div className="divide-y divide-slate-100">
              {inactiveCustomers.slice(0, 3).map(c => (
                <div key={c.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{c.name}</p>
                    <p className="text-[10px] text-slate-500">{c.phone || c.email}</p>
                  </div>
                  <Badge variant="neutral" size="sm">{c.total_visits} Visits</Badge>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate('/app/customers')}>
            View All Customer Profiles
          </Button>
        </Card>
      </div>
    </div>
  );
};
