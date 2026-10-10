import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  Award,
  AlertTriangle,
  ChevronRight,
  UserCheck,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Customer } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const CustomersPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { customers, visits, rewards, addCustomer } = useBusiness();

  const [search, setSearch] = useState('');
  const [filterSegment, setFilterSegment] = useState<'all' | 'repeat' | 'churn_risk'>('all');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const now = new Date().getTime();

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.membership_number.toLowerCase().includes(search.toLowerCase()) ||
                          (c.phone && c.phone.includes(search));

    if (!matchesSearch) return false;

    if (filterSegment === 'repeat') {
      return c.total_visits > 1;
    }
    if (filterSegment === 'churn_risk') {
      if (!c.last_visit_at) return true;
      const days = (now - new Date(c.last_visit_at).getTime()) / (1000 * 60 * 60 * 24);
      return days > 30;
    }
    return true;
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const created = addCustomer({
      name: newName,
      phone: newPhone,
      email: newEmail,
      notes: newNotes,
    });
    setIsAddModalOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewNotes('');
    setSelectedCust(created);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Customer CRM Directory
            <Badge variant="druto">{customers.length} Profiles</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Track repeat visit patterns, lifetime visits & churn risk</p>
        </div>
        <Button variant="druto" size="sm" onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Customer
        </Button>
      </div>

      {/* SEARCH & SEGMENTATION TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search name, phone, membership ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setFilterSegment('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterSegment === 'all' ? 'bg-[#900A12] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Customers ({customers.length})
          </button>
          <button
            onClick={() => setFilterSegment('repeat')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterSegment === 'repeat' ? 'bg-[#900A12] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Repeat Visitors ({customers.filter(c => c.total_visits > 1).length})
          </button>
          <button
            onClick={() => setFilterSegment('churn_risk')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterSegment === 'churn_risk' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Churn Risk (&gt;30 Days)
          </button>
        </div>
      </div>

      {/* CUSTOMERS TABLE */}
      <Card className="p-0 bg-white border-slate-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Membership ID & Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Total Visits</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCustomers.map(c => {
                const isChurn = c.last_visit_at && ((now - new Date(c.last_visit_at).getTime()) / (1000 * 60 * 60 * 24)) > 30;
                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 text-[#900A12] font-bold flex items-center justify-center border border-rose-200">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{c.name}</p>
                          <p className="text-[10px] font-mono font-bold text-[#900A12]">{c.membership_number}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="text-slate-800 font-semibold">{c.phone || 'No phone'}</p>
                      <p className="text-[10px] text-slate-500">{c.email || 'No email'}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant={c.total_visits > 3 ? 'druto' : 'neutral'} size="sm">
                        {c.total_visits} Visits
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4">
                      {c.last_visit_at ? (
                        <div className="space-y-1">
                          <p className="text-slate-800 font-medium">{new Date(c.last_visit_at).toLocaleDateString()}</p>
                          {isChurn && <Badge variant="warning" size="sm">Churn Risk</Badge>}
                        </div>
                      ) : (
                        <span className="text-slate-400">No visit logged</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedCust(c)}>
                        View Profile <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CUSTOMER DETAIL MODAL */}
      {selectedCust && (
        <Modal isOpen={Boolean(selectedCust)} onClose={() => setSelectedCust(null)} title="Customer CRM Profile">
          <div className="space-y-6 text-slate-900">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-[#900A12] flex items-center justify-center font-bold text-lg border border-rose-200">
                {selectedCust.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedCust.name}</h3>
                <p className="text-xs font-mono text-[#900A12] font-bold">{selectedCust.membership_number} • Referral Code: {selectedCust.referral_code}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Phone</span>
                <span className="font-bold text-slate-800">{selectedCust.phone || 'N/A'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Email</span>
                <span className="font-bold text-slate-800">{selectedCust.email || 'N/A'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Unlocked Rewards Entitlements</h4>
              {rewards.filter(r => r.customer_id === selectedCust.id).length === 0 ? (
                <p className="text-xs text-slate-500">No rewards unlocked yet.</p>
              ) : (
                <div className="space-y-2">
                  {rewards.filter(r => r.customer_id === selectedCust.id).map(r => (
                    <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{r.title}</p>
                        <p className="text-[10px] font-mono text-[#900A12] font-bold">Code: {r.redemption_code}</p>
                      </div>
                      <Badge variant={r.status === 'redeemed' ? 'neutral' : 'druto'}>{r.status.toUpperCase()}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* ADD CUSTOMER MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Customer Profile">
        <form onSubmit={handleCreateCustomer} className="space-y-4">
          <Input label="Customer Full Name" required value={newName} onChange={e => setNewName(e.target.value)} />
          <Input label="Phone Number" placeholder="+91 98765 43210" value={newPhone} onChange={e => setNewPhone(e.target.value)} />
          <Input label="Email Address" type="email" placeholder="customer@example.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
          <Input label="Notes (Preferences, Birthday)" value={newNotes} onChange={e => setNewNotes(e.target.value)} />
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="druto" size="sm" type="submit">Create Customer</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
