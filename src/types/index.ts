export type BusinessCategory = 'cafe' | 'restaurant' | 'salon' | 'gym' | 'fashion' | 'retail' | 'carwash' | 'services';

export type UserRole = 'owner' | 'manager' | 'staff';

export type RewardType = 'free_product' | 'free_service' | 'percent_discount' | 'fixed_discount' | 'scratch_card' | 'add_on' | 'custom';

export type TaskType = 'social_follow' | 'social_share' | 'upload_proof' | 'purchase_milestone' | 'category_visit' | 'submit_feedback' | 'referral' | 'custom';

export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export type RewardStatus = 'available' | 'redeemed' | 'expired' | 'cancelled';

export type VisitStatus = 'approved' | 'rejected' | 'reversed';

export type SubscriptionPlan = 'trial' | 'basic' | 'growth' | 'pro' | 'enterprise';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  is_platform_admin?: boolean;
  created_at: string;
}

export interface BusinessBranch {
  id: string;
  business_id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone: string;
  is_main: boolean;
}

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  logo_url?: string;
  category: BusinessCategory;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  operating_hours?: Record<string, string>;
  currency: string;
  status: 'active' | 'suspended' | 'trial';
  plan: SubscriptionPlan;
  trial_ends_at?: string;
  branches: BusinessBranch[];
  created_at: string;
}

export interface BusinessMembership {
  id: string;
  business_id: string;
  user_id: string;
  role: UserRole;
}

export interface CatalogCategory {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  sort_order: number;
}

export interface CatalogItem {
  id: string;
  business_id: string;
  category_id?: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  image_url?: string;
  is_available: boolean;
  metadata?: {
    item_type?: string;
    images?: string[];
    video?: string;
    diet_type?: 'veg' | 'non-veg' | 'vegan'; // Cafe/Restaurant
    duration_minutes?: number; // Salon/Spa
    assigned_staff?: string; // Salon
    sku?: string; // Fashion/Retail
    sizes?: string[]; // Fashion
    colors?: string[]; // Fashion
    stock_qty?: number; // Retail
    unit?: string;
  };
  created_at: string;
}

export interface Customer {
  id: string;
  business_id: string;
  membership_number: string;
  name: string;
  nickname?: string;
  phone?: string;
  email?: string;
  notes?: string;
  referral_code: string;
  total_visits: number;
  current_stamps: number; // 0 to 10
  completed_cards: number;
  last_visit_at?: string;
  last_branch_id?: string;
  created_at: string;
}

export interface LoyaltyProgram {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  cooldown_hours: number;
  min_purchase_amount: number;
  stamps_per_card: number; // Default 10
  enable_scratch_cards: boolean;
}

export interface LoyaltyMilestone {
  id: string;
  program_id: string;
  business_id: string;
  visit_number: number;
  title: string;
  reward_type: RewardType;
  reward_value: number;
  reward_description: string;
  expiry_days: number;
  min_spend_amount?: number;
  is_scratch_card?: boolean;
}

export interface Visit {
  id: string;
  business_id: string;
  branch_id?: string;
  branch_name?: string;
  customer_id: string;
  customer_name?: string;
  staff_id?: string;
  purchase_amount: number;
  status: VisitStatus;
  notes?: string;
  scanned_at: string;
  gps_latitude?: number;
  gps_longitude?: number;
}

export interface CustomerTask {
  id: string;
  business_id: string;
  title: string;
  instructions: string;
  task_type: TaskType;
  reward_description: string;
  reward_points_or_discount: number;
  proof_required: boolean;
  verification_method: 'manual_review' | 'instant_code' | 'staff_verification';
  is_active: boolean;
  start_date?: string;
  end_date?: string;
}

export interface TaskSubmission {
  id: string;
  business_id: string;
  task_id: string;
  task_title?: string;
  customer_id: string;
  customer_name?: string;
  status: SubmissionStatus;
  proof_url?: string;
  proof_notes?: string;
  admin_notes?: string;
  reviewed_at?: string;
  created_at: string;
}

export interface Reward {
  id: string;
  business_id: string;
  customer_id: string;
  milestone_id?: string;
  task_submission_id?: string;
  title: string;
  reward_type: RewardType;
  reward_value: number;
  description?: string;
  redemption_code: string;
  status: RewardStatus;
  is_scratch_card?: boolean;
  is_scratched?: boolean;
  unlocked_at: string;
  expires_at?: string;
  redeemed_at?: string;
}

export interface Referral {
  id: string;
  business_id: string;
  referrer_customer_id: string;
  referrer_name?: string;
  referred_customer_id: string;
  referred_name?: string;
  referral_code: string;
  status: 'pending' | 'qualified' | 'rewarded';
  created_at: string;
}

export interface NotificationItem {
  id: string;
  business_id: string;
  customer_id?: string;
  title: string;
  message: string;
  type: 'visit' | 'reward_unlocked' | 'task_status' | 'expiry_warning' | 'referral';
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  business_id?: string;
  actor_id?: string;
  actor_name?: string;
  action: string;
  details?: Record<string, unknown>;
  created_at: string;
}
