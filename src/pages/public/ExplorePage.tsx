import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Award, Utensils, Scissors, Dumbbell, Car, Sparkles, ArrowRight, Store } from 'lucide-react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { INITIAL_BUSINESSES } from '../../lib/mockData';
import { BusinessCategory } from '../../types';

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Businesses', icon: Store },
    { id: 'cafe', label: 'Cafes & Food', icon: Utensils },
    { id: 'salon', label: 'Salons & Spas', icon: Scissors },
    { id: 'gym', label: 'Gyms & Fitness', icon: Dumbbell },
    { id: 'carwash', label: 'Car Wash', icon: Car },
    { id: 'fashion', label: 'Fashion & Retail', icon: Store },
  ];

  const filteredBusinesses = INITIAL_BUSINESSES.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
                          (b.city && b.city.toLowerCase().includes(search.toLowerCase())) ||
                          (b.description && b.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory || (selectedCategory === 'cafe' && b.category === 'restaurant');
    const matchesCity = selectedCity === 'all' || b.city?.toLowerCase() === selectedCity.toLowerCase();

    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="teal" className="px-3 py-1 uppercase tracking-wider text-xs">
              <Sparkles className="w-3.5 h-3.5" /> Druto Local Rewards Explorer
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
              Discover Local Businesses & Earn Free Rewards
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore participating cafes, salons, gyms, and stores near you. Scan QR codes to collect digital stamps and unlock perks.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-4 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search business name, area, dish, or service..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                />
              </div>

              <div className="space-y-1.5">
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm p-2.5"
                >
                  <option value="all">All Cities (Bengaluru, Delhi, Mumbai)</option>
                  <option value="bengaluru">Bengaluru</option>
                  <option value="delhi">Delhi NCR</option>
                  <option value="mumbai">Mumbai</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map(c => {
                const Icon = c.icon;
                const isSelected = selectedCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950 shadow-md'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBusinesses.map(b => (
              <Card key={b.id} className="p-6 bg-slate-900 border-slate-800 flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.logo_url}
                      alt={b.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h3 className="font-bold text-slate-100 text-base">{b.name}</h3>
                      <p className="text-xs text-teal-400 flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5" /> {b.city || 'Bengaluru'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {b.description}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Featured Loyalty Perk:
                    </span>
                    <p className="text-slate-200">
                      {b.category === 'cafe' || b.category === 'restaurant'
                        ? '10 Visits = ₹1000 Flat VIP Feast Discount'
                        : b.category === 'salon'
                        ? '5 Visits = Complimentary Keratin Hair Spa'
                        : '3 Visits = 15% Off Total Store Bill'}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <Button
                    variant="teal"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/c/${b.slug}`)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Open Digital Stamp Card
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
