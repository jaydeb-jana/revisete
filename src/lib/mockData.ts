import { Business, CatalogCategory, CatalogItem, Customer, LoyaltyMilestone, Visit, CustomerTask, TaskSubmission, Reward, NotificationItem, AuditLog } from '../types';

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'biz-1',
    owner_id: 'usr-owner-1',
    name: 'The Curry Leaf Bistro',
    slug: 'the-curry-leaf',
    category: 'cafe',
    logo_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&h=200&q=80',
    description: 'Authentic South & North Indian fine dining & cafe.',
    phone: '+91 98765 43210',
    email: 'hello@curryleafbistro.com',
    address: '42 MG Road, Indiranagar',
    city: 'Bengaluru',
    currency: 'INR',
    status: 'active',
    plan: 'growth',
    created_at: '2026-01-15T09:00:00Z',
    operating_hours: {
      Mon: '11:00 AM - 11:00 PM',
      Tue: '11:00 AM - 11:00 PM',
      Wed: '11:00 AM - 11:00 PM',
      Thu: '11:00 AM - 11:00 PM',
      Fri: '11:00 AM - 11:30 PM',
      Sat: '11:00 AM - 11:30 PM',
      Sun: '11:00 AM - 10:30 PM',
    },
    branches: [
      {
        id: 'br-1',
        business_id: 'biz-1',
        name: 'Indiranagar Flagship Outlet',
        address: '42 MG Road, Indiranagar',
        city: 'Bengaluru',
        latitude: 12.9716,
        longitude: 77.5946,
        phone: '+91 98765 43210',
        is_main: true,
      },
      {
        id: 'br-2',
        business_id: 'biz-1',
        name: 'HSR Layout Branch',
        address: '18 HSR Main Road',
        city: 'Bengaluru',
        latitude: 12.9121,
        longitude: 77.6446,
        phone: '+91 98123 45678',
        is_main: false,
      }
    ]
  },
  {
    id: 'biz-2',
    owner_id: 'usr-owner-1',
    name: 'Luxe & Glow Salon',
    slug: 'luxe-glow-salon',
    category: 'salon',
    logo_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=200&h=200&q=80',
    description: 'Premium hair styling, skincare & spa services.',
    phone: '+91 98123 45678',
    email: 'contact@luxeglow.com',
    address: '18 HSR Layout Main Road',
    city: 'Bengaluru',
    currency: 'INR',
    status: 'active',
    plan: 'growth',
    created_at: '2026-02-01T10:00:00Z',
    branches: [
      {
        id: 'br-3',
        business_id: 'biz-2',
        name: 'HSR Studio',
        address: '18 HSR Layout Main Road',
        city: 'Bengaluru',
        latitude: 12.9121,
        longitude: 77.6446,
        phone: '+91 98123 45678',
        is_main: true,
      }
    ]
  },
  {
    id: 'biz-3',
    owner_id: 'usr-owner-1',
    name: 'Urban Threads Fashion',
    slug: 'urban-threads',
    category: 'fashion',
    logo_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=200&h=200&q=80',
    description: 'Trendy streetwear, ethnic fusion & minimalist wear.',
    phone: '+91 97788 99000',
    email: 'support@urbanthreads.com',
    address: 'Shop 104, Forum Mall',
    city: 'Bengaluru',
    currency: 'INR',
    status: 'active',
    plan: 'basic',
    created_at: '2026-02-10T12:00:00Z',
    branches: [
      {
        id: 'br-4',
        business_id: 'biz-3',
        name: 'Forum Mall Store',
        address: 'Shop 104, Forum Mall',
        city: 'Bengaluru',
        latitude: 12.9348,
        longitude: 77.6111,
        phone: '+91 97788 99000',
        is_main: true,
      }
    ]
  }
];

export const INITIAL_CATEGORIES: CatalogCategory[] = [
  { id: 'cat-1', business_id: 'biz-1', name: 'Starters & Appetizers', sort_order: 1 },
  { id: 'cat-2', business_id: 'biz-1', name: 'Main Course Specialties', sort_order: 2 },
  { id: 'cat-3', business_id: 'biz-1', name: 'Beverages & Desserts', sort_order: 3 },
  { id: 'cat-4', business_id: 'biz-2', name: 'Hair Treatments & Cuts', sort_order: 1 },
  { id: 'cat-5', business_id: 'biz-2', name: 'Facials & Skincare', sort_order: 2 },
  { id: 'cat-6', business_id: 'biz-3', name: 'Men Wear', sort_order: 1 },
  { id: 'cat-7', business_id: 'biz-3', name: 'Women Wear', sort_order: 2 },
];

export const INITIAL_ITEMS: CatalogItem[] = [
  {
    id: 'item-1',
    business_id: 'biz-1',
    category_id: 'cat-1',
    name: 'Paneer Tikka Angara',
    description: 'Charcoal roasted cottage cheese marinated in aromatic spicy yoghurt.',
    price: 340,
    currency: 'INR',
    is_available: true,
    metadata: { diet_type: 'veg' },
    created_at: '2026-02-15T00:00:00Z'
  },
  {
    id: 'item-2',
    business_id: 'biz-1',
    category_id: 'cat-1',
    name: 'Butter Chicken Wings',
    description: 'Crispy fried wings tossed in velvety makhani glaze.',
    price: 420,
    currency: 'INR',
    is_available: true,
    metadata: { diet_type: 'non-veg' },
    created_at: '2026-02-15T00:00:00Z'
  },
  {
    id: 'item-3',
    business_id: 'biz-1',
    category_id: 'cat-2',
    name: 'Hyderabadi Dum Biryani',
    description: 'Long-grain basmati rice cooked on slow dum with aromatic spices.',
    price: 480,
    currency: 'INR',
    is_available: true,
    metadata: { diet_type: 'non-veg' },
    created_at: '2026-02-15T00:00:00Z'
  },
  {
    id: 'item-4',
    business_id: 'biz-1',
    category_id: 'cat-3',
    name: 'Mango Lassi Delight',
    description: 'Chilled rich mango lassi topped with roasted pistachio.',
    price: 160,
    currency: 'INR',
    is_available: true,
    metadata: { diet_type: 'veg' },
    created_at: '2026-02-15T00:00:00Z'
  },
  {
    id: 'item-5',
    business_id: 'biz-2',
    category_id: 'cat-4',
    name: 'Keratin Hair Spa & Trim',
    description: 'Nourishing deep moisture Keratin treatment with master haircut.',
    price: 2400,
    currency: 'INR',
    is_available: true,
    metadata: { duration_minutes: 60, assigned_staff: 'Rohan (Senior Stylist)' },
    created_at: '2026-02-15T00:00:00Z'
  },
  {
    id: 'item-6',
    business_id: 'biz-2',
    category_id: 'cat-5',
    name: 'Hydra-Glow Facial Therapy',
    description: '6-step skin rejuvenation treatment for instant glow.',
    price: 3200,
    currency: 'INR',
    is_available: true,
    metadata: { duration_minutes: 75, assigned_staff: 'Priya (Skincare Expert)' },
    created_at: '2026-02-15T00:00:00Z'
  },
  {
    id: 'item-7',
    business_id: 'biz-3',
    category_id: 'cat-6',
    name: 'Oversized Organic Cotton Tee',
    description: '240 GSM heavy cotton streetwear t-shirt.',
    price: 1299,
    currency: 'INR',
    is_available: true,
    metadata: { sku: 'UT-TEE-01', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Sage Green', 'Beige'], stock_qty: 45 },
    created_at: '2026-02-15T00:00:00Z'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    business_id: 'biz-1',
    membership_number: 'REV-1001',
    name: 'Aarav Sharma',
    phone: '+91 98765 00001',
    email: 'aarav@gmail.com',
    referral_code: 'AARAV25',
    total_visits: 5,
    current_stamps: 5,
    completed_cards: 0,
    last_visit_at: '2026-10-08T14:30:00Z',
    created_at: '2026-03-01T10:00:00Z',
    notes: 'Loves spicy starters. Regular weekend customer.'
  },
  {
    id: 'cust-2',
    business_id: 'biz-1',
    membership_number: 'REV-1002',
    name: 'Ananya Verma',
    phone: '+91 98765 00002',
    email: 'ananya.v@gmail.com',
    referral_code: 'ANANYA10',
    total_visits: 3,
    current_stamps: 3,
    completed_cards: 0,
    last_visit_at: '2026-09-28T19:15:00Z',
    created_at: '2026-03-10T11:00:00Z',
    notes: 'Prefers outdoor seating.'
  },
  {
    id: 'cust-3',
    business_id: 'biz-1',
    membership_number: 'REV-1003',
    name: 'Vikramaditya Roy',
    phone: '+91 98765 00003',
    email: 'v.roy@tech.io',
    referral_code: 'VIKRAM88',
    total_visits: 10,
    current_stamps: 0,
    completed_cards: 1,
    last_visit_at: '2026-10-09T20:00:00Z',
    created_at: '2026-01-20T12:00:00Z',
    notes: 'VIP customer. Celebrated birthday in July.'
  },
  {
    id: 'cust-4',
    business_id: 'biz-1',
    membership_number: 'REV-1004',
    name: 'Meera Patel',
    phone: '+91 98765 00004',
    email: 'meera.p@yahoo.com',
    referral_code: 'MEERA55',
    total_visits: 1,
    current_stamps: 1,
    completed_cards: 0,
    last_visit_at: '2026-08-14T13:00:00Z',
    created_at: '2026-08-14T13:00:00Z',
    notes: 'Has not returned in 50+ days.'
  }
];

export const INITIAL_MILESTONES: LoyaltyMilestone[] = [
  {
    id: 'ms-1',
    program_id: 'prog-1',
    business_id: 'biz-1',
    visit_number: 1,
    title: 'Welcome Visit Bonus',
    reward_type: 'free_product',
    reward_value: 160,
    reward_description: 'Free Mango Lassi or Cold Coffee on your first check-in!',
    expiry_days: 14,
    is_scratch_card: true
  },
  {
    id: 'ms-2',
    program_id: 'prog-1',
    business_id: 'biz-1',
    visit_number: 3,
    title: '3-Visit Loyalty Perk',
    reward_type: 'percent_discount',
    reward_value: 15,
    reward_description: '15% Off your entire dining bill.',
    expiry_days: 30,
    is_scratch_card: true
  },
  {
    id: 'ms-3',
    program_id: 'prog-1',
    business_id: 'biz-1',
    visit_number: 5,
    title: '5-Visit Starter Treat',
    reward_type: 'free_product',
    reward_value: 340,
    reward_description: 'Complimentary Paneer Tikka or Wings starter.',
    expiry_days: 30,
    is_scratch_card: true
  },
  {
    id: 'ms-4',
    program_id: 'prog-1',
    business_id: 'biz-1',
    visit_number: 10,
    title: '10-Visit Gold VIP Feast',
    reward_type: 'fixed_discount',
    reward_value: 1000,
    reward_description: '₹1000 Flat discount on your 10th visit anniversary meal!',
    expiry_days: 60,
    is_scratch_card: true
  }
];

export const INITIAL_VISITS: Visit[] = [
  {
    id: 'v-101',
    business_id: 'biz-1',
    branch_id: 'br-1',
    branch_name: 'Indiranagar Flagship Outlet',
    customer_id: 'cust-3',
    customer_name: 'Vikramaditya Roy',
    purchase_amount: 1450,
    status: 'approved',
    scanned_at: '2026-10-09T20:00:00Z'
  },
  {
    id: 'v-102',
    business_id: 'biz-1',
    branch_id: 'br-1',
    branch_name: 'Indiranagar Flagship Outlet',
    customer_id: 'cust-1',
    customer_name: 'Aarav Sharma',
    purchase_amount: 890,
    status: 'approved',
    scanned_at: '2026-10-08T14:30:00Z'
  },
  {
    id: 'v-103',
    business_id: 'biz-1',
    branch_id: 'br-2',
    branch_name: 'HSR Layout Branch',
    customer_id: 'cust-2',
    customer_name: 'Ananya Verma',
    purchase_amount: 1120,
    status: 'approved',
    scanned_at: '2026-09-28T19:15:00Z'
  }
];

export const INITIAL_TASKS: CustomerTask[] = [
  {
    id: 'task-1',
    business_id: 'biz-1',
    title: 'Follow Us on Instagram',
    instructions: 'Follow @thecurryleafbistro on Instagram and upload a screenshot proof to unlock your treat.',
    task_type: 'social_follow',
    reward_description: '10% Off Dessert Voucher',
    reward_points_or_discount: 10,
    proof_required: true,
    verification_method: 'manual_review',
    is_active: true
  },
  {
    id: 'task-2',
    business_id: 'biz-1',
    title: 'Tag Us in Your Dining Story',
    instructions: 'Post a story of your dish at Curry Leaf Bistro tagging @thecurryleafbistro.',
    task_type: 'social_share',
    reward_description: 'Free Beverage Upgrade',
    reward_points_or_discount: 150,
    proof_required: true,
    verification_method: 'manual_review',
    is_active: true
  },
  {
    id: 'task-3',
    business_id: 'biz-1',
    title: 'Refer a Friend to Druto',
    instructions: 'Share your personal referral link. When your friend completes their first visit, both of you get ₹200 off!',
    task_type: 'referral',
    reward_description: '₹200 Referral Discount',
    reward_points_or_discount: 200,
    proof_required: false,
    verification_method: 'instant_code',
    is_active: true
  }
];

export const INITIAL_SUBMISSIONS: TaskSubmission[] = [
  {
    id: 'sub-1',
    business_id: 'biz-1',
    task_id: 'task-1',
    task_title: 'Follow Us on Instagram',
    customer_id: 'cust-1',
    customer_name: 'Aarav Sharma',
    status: 'pending',
    proof_url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80',
    proof_notes: 'Followed as @aarav_foodie',
    created_at: '2026-10-09T18:00:00Z'
  }
];

export const INITIAL_REWARDS: Reward[] = [
  {
    id: 'rew-1',
    business_id: 'biz-1',
    customer_id: 'cust-3',
    milestone_id: 'ms-4',
    title: '10-Visit Gold VIP Feast',
    reward_type: 'fixed_discount',
    reward_value: 1000,
    description: '₹1000 Flat discount on your 10th visit anniversary meal!',
    redemption_code: 'GOLD-1000-VIK',
    status: 'available',
    is_scratch_card: true,
    is_scratched: true,
    unlocked_at: '2026-10-09T20:00:00Z',
    expires_at: '2026-12-08T20:00:00Z'
  },
  {
    id: 'rew-2',
    business_id: 'biz-1',
    customer_id: 'cust-1',
    milestone_id: 'ms-3',
    title: '5-Visit Starter Treat',
    reward_type: 'free_product',
    reward_value: 340,
    description: 'Complimentary Paneer Tikka or Wings starter.',
    redemption_code: 'FREE-STARTER-AAR',
    status: 'available',
    is_scratch_card: true,
    is_scratched: false,
    unlocked_at: '2026-10-08T14:30:00Z',
    expires_at: '2026-11-07T14:30:00Z'
  },
  {
    id: 'rew-3',
    business_id: 'biz-1',
    customer_id: 'cust-2',
    milestone_id: 'ms-2',
    title: '3-Visit Loyalty Perk',
    reward_type: 'percent_discount',
    reward_value: 15,
    description: '15% Off your entire dining bill.',
    redemption_code: 'PERK15-ANA-RMD',
    status: 'redeemed',
    is_scratch_card: true,
    is_scratched: true,
    unlocked_at: '2026-09-28T19:15:00Z',
    expires_at: '2026-10-28T19:15:00Z',
    redeemed_at: '2026-10-01T12:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    business_id: 'biz-1',
    customer_id: 'cust-3',
    title: '🎉 VIP Reward Unlocked!',
    message: 'Vikramaditya unlocked the ₹1000 Gold VIP Feast Reward on visit #10.',
    type: 'reward_unlocked',
    is_read: false,
    created_at: '2026-10-09T20:01:00Z'
  },
  {
    id: 'notif-2',
    business_id: 'biz-1',
    customer_id: 'cust-1',
    title: '📸 New Task Submission',
    message: 'Aarav Sharma submitted proof for Instagram follow task.',
    type: 'task_status',
    is_read: false,
    created_at: '2026-10-09T18:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-1',
    business_id: 'biz-1',
    actor_name: 'Owner (System)',
    action: 'VISIT_APPROVED',
    details: { customer: 'Vikramaditya Roy', visit_num: 10, amount: 1450 },
    created_at: '2026-10-09T20:00:00Z'
  },
  {
    id: 'audit-2',
    business_id: 'biz-1',
    actor_name: 'Staff (Manager)',
    action: 'REWARD_REDEEMED',
    details: { customer: 'Ananya Verma', reward: '3-Visit Loyalty Perk (15%)' },
    created_at: '2026-10-01T12:00:00Z'
  }
];
