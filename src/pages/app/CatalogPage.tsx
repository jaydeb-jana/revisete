import React, { useState } from 'react';
import {
  Utensils,
  Scissors,
  ShoppingBag,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  Tag,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { CatalogItem } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const CatalogPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { categories, items, addItem, updateItem, deleteItem, addCategory } = useBusiness();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  // Add Item Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);

  // Form State
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemCatId, setNewItemCatId] = useState('');
  // Category specific fields
  const [dietType, setDietType] = useState<'veg' | 'non-veg' | 'vegan'>('veg');
  const [durationMins, setDurationMins] = useState('60');
  const [staffStylist, setStaffStylist] = useState('');
  const [skuCode, setSkuCode] = useState('');
  const [stockQty, setStockQty] = useState('50');

  // Add Category State
  const [newCatName, setNewCatName] = useState('');

  const currencySymbol = activeBusiness?.currency === 'USD' ? '$' : activeBusiness?.currency === 'EUR' ? '€' : '₹';

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCat === 'all' || item.category_id === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    const metadata: Record<string, any> = {};

    if (activeBusiness?.category === 'restaurant') {
      metadata.diet_type = dietType;
    } else if (activeBusiness?.category === 'salon') {
      metadata.duration_minutes = parseInt(durationMins) || 60;
      metadata.assigned_staff = staffStylist;
    } else if (activeBusiness?.category === 'fashion') {
      metadata.sku = skuCode;
      metadata.stock_qty = parseInt(stockQty) || 10;
      metadata.sizes = ['S', 'M', 'L', 'XL'];
    }

    addItem({
      name: newItemName,
      price: parseFloat(newItemPrice) || 0,
      description: newItemDesc,
      category_id: newItemCatId || categories[0]?.id,
      currency: activeBusiness?.currency || 'INR',
      is_available: true,
      metadata,
    });

    setIsAddModalOpen(false);
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDesc('');
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    addCategory({ name: newCatName, sort_order: categories.length + 1 });
    setNewCatName('');
    setIsAddCatModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            Catalog & Menu Management
            <Badge variant="teal">{activeBusiness?.category.toUpperCase()}</Badge>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Configure products, menu dishes, prices & category rules</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsAddCatModalOpen(true)} leftIcon={<Layers className="w-4 h-4" />}>
            Add Category
          </Button>
          <Button variant="teal" size="sm" onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add New Item
          </Button>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search items or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCat === 'all'
                ? 'bg-teal-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Items ({items.length})
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === c.id
                  ? 'bg-teal-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* ITEMS CATALOG GRID */}
      {filteredItems.length === 0 ? (
        <Card className="p-12 bg-slate-900 border-slate-800 text-center space-y-4">
          <p className="text-slate-400 text-sm">No items found matching your filters.</p>
          <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(true)}>
            Create First Catalog Item
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="p-5 bg-slate-900 border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-slate-100 text-base">{item.name}</h3>
                  <span className="text-base font-extrabold text-teal-400">
                    {currencySymbol}{item.price}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.description || 'No description provided.'}
                </p>

                {/* CATEGORY SPECIFIC METADATA BADGES */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {item.metadata?.diet_type && (
                    <Badge variant={item.metadata.diet_type === 'veg' ? 'success' : 'danger'} size="sm">
                      {item.metadata.diet_type.toUpperCase()}
                    </Badge>
                  )}
                  {item.metadata?.duration_minutes && (
                    <Badge variant="info" size="sm">
                      <Clock className="w-3 h-3" /> {item.metadata.duration_minutes} Mins
                    </Badge>
                  )}
                  {item.metadata?.sku && (
                    <Badge variant="neutral" size="sm">
                      SKU: {item.metadata.sku}
                    </Badge>
                  )}
                  {item.metadata?.stock_qty !== undefined && (
                    <Badge variant="teal" size="sm">
                      Stock: {item.metadata.stock_qty} pcs
                    </Badge>
                  )}
                </div>
              </div>

              {/* CARD ACTIONS */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className={`flex items-center gap-1 font-semibold ${item.is_available ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <Check className="w-3.5 h-3.5" /> {item.is_available ? 'Available' : 'Unavailable'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateItem(item.id, { is_available: !item.is_available })}
                    className="text-slate-400 hover:text-slate-200"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-slate-400 hover:text-rose-400 p-1"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ADD ITEM MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Catalog Item">
        <form onSubmit={handleCreateItem} className="space-y-4">
          <Input
            label="Item Name"
            placeholder="e.g. Special Dish or Hair Styling"
            required
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={`Price (${currencySymbol})`}
              type="number"
              step="0.01"
              required
              value={newItemPrice}
              onChange={e => setNewItemPrice(e.target.value)}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Category</label>
              <select
                value={newItemCatId}
                onChange={e => setNewItemCatId(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm p-2.5"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm p-2.5"
              placeholder="Detailed description of the product or service..."
              value={newItemDesc}
              onChange={e => setNewItemDesc(e.target.value)}
            />
          </div>

          {/* DYNAMIC CATEGORY FIELDS */}
          {activeBusiness?.category === 'restaurant' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Diet Classification</label>
              <select
                value={dietType}
                onChange={e => setDietType(e.target.value as any)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm p-2.5"
              >
                <option value="veg">Vegetarian (Veg)</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          )}

          {activeBusiness?.category === 'salon' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Duration (Minutes)"
                type="number"
                value={durationMins}
                onChange={e => setDurationMins(e.target.value)}
              />
              <Input
                label="Assigned Stylist (Optional)"
                placeholder="e.g. Master Rohan"
                value={staffStylist}
                onChange={e => setStaffStylist(e.target.value)}
              />
            </div>
          )}

          {activeBusiness?.category === 'fashion' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="SKU Code"
                placeholder="e.g. UT-TEE-99"
                value={skuCode}
                onChange={e => setSkuCode(e.target.value)}
              />
              <Input
                label="Stock Quantity"
                type="number"
                value={stockQty}
                onChange={e => setStockQty(e.target.value)}
              />
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="teal" size="sm" type="submit">Create Item</Button>
          </div>
        </form>
      </Modal>

      {/* ADD CATEGORY MODAL */}
      <Modal isOpen={isAddCatModalOpen} onClose={() => setIsAddCatModalOpen(false)} title="Add New Category">
        <form onSubmit={handleCreateCategory} className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g. Starters, Facials, Men Wear"
            required
            value={newCatName}
            onChange={e => setNewCatName(e.target.value)}
          />
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddCatModalOpen(false)}>Cancel</Button>
            <Button variant="teal" size="sm" type="submit">Save Category</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
