import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  RefreshCw,
  QrCode,
  Award,
  Gift,
  CheckCircle2,
  Sparkles,
  Share2,
  Copy,
  Clock,
  Phone,
  MapPin,
  Utensils
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';

export const CustomerPortalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { businesses } = useAuth();
  const { milestones, tasks, rewards, submitTask, recordVisit, customers } = useBusiness();

  // Active business matched by slug
  const business = businesses.find(b => b.slug === slug) || businesses[0];
  const customer = customers[0]; // Active customer session simulation

  const [activeTab, setActiveTab] = useState<'loyalty' | 'tasks' | 'rewards'>('loyalty');
  const [isCheckInSuccess, setIsCheckInSuccess] = useState(false);
  const [checkInMsg, setCheckInMsg] = useState('');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [proofNotes, setProofNotes] = useState('');

  const currencySymbol = business?.currency === 'USD' ? '$' : business?.currency === 'EUR' ? '€' : '₹';

  const handleSimulateScan = () => {
    const res = recordVisit(customer.id, 450, 'Customer self QR scan');
    setCheckInMsg(res.message);
    setIsCheckInSuccess(true);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;
    submitTask(
      selectedTask.id,
      customer.id,
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80',
      proofNotes || 'Uploaded proof screenshot'
    );
    setSelectedTask(null);
    setProofNotes('');
    alert('Task proof submitted successfully for staff review!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans max-w-md mx-auto border-x border-slate-800 shadow-2xl">
      {/* PORTAL BRAND HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 text-center space-y-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <RefreshCw className="w-3.5 h-3.5 text-teal-400" /> Powered by Revisit
          </Link>
          <Badge variant="teal" size="sm">Loyalty Pass</Badge>
        </div>

        <div className="pt-2 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-extrabold text-xl mb-2">
            {business?.name.slice(0, 2) || 'BIZ'}
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">{business?.name}</h1>
          <p className="text-xs text-slate-400">{business?.description || 'Exclusive Customer Loyalty & Rewards Portal'}</p>
        </div>
      </header>

      {/* QUICK SCAN CHECK-IN BANNER */}
      <div className="p-4 bg-teal-500/10 border-b border-teal-500/20 text-center space-y-3">
        <p className="text-xs text-slate-200">Are you currently at the store?</p>
        <Button variant="primary" size="md" className="w-full" onClick={handleSimulateScan} leftIcon={<QrCode className="w-4 h-4" />}>
          Tap to Check-In & Earn Stamp
        </Button>
        {isCheckInSuccess && (
          <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            {checkInMsg}
          </div>
        )}
      </div>

      {/* TAB NAVIGATION */}
      <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('loyalty')}
          className={`py-3 text-center border-b-2 ${activeTab === 'loyalty' ? 'border-teal-400 text-teal-400 bg-slate-800/40' : 'border-transparent text-slate-400'}`}
        >
          Stamp Card
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`py-3 text-center border-b-2 ${activeTab === 'tasks' ? 'border-teal-400 text-teal-400 bg-slate-800/40' : 'border-transparent text-slate-400'}`}
        >
          Earn Rewards
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`py-3 text-center border-b-2 ${activeTab === 'rewards' ? 'border-teal-400 text-teal-400 bg-slate-800/40' : 'border-transparent text-slate-400'}`}
        >
          My Vouchers
        </button>
      </div>

      {/* TAB CONTENTS */}
      <main className="flex-1 p-4 space-y-6">
        {/* TAB 1: STAMP CARD & MILESTONES */}
        {activeTab === 'loyalty' && (
          <div className="space-y-6">
            <Card className="p-5 bg-slate-900 border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{customer?.name}</h3>
                  <p className="text-[10px] font-mono text-teal-400">{customer?.membership_number}</p>
                </div>
                <Badge variant="teal" size="sm">{customer?.total_visits || 0} Total Visits</Badge>
              </div>

              {/* STAMP CARD PROGRESS GRID */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Visit Stamp Milestones</span>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                    const isCompleted = (customer?.total_visits || 0) >= num;
                    const isMilestone = milestones.some(m => m.visit_number === num);
                    return (
                      <div
                        key={num}
                        className={`h-12 rounded-xl flex flex-col items-center justify-center text-xs font-bold border transition-all ${
                          isCompleted
                            ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md'
                            : isMilestone
                            ? 'bg-slate-800 text-teal-300 border-teal-500/50'
                            : 'bg-slate-950 text-slate-600 border-slate-800'
                        }`}
                      >
                        <span>#{num}</span>
                        {isMilestone && <Award className="w-3 h-3 text-teal-300 mt-0.5" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* MILESTONE LIST */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Milestone Rewards</h4>
              <div className="space-y-3">
                {milestones.map(m => (
                  <Card key={m.id} className="p-4 bg-slate-900 border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <Badge variant="teal" size="sm">Visit #{m.visit_number}</Badge>
                      <h5 className="font-bold text-slate-100 mt-1">{m.title}</h5>
                      <p className="text-slate-400 mt-0.5">{m.reward_description}</p>
                    </div>
                    {(customer?.total_visits || 0) >= m.visit_number ? (
                      <Badge variant="success" size="sm">Unlocked</Badge>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {m.visit_number - (customer?.total_visits || 0)} visits left
                      </span>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Complete Tasks For Extra Perks</h4>
            {tasks.map(t => (
              <Card key={t.id} className="p-4 bg-slate-900 border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="teal" size="sm">{t.task_type.toUpperCase()}</Badge>
                  <span className="text-xs font-bold text-emerald-400">{t.reward_description}</span>
                </div>
                <h5 className="font-bold text-slate-100 text-sm">{t.title}</h5>
                <p className="text-xs text-slate-400 leading-relaxed">{t.instructions}</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedTask(t)}>
                  Submit Proof Screenshot
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 3: UNLOCKED REWARD VOUCHERS */}
        {activeTab === 'rewards' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Unlocked Vouchers</h4>
            {rewards.filter(r => r.customer_id === customer.id).length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No rewards unlocked yet. Keep visiting to earn perks!</p>
            ) : (
              rewards.filter(r => r.customer_id === customer.id).map(r => (
                <Card key={r.id} className="p-5 bg-slate-900 border-slate-800 space-y-4 text-center">
                  <Badge variant={r.status === 'available' ? 'teal' : 'neutral'} size="sm">
                    {r.status.toUpperCase()}
                  </Badge>
                  <h5 className="font-bold text-slate-100 text-base">{r.title}</h5>
                  <p className="text-xs text-slate-400">{r.description}</p>

                  <div className="bg-white p-4 rounded-xl w-40 h-40 mx-auto flex items-center justify-center">
                    <QRCodeSVG value={r.redemption_code} size={130} />
                  </div>

                  <p className="font-mono text-sm font-extrabold text-teal-400 tracking-wider">
                    {r.redemption_code}
                  </p>
                  <p className="text-[10px] text-slate-500">Present this QR code to staff at checkout for instant redemption.</p>
                </Card>
              ))
            )}
          </div>
        )}
      </main>

      {/* TASK PROOF SUBMIT MODAL */}
      {selectedTask && (
        <Modal isOpen={Boolean(selectedTask)} onClose={() => setSelectedTask(null)} title="Submit Task Proof">
          <form onSubmit={handleSubmitProof} className="space-y-4">
            <p className="text-xs text-slate-300">{selectedTask.instructions}</p>
            <Input
              label="Verification Notes (e.g. your Instagram handle)"
              placeholder="e.g. Followed as @aarav_foodie"
              required
              value={proofNotes}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProofNotes(e.target.value)}
            />
            <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
              <Button variant="outline" size="sm" type="button" onClick={() => setSelectedTask(null)}>Cancel</Button>
              <Button variant="teal" size="sm" type="submit">Submit For Verification</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
