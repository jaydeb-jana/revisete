-- REVISIT SaaS Initial Schema & Database Migrations

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  is_platform_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Businesses Table
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('restaurant', 'salon', 'fashion', 'retail', 'services')),
  description TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  operating_hours JSONB DEFAULT '{"mon": "9am-9pm", "tue": "9am-9pm", "wed": "9am-9pm", "thu": "9am-9pm", "fri": "9am-9pm", "sat": "10am-10pm", "sun": "Closed"}'::jsonb,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'trial')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Business Memberships
CREATE TABLE IF NOT EXISTS public.business_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (business_id, user_id)
);

-- 4. Catalog Categories
CREATE TABLE IF NOT EXISTS public.catalog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Catalog Items
CREATE TABLE IF NOT EXISTS public.catalog_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.catalog_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  currency TEXT DEFAULT 'INR',
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb, -- Store category specifics: duration, sku, size, food diet, stock
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Customers CRM
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  membership_number TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  notes TEXT,
  referral_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (business_id, membership_number)
);

-- 7. Loyalty Programs
CREATE TABLE IF NOT EXISTS public.loyalty_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Standard Loyalty Program',
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  cooldown_hours INT DEFAULT 4,
  min_purchase_amount NUMERIC(10,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Loyalty Milestones
CREATE TABLE IF NOT EXISTS public.loyalty_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.loyalty_programs(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  visit_number INT NOT NULL,
  title TEXT NOT NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('free_product', 'free_service', 'percent_discount', 'fixed_discount', 'add_on', 'custom')),
  reward_value NUMERIC(10,2) DEFAULT 0.00,
  reward_description TEXT NOT NULL,
  expiry_days INT DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (program_id, visit_number)
);

-- 9. Customer Visits
CREATE TABLE IF NOT EXISTS public.visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  purchase_amount NUMERIC(10,2) DEFAULT 0.00,
  status TEXT DEFAULT 'approved' CHECK (status IN ('approved', 'rejected', 'reversed')),
  notes TEXT,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Customer Tasks
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  task_type TEXT NOT NULL CHECK (task_type IN ('social_follow', 'social_share', 'upload_proof', 'purchase_milestone', 'category_visit', 'submit_feedback', 'referral', 'custom')),
  reward_description TEXT NOT NULL,
  reward_points_or_discount NUMERIC(10,2) DEFAULT 0.00,
  proof_required BOOLEAN DEFAULT TRUE,
  verification_method TEXT DEFAULT 'manual_review' CHECK (verification_method IN ('manual_review', 'instant_code', 'staff_verification')),
  is_active BOOLEAN DEFAULT TRUE,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Task Submissions
CREATE TABLE IF NOT EXISTS public.task_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  proof_url TEXT,
  proof_notes TEXT,
  admin_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Rewards & Entitlements
CREATE TABLE IF NOT EXISTS public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES public.loyalty_milestones(id) ON DELETE SET NULL,
  task_submission_id UUID REFERENCES public.task_submissions(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  reward_value NUMERIC(10,2) DEFAULT 0.00,
  description TEXT,
  redemption_code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'redeemed', 'expired', 'cancelled')),
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  redeemed_at TIMESTAMPTZ,
  redeemed_by_staff_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Redemptions Log
CREATE TABLE IF NOT EXISTS public.redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Referrals
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  referrer_customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  referred_customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'qualified', 'rewarded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (referrer_customer_id, referred_customer_id)
);

-- 15. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'visit' CHECK (type IN ('visit', 'reward_unlocked', 'task_status', 'expiry_warning', 'referral')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Platform Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON public.businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON public.business_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_biz ON public.business_memberships(business_id);
CREATE INDEX IF NOT EXISTS idx_customers_biz ON public.customers(business_id);
CREATE INDEX IF NOT EXISTS idx_visits_biz_cust ON public.visits(business_id, customer_id);
CREATE INDEX IF NOT EXISTS idx_rewards_biz_cust ON public.rewards(business_id, customer_id);
CREATE INDEX IF NOT EXISTS idx_rewards_code ON public.rewards(redemption_code);

-- ROW LEVEL SECURITY POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to check business membership
CREATE OR REPLACE FUNCTION public.is_business_member(biz_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.business_memberships
    WHERE business_id = biz_id AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies
CREATE POLICY "Public profiles are viewable by owner" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR is_platform_admin = TRUE);

CREATE POLICY "Users can edit own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public businesses viewable by all" ON public.businesses
  FOR SELECT USING (TRUE);

CREATE POLICY "Business owner can update business" ON public.businesses
  FOR ALL USING (owner_id = auth.uid() OR is_business_member(id));

CREATE POLICY "Catalog viewable publicly" ON public.catalog_items
  FOR SELECT USING (TRUE);

CREATE POLICY "Catalog editable by staff" ON public.catalog_items
  FOR ALL USING (is_business_member(business_id));

CREATE POLICY "Visits manageable by staff" ON public.visits
  FOR ALL USING (is_business_member(business_id));

CREATE POLICY "Rewards viewable by customer or staff" ON public.rewards
  FOR SELECT USING (
    is_business_member(business_id) OR 
    EXISTS (SELECT 1 FROM public.customers c WHERE c.id = customer_id AND c.user_id = auth.uid())
  );
