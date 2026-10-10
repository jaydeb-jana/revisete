import React, { useState, useRef } from 'react';
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
  Sparkles,
  Upload,
  Video,
  Image as ImageIcon,
  X,
  Film,
  Box,
  Power,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import { CatalogItem } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { NoticeModal } from '../../components/ui/NoticeModal';
import { ConfirmModal } from '../../components/ui/ConfirmModal';

export const CatalogPage: React.FC = () => {
  const { activeBusiness } = useAuth();
  const { categories, items, addItem, updateItem, deleteItem, addCategory } = useBusiness();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  // Add Item Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);

  // Edit Item Modal State
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCatId, setEditCatId] = useState('');
  const [editIsAvailable, setEditIsAvailable] = useState(true);
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editVideo, setEditVideo] = useState('');

  // Delete Confirmation State
  const [deleteTargetItem, setDeleteTargetItem] = useState<CatalogItem | null>(null);

  // Form State (New Item)
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemCatId, setNewItemCatId] = useState('');

  // Media Upload State (New Item)
  const [itemImages, setItemImages] = useState<string[]>([]);
  const [itemVideo, setItemVideo] = useState<string>('');
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const imgInputRef = useRef<HTMLInputElement>(null);
  const vidInputRef = useRef<HTMLInputElement>(null);
  const editImgInputRef = useRef<HTMLInputElement>(null);
  const editVidInputRef = useRef<HTMLInputElement>(null);

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

  // Handle Image Upload for New Item
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (itemImages.length + files.length > 3) {
      setNoticeMessage('Maximum limit of 3 images reached per item!');
      if (imgInputRef.current) imgInputRef.current.value = '';
      return;
    }

    const MAX_IMG_SIZE = 5 * 1024 * 1024; // 5MB limit
    for (const file of files) {
      if (file.size > MAX_IMG_SIZE) {
        setNoticeMessage(`Image file "${file.name}" exceeds the 5MB maximum size limit! Please upload a smaller image file.`);
        if (imgInputRef.current) imgInputRef.current.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setItemImages(prev => [...prev, reader.result as string].slice(0, 3));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setItemImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle Video Upload for New Item
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_VID_SIZE = 50 * 1024 * 1024; // 50MB limit
    if (file.size > MAX_VID_SIZE) {
      setNoticeMessage(`Video file "${file.name}" exceeds the 50MB maximum size limit! Please select a smaller video file under 50MB.`);
      if (vidInputRef.current) vidInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setItemVideo(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveVideo = () => {
    setItemVideo('');
    if (vidInputRef.current) vidInputRef.current.value = '';
  };

  // Handle Image Upload for Edit Modal
  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (editImages.length + files.length > 3) {
      setNoticeMessage('Maximum limit of 3 images reached per item!');
      if (editImgInputRef.current) editImgInputRef.current.value = '';
      return;
    }

    const MAX_IMG_SIZE = 5 * 1024 * 1024; // 5MB
    for (const file of files) {
      if (file.size > MAX_IMG_SIZE) {
        setNoticeMessage(`Image file "${file.name}" exceeds 5MB limit!`);
        if (editImgInputRef.current) editImgInputRef.current.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setEditImages(prev => [...prev, reader.result as string].slice(0, 3));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveEditImage = (index: number) => {
    setEditImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_VID_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_VID_SIZE) {
      setNoticeMessage(`Video file "${file.name}" exceeds 50MB limit!`);
      if (editVidInputRef.current) editVidInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setEditVideo(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDesc('');
    setItemImages([]);
    setItemVideo('');
    if (imgInputRef.current) imgInputRef.current.value = '';
    if (vidInputRef.current) vidInputRef.current.value = '';
  };

  const handleOpenEditModal = (item: CatalogItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditPrice(item.price.toString());
    setEditDesc(item.description || '');
    setEditCatId(item.category_id || categories[0]?.id || '');
    setEditIsAvailable(item.is_available);
    setEditImages(item.metadata?.images || []);
    setEditVideo(item.metadata?.video || '');
  };

  const handleSaveEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    updateItem(editingItem.id, {
      name: editName,
      price: parseFloat(editPrice) || 0,
      description: editDesc,
      category_id: editCatId,
      is_available: editIsAvailable,
      metadata: {
        ...editingItem.metadata,
        images: editImages,
        video: editVideo,
      },
    });

    setEditingItem(null);
    setNoticeMessage(`Catalog item "${editName}" updated successfully!`);
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    const metadata: Record<string, any> = {
      images: itemImages,
      video: itemVideo,
    };

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
    resetForm();
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 flex items-center gap-2">
            Catalog Management
            <Badge variant="druto">{activeBusiness?.category.toUpperCase()}</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Configure products, services, food items, photos, videos, prices & category rules</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsAddCatModalOpen(true)} leftIcon={<Layers className="w-4 h-4" />}>
            Add Category
          </Button>
          <Button variant="druto" size="sm" onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add New Item
          </Button>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search catalog items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800A12]/20 focus:border-[#800A12]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCat === 'all'
                ? 'bg-[#800A12] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Items ({items.length})
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCat === c.id
                  ? 'bg-[#800A12] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* ITEMS CATALOG GRID */}
      {filteredItems.length === 0 ? (
        <Card className="p-12 bg-white border-slate-200/80 text-center space-y-4 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">No items found matching your filters.</p>
          <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(true)}>
            Create First Catalog Item
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const hasImages = item.metadata?.images && item.metadata.images.length > 0;
            const hasVideo = Boolean(item.metadata?.video);

            return (
              <Card key={item.id} className={`p-5 bg-white border flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all shadow-sm ${item.is_available ? 'border-slate-200/80' : 'border-rose-200 bg-rose-50/20'}`}>
                <div className="space-y-3">
                  {/* MEDIA PREVIEW IF AVAILABLE */}
                  {hasImages && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {item.metadata?.images?.map((img: string, idx: number) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${item.name} preview ${idx + 1}`}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        {item.name}
                        {!item.is_available && (
                          <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded border border-rose-200">
                            Deactivated
                          </span>
                        )}
                      </h3>
                    </div>
                    <span className="text-base font-extrabold text-[#800A12]">
                      {currencySymbol}{item.price}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.description || 'No description provided.'}
                  </p>

                  {/* METADATA BADGES */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {hasVideo && (
                      <Badge variant="warning" size="sm">
                        <Film className="w-3 h-3" /> Video Attached
                      </Badge>
                    )}
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
                      <Badge variant="druto" size="sm">
                        Stock: {item.metadata.stock_qty} pcs
                      </Badge>
                    )}
                  </div>
                </div>

                {/* CARD ACTIONS: EDIT, ACTIVATE/DEACTIVATE, DELETE */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                  <span className={`flex items-center gap-1 font-semibold ${item.is_available ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {item.is_available ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-500" /> Deactivated
                      </>
                    )}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* EDIT BUTTON */}
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium flex items-center gap-1"
                      title="Edit catalog item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* ACTIVATE / DEACTIVATE TOGGLE BUTTON */}
                    <button
                      onClick={() => {
                        updateItem(item.id, { is_available: !item.is_available });
                        setNoticeMessage(`Item "${item.name}" has been ${!item.is_available ? 'Activated' : 'Deactivated'}.`);
                      }}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1 ${
                        item.is_available
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                      title={item.is_available ? 'Deactivate this item' : 'Activate this item'}
                    >
                      <Power className="w-3 h-3" />
                      <span>{item.is_available ? 'Deactivate' : 'Activate'}</span>
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => setDeleteTargetItem(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete catalog item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* EDIT ITEM MODAL */}
      {editingItem && (
        <Modal isOpen={Boolean(editingItem)} onClose={() => setEditingItem(null)} title="Edit Catalog Item">
          <form onSubmit={handleSaveEditItem} className="space-y-4">
            <Input
              label="Item Name *"
              required
              value={editName}
              onChange={e => setEditName(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={`Price (${currencySymbol}) *`}
                type="number"
                step="0.01"
                required
                value={editPrice}
                onChange={e => setEditPrice(e.target.value)}
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Category *</label>
                <select
                  value={editCatId}
                  onChange={e => setEditCatId(e.target.value)}
                  className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12]"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
              <textarea
                rows={3}
                className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12]"
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
              />
            </div>

            {/* EDIT ITEM STATUS TOGGLE */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Availability Status</p>
                <p className="text-[11px] text-slate-500 font-medium">Control whether customers can order this item</p>
              </div>
              <Button
                type="button"
                variant={editIsAvailable ? 'druto' : 'outline'}
                size="sm"
                onClick={() => setEditIsAvailable(!editIsAvailable)}
              >
                {editIsAvailable ? 'Active & Available' : 'Deactivated'}
              </Button>
            </div>

            {/* EDIT PHOTOS UPLOAD */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#800A12]" /> Product Photos (Max 3, &lt; 5MB each)
                </label>
                <span className="text-[10px] font-bold text-slate-500">{editImages.length} / 3 Uploaded</span>
              </div>

              {editImages.length < 3 && (
                <div className="flex items-center gap-3">
                  <input
                    ref={editImgInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleEditImageUpload}
                    className="hidden"
                    id="edit-img-upload"
                  />
                  <label
                    htmlFor="edit-img-upload"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#800A12] text-white hover:bg-rose-900 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload Photos
                  </label>
                </div>
              )}

              {editImages.length > 0 && (
                <div className="flex items-center gap-3 pt-2">
                  {editImages.map((img, idx) => (
                    <div key={idx} className="relative group shrink-0">
                      <img src={img} alt={`Edit ${idx + 1}`} className="w-16 h-16 rounded-xl object-cover border border-slate-300" />
                      <button
                        type="button"
                        onClick={() => handleRemoveEditImage(idx)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md hover:bg-rose-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button variant="outline" size="sm" type="button" onClick={() => setEditingItem(null)}>Cancel</Button>
              <Button variant="druto" size="sm" type="submit">Save Item Changes</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ADD ITEM MODAL WITH OPTIONAL PHOTOS & VIDEO UPLOADS */}
      <Modal isOpen={isAddModalOpen} onClose={() => { setIsAddModalOpen(false); resetForm(); }} title="Add New Catalog Item">
        <form onSubmit={handleCreateItem} className="space-y-4">
          <Input
            label="Item Name *"
            placeholder="e.g. Special Dish or Hair Styling"
            required
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={`Price (${currencySymbol}) *`}
              type="number"
              step="0.01"
              required
              value={newItemPrice}
              onChange={e => setNewItemPrice(e.target.value)}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Category *</label>
              <select
                value={newItemCatId}
                onChange={e => setNewItemCatId(e.target.value)}
                className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12]"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              className="w-full rounded-xl bg-white border border-slate-300 text-slate-900 text-sm p-2.5 focus:ring-[#800A12] focus:border-[#800A12]"
              placeholder="Detailed description of the product or service..."
              value={newItemDesc}
              onChange={e => setNewItemDesc(e.target.value)}
            />
          </div>

          {/* OPTIONAL ITEM PHOTOS UPLOAD (MAX 3 IMAGES, < 5MB EACH) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#800A12]" /> Product / Item Photos (Optional, Max 3, &lt; 5MB each)
              </label>
              <span className="text-[10px] font-bold text-slate-500">{itemImages.length} / 3 Uploaded</span>
            </div>

            {itemImages.length < 3 && (
              <div className="flex items-center gap-3">
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="item-img-upload"
                />
                <label
                  htmlFor="item-img-upload"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#800A12] text-white hover:bg-rose-900 cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Photos
                </label>
                <span className="text-[11px] text-slate-500 font-medium">Max 5MB per image. Up to 3 photos.</span>
              </div>
            )}

            {/* PREVIEW UPLOADED THUMBNAILS */}
            {itemImages.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {itemImages.map((img, idx) => (
                  <div key={idx} className="relative group shrink-0">
                    <img src={img} alt={`Uploaded ${idx + 1}`} className="w-16 h-16 rounded-xl object-cover border border-slate-300" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md hover:bg-rose-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* OPTIONAL ITEM VIDEO UPLOAD (MAX 1 VIDEO, < 50MB) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#800A12]" /> Product Demo Video (Optional, Max 1, &lt; 50MB)
              </label>
            </div>

            {!itemVideo ? (
              <div className="flex items-center gap-3">
                <input
                  ref={vidInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="item-vid-upload"
                />
                <label
                  htmlFor="item-vid-upload"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 cursor-pointer transition-colors"
                >
                  <Film className="w-3.5 h-3.5 text-amber-400" /> Upload Video
                </label>
                <span className="text-[11px] text-slate-500 font-medium">Max 50MB video clip.</span>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-800">
                <span className="flex items-center gap-2 text-emerald-700">
                  <Check className="w-4 h-4" /> Video File Uploaded Successfully (&lt; 50MB)
                </span>
                <Button type="button" variant="outline" size="sm" onClick={handleRemoveVideo} className="text-rose-600">
                  Remove Video
                </Button>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => { setIsAddModalOpen(false); resetForm(); }}>Cancel</Button>
            <Button variant="druto" size="sm" type="submit">Create Item</Button>
          </div>
        </form>
      </Modal>

      {/* ADD CATEGORY MODAL */}
      <Modal isOpen={isAddCatModalOpen} onClose={() => setIsAddCatModalOpen(false)} title="Add New Category">
        <form onSubmit={handleCreateCategory} className="space-y-4">
          <Input
            label="Category Name *"
            placeholder="e.g. Starters, Main Course, Hair Treatments"
            required
            value={newCatName}
            onChange={e => setNewCatName(e.target.value)}
          />
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddCatModalOpen(false)}>Cancel</Button>
            <Button variant="druto" size="sm" type="submit">Create Category</Button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE POPUP */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetItem)}
        onClose={() => setDeleteTargetItem(null)}
        onConfirm={() => {
          if (deleteTargetItem) {
            deleteItem(deleteTargetItem.id);
            setNoticeMessage(`Catalog item "${deleteTargetItem.name}" has been deleted.`);
          }
        }}
        title="Delete Catalog Item"
        message={`Are you sure you want to delete catalog item "${deleteTargetItem?.name}"? This action cannot be undone.`}
        confirmText="Yes, Delete Item"
        cancelText="Cancel"
        variant="danger"
      />

      {/* CUSTOM NOTICE MODAL */}
      <NoticeModal
        isOpen={Boolean(noticeMessage)}
        onClose={() => setNoticeMessage(null)}
        title="Catalog Action Notice"
        message={noticeMessage || ''}
      />
    </div>
  );
};
