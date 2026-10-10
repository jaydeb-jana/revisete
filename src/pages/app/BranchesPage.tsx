import React, { useState } from 'react';
import { MapPin, Plus, QrCode, Navigation, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BusinessBranch } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { PhysicalQRStandPreview } from '../../components/ui/PhysicalQRStandPreview';

export const BranchesPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const [branches, setBranches] = useState<BusinessBranch[]>(
    activeBusiness?.branches || [
      {
        id: 'br-1',
        business_id: activeBusiness?.id || 'biz-1',
        name: 'Main Flagship Branch - Indiranagar',
        address: '42 MG Road, Indiranagar',
        city: 'Bengaluru',
        latitude: 12.9716,
        longitude: 77.5946,
        phone: '+91 98765 43210',
        is_main: true,
      },
      {
        id: 'br-2',
        business_id: activeBusiness?.id || 'biz-1',
        name: 'Outlet Branch - HSR Layout',
        address: '18 HSR Main Road, Sector 3',
        city: 'Bengaluru',
        latitude: 12.9121,
        longitude: 77.6446,
        phone: '+91 98123 45678',
        is_main: false,
      },
    ]
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(activeBusiness?.city || 'Bengaluru');
  const [lat, setLat] = useState('12.9716');
  const [lng, setLng] = useState('77.5946');

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBranch: BusinessBranch = {
      id: 'br-' + Date.now(),
      business_id: activeBusiness?.id || 'biz-1',
      name: branchName,
      address,
      city,
      latitude: parseFloat(lat) || 12.9716,
      longitude: parseFloat(lng) || 77.5946,
      phone: activeBusiness?.phone || '',
      is_main: false,
    };
    setBranches(prev => [...prev, newBranch]);
    setIsAddModalOpen(false);
    setBranchName('');
    setAddress('');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Multi-Branch GPS Auto-Detection
            <Badge variant="druto">{branches.length} Outlet Locations</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Single universal QR code automatically detects branch using GPS location</p>
        </div>
        <Button variant="druto" size="sm" onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Branch Outlet
        </Button>
      </div>

      {/* PHYSICAL STAND PREVIEW & PRINTER */}
      {activeBusiness && <PhysicalQRStandPreview business={activeBusiness} />}

      {/* BRANCHES LIST */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-serif text-slate-900">Registered Branch Locations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {branches.map(b => (
            <Card key={b.id} className="p-5 bg-white border-slate-200/80 space-y-3 shadow-sm hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#800A12]" />
                  <h4 className="font-bold text-slate-900 text-sm">{b.name}</h4>
                </div>
                {b.is_main ? (
                  <Badge variant="druto" size="sm">Main Flagship</Badge>
                ) : (
                  <Badge variant="neutral" size="sm">Outlet</Badge>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{b.address}, {b.city}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>GPS: {b.latitude.toFixed(4)}, {b.longitude.toFixed(4)}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" /> Auto-Detect Active
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ADD BRANCH MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Branch Location">
        <form onSubmit={handleAddBranch} className="space-y-4">
          <Input label="Branch Outlet Name" placeholder="e.g. HSR Layout Outlet" required value={branchName} onChange={e => setBranchName(e.target.value)} />
          <Input label="Street Address" placeholder="e.g. 18 HSR Main Road" required value={address} onChange={e => setAddress(e.target.value)} />
          <Input label="City" value={city} onChange={e => setCity(e.target.value)} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Latitude (GPS)" value={lat} onChange={e => setLat(e.target.value)} />
            <Input label="Longitude (GPS)" value={lng} onChange={e => setLng(e.target.value)} />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="druto" size="sm" type="submit">Save Branch</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
