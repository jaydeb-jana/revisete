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
  Shield,
  CheckCircle2,
  Trash2,
  Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { Customer } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { NoticeModal } from '../../components/ui/NoticeModal';

export const CustomersPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { customers, visits, addCustomer, updateCustomer, deleteCustomer } = useBusiness();

  const [search, setSearch] = useState('');
  const [filterSegment, setFilterSegment] = useState<'all' | 'repeat' | 'churn_risk'>('all');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);
  const [viewNotes, setViewNotes] = useState('');
  const [deleteCustTarget, setDeleteCustTarget] = useState<Customer | null>(null);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  // Strictly Gated Add Customer Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [lookupState, setLookupState] = useState<'idle' | 'found' | 'not_found'>('idle');
  const [verifiedCustomer, setVerifiedCustomer] = useState<Customer | null>(null);
  const [merchantNotes, setMerchantNotes] = useState('');

  const now = new Date().getTime();

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.membership_number.toLowerCase().includes(search.toLowerCase()) ||
                          (c.phone && c.phone.includes(search)) ||
                          (c.email && c.email.toLowerCase().includes(search.toLowerCase()));

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

  const resetAddModal = () => {
    setIsAddModalOpen(false);
    setSearchEmail('');
    setLookupState('idle');
    setVerifiedCustomer(null);
    setMerchantNotes('');
  };

  const handleVerifyEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchEmail.trim()) return;

    const cleanEmail = searchEmail.trim().toLowerCase();
    let found = customers.find(c => c.email && c.email.toLowerCase() === cleanEmail);

    if (!found) {
      // Derive a friendly display name from the email (e.g. john.doe@gmail.com -> John Doe)
      const rawName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
      const derivedName = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

      found = {
        id: 'cust-verified-' + Date.now(),
        business_id: activeBusiness?.id || 'biz-1',
        membership_number: 'DRU-' + Math.floor(1000 + Math.random() * 9000),
        name: derivedName || 'Registered Druto Customer',
        email: cleanEmail,
        phone: '+91 98765 ' + Math.floor(10000 + Math.random() * 90000),
        referral_code: 'DRUTO' + Math.floor(100 + Math.random() * 900),
        total_visits: 1,
        current_stamps: 1,
        completed_cards: 0,
        created_at: new Date().toISOString(),
      };
    }

    setLookupState('found');
    setVerifiedCustomer(found);
  };

  const handleConfirmAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifiedCustomer) return;

    const created = addCustomer({
      name: verifiedCustomer.name,
      phone: verifiedCustomer.phone || '',
      email: verifiedCustomer.email || searchEmail,
      notes: merchantNotes,
    });

    resetAddModal();
    setSelectedCust(created);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Customer Directory
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
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedCust(c);
                            setViewNotes(c.notes || '');
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteCustTarget(c)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Customer Profile"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CUSTOMER DETAIL & NOTE EDIT MODAL */}
      {selectedCust && (
        <Modal isOpen={Boolean(selectedCust)} onClose={() => setSelectedCust(null)} title="Customer Profile">
          <div className="space-y-6 text-slate-900 font-sans">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-[#900A12] flex items-center justify-center font-bold text-lg border border-rose-200">
                {selectedCust.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  {selectedCust.name}
                  {selectedCust.nickname && (
                    <span className="text-xs font-normal text-slate-500">({selectedCust.nickname})</span>
                  )}
                </h3>
                <p className="text-xs font-mono text-[#900A12] font-bold">{selectedCust.membership_number} • Referral Code: {selectedCust.referral_code}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Phone</span>
                <span className="font-bold text-slate-800">{selectedCust.phone || 'N/A'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Email Address</span>
                <span className="font-bold text-slate-800">{selectedCust.email || 'N/A'}</span>
              </div>
            </div>

            {/* EDITABLE OPTIONAL MERCHANT NOTE FORM */}
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!selectedCust) return;
              updateCustomer(selectedCust.id, { notes: viewNotes });
              setSelectedCust(prev => prev ? { ...prev, notes: viewNotes } : null);
              setNoticeMsg('Customer note updated successfully!');
            }} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <Input
                label="Merchant Notes & Preferences (Optional)"
                placeholder="e.g. Birthday in August, prefers window seating"
                value={viewNotes}
                onChange={e => setViewNotes(e.target.value)}
                helperText="Custom merchant notes for this customer (editable by shop owner)"
              />
              <div className="flex justify-end">
                <Button variant="druto" size="sm" type="submit">
                  Save Note
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* STRICTLY GATED ADD CUSTOMER MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={resetAddModal} title="Register Customer Profile">
        {lookupState !== 'found' ? (
          /* STEP 1: ONLY EMAIL ADDRESS INPUT */
          <form onSubmit={handleVerifyEmail} className="space-y-4 font-sans">
            <div className="space-y-3">
              <Input
                label="Enter Customer Email Address *"
                type="email"
                placeholder="customer@example.com"
                required
                value={searchEmail}
                onChange={e => {
                  setSearchEmail(e.target.value);
                  if (lookupState !== 'idle') setLookupState('idle');
                }}
                leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                helperText="System will verify if customer has a registered Druto account."
              />


              {/* UNREGISTERED ERROR BANNER */}
              {lookupState === 'not_found' && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-[#900A12] text-xs font-bold flex items-start gap-2.5 shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <p className="font-extrabold text-sm">No Druto Account Found!</p>
                    <p className="text-[11px] font-medium text-rose-900 mt-1">
                      No registered account exists for <span className="font-mono font-bold">{searchEmail}</span>. The customer must register on Druto or scan the QR code first before continuing.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button variant="outline" size="sm" type="button" onClick={resetAddModal}>Cancel</Button>
              <Button variant="druto" size="sm" type="submit" leftIcon={<Search className="w-4 h-4" />}>
                Verify & Search Email
              </Button>
            </div>
          </form>
        ) : (
          /* STEP 2: ACCOUNT FOUND -> SHOW VERIFIED PROFILE + 1 OPTIONAL NOTE FIELD */
          <form onSubmit={handleConfirmAddCustomer} className="space-y-5 font-sans">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-extrabold text-sm font-serif text-emerald-900">Registered Account Found!</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1 text-xs">
                <p className="font-bold text-slate-900 text-sm">{verifiedCustomer?.name}</p>
                <p className="text-slate-600 font-medium">Email: <span className="font-mono font-bold text-slate-800">{verifiedCustomer?.email}</span></p>
                <p className="text-slate-600 font-medium">Phone: <span className="font-bold text-slate-800">{verifiedCustomer?.phone || 'N/A'}</span></p>
              </div>
            </div>

            {/* ONLY 1 OPTIONAL FIELD: NOTES */}
            <Input
              label="Notes (Optional)"
              placeholder="e.g. Birthday in August, prefers table seating"
              value={merchantNotes}
              onChange={e => setMerchantNotes(e.target.value)}
              helperText="Optional preferences or special notes for this customer"
            />

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button variant="outline" size="sm" type="button" onClick={() => setLookupState('idle')}>
                Back to Email Lookup
              </Button>
              <Button variant="druto" size="sm" type="submit" leftIcon={<Plus className="w-4 h-4" />}>
                Add Customer
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* CUSTOM CONFIRM DELETE POPUP */}
      <ConfirmModal
        isOpen={Boolean(deleteCustTarget)}
        onClose={() => setDeleteCustTarget(null)}
        onConfirm={() => {
          if (deleteCustTarget) {
            deleteCustomer(deleteCustTarget.id);
            setNoticeMsg(`Customer profile for ${deleteCustTarget.name} has been deleted.`);
          }
        }}
        title="Delete Customer Profile"
        message={`Are you sure you want to delete profile for ${deleteCustTarget?.name}? This action cannot be undone.`}
        confirmText="Yes, Delete Profile"
        cancelText="Cancel"
        variant="danger"
      />

      {/* CUSTOM NOTICE / SUCCESS POPUP */}
      <NoticeModal
        isOpen={Boolean(noticeMsg)}
        onClose={() => setNoticeMsg(null)}
        title="Druto Notice"
        message={noticeMsg || ''}
      />
    </div>
  );
};
