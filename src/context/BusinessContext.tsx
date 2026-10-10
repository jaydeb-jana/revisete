import React, { createContext, useContext, useState } from 'react';
import {
  CatalogCategory,
  CatalogItem,
  Customer,
  LoyaltyMilestone,
  Visit,
  CustomerTask,
  TaskSubmission,
  Reward,
  NotificationItem,
  AuditLog,
  LoyaltyProgram
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_ITEMS,
  INITIAL_CUSTOMERS,
  INITIAL_MILESTONES,
  INITIAL_VISITS,
  INITIAL_TASKS,
  INITIAL_SUBMISSIONS,
  INITIAL_REWARDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS
} from '../lib/mockData';
import { useAuth } from './AuthContext';

interface BusinessContextType {
  categories: CatalogCategory[];
  items: CatalogItem[];
  customers: Customer[];
  loyaltyProgram: LoyaltyProgram;
  milestones: LoyaltyMilestone[];
  visits: Visit[];
  tasks: CustomerTask[];
  submissions: TaskSubmission[];
  rewards: Reward[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
  
  // Actions
  addCategory: (category: Omit<CatalogCategory, 'id' | 'business_id'>) => void;
  addItem: (item: Omit<CatalogItem, 'id' | 'business_id' | 'created_at'>) => void;
  updateItem: (id: string, item: Partial<CatalogItem>) => void;
  deleteItem: (id: string) => void;
  
  addCustomer: (customer: Omit<Customer, 'id' | 'business_id' | 'created_at' | 'total_visits' | 'current_stamps' | 'completed_cards' | 'referral_code' | 'membership_number'>) => Customer;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  updateLoyaltyProgram: (program: Partial<LoyaltyProgram>) => void;
  addMilestone: (milestone: Omit<LoyaltyMilestone, 'id' | 'business_id' | 'program_id'>) => void;
  updateMilestone: (id: string, milestone: Partial<LoyaltyMilestone>) => void;
  deleteMilestone: (id: string) => void;
  
  recordVisit: (customerId: string, purchaseAmount: number, notes?: string, branchId?: string) => { success: boolean; message: string; newReward?: Reward };
  
  addTask: (task: Omit<CustomerTask, 'id' | 'business_id'>) => void;
  updateTask: (id: string, task: Partial<CustomerTask>) => void;
  submitTask: (taskId: string, customerId: string, proofUrl?: string, proofNotes?: string) => void;
  approveTaskSubmission: (submissionId: string, adminNotes?: string) => void;
  rejectTaskSubmission: (submissionId: string, adminNotes?: string) => void;
  
  redeemReward: (redemptionCode: string, notes?: string) => { success: boolean; message: string; reward?: Reward };
  scratchReward: (rewardId: string) => void;
  markNotificationRead: (id: string) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeBusiness } = useAuth();
  const currentBizId = activeBusiness?.id || 'biz-1';

  const [categories, setCategories] = useState<CatalogCategory[]>(INITIAL_CATEGORIES);
  const [items, setItems] = useState<CatalogItem[]>(INITIAL_ITEMS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgram>({
    id: 'prog-1',
    business_id: currentBizId,
    name: 'Druto QR Digital Stamp Card Program',
    description: 'Collect digital stamps on every visit to unlock free rewards & scratch cards.',
    is_active: true,
    cooldown_hours: 4,
    min_purchase_amount: 100,
    stamps_per_card: 10,
    enable_scratch_cards: true,
  });
  const [milestones, setMilestones] = useState<LoyaltyMilestone[]>(INITIAL_MILESTONES);
  const [visits, setVisits] = useState<Visit[]>(INITIAL_VISITS);
  const [tasks, setTasks] = useState<CustomerTask[]>(INITIAL_TASKS);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(INITIAL_SUBMISSIONS);
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const currentCategories = categories.filter(c => c.business_id === currentBizId);
  const currentItems = items.filter(i => i.business_id === currentBizId);
  const currentCustomers = customers.filter(c => c.business_id === currentBizId);
  const currentMilestones = milestones.filter(m => m.business_id === currentBizId);
  const currentVisits = visits.filter(v => v.business_id === currentBizId);
  const currentTasks = tasks.filter(t => t.business_id === currentBizId);
  const currentSubmissions = submissions.filter(s => s.business_id === currentBizId);
  const currentRewards = rewards.filter(r => r.business_id === currentBizId);
  const currentNotifications = notifications.filter(n => n.business_id === currentBizId);
  const currentAuditLogs = auditLogs.filter(a => a.business_id === currentBizId);

  const addCategory = (catData: Omit<CatalogCategory, 'id' | 'business_id'>) => {
    const newCat: CatalogCategory = {
      id: 'cat-' + Date.now(),
      business_id: currentBizId,
      ...catData,
    };
    setCategories(prev => [...prev, newCat]);
  };

  const addItem = (itemData: Omit<CatalogItem, 'id' | 'business_id' | 'created_at'>) => {
    const newItem: CatalogItem = {
      id: 'item-' + Date.now(),
      business_id: currentBizId,
      created_at: new Date().toISOString(),
      ...itemData,
    };
    setItems(prev => [newItem, ...prev]);
  };

  const updateItem = (id: string, updated: Partial<CatalogItem>) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...updated } : i));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const addCustomer = (custData: Omit<Customer, 'id' | 'business_id' | 'created_at' | 'total_visits' | 'current_stamps' | 'completed_cards' | 'referral_code' | 'membership_number'>): Customer => {
    const nextNum = 1000 + currentCustomers.length + 1;
    const newCust: Customer = {
      id: 'cust-' + Date.now(),
      business_id: currentBizId,
      membership_number: `REV-${nextNum}`,
      referral_code: custData.name.substring(0, 4).toUpperCase() + Math.floor(100 + Math.random() * 900),
      total_visits: 0,
      current_stamps: 0,
      completed_cards: 0,
      created_at: new Date().toISOString(),
      ...custData,
    };
    setCustomers(prev => [newCust, ...prev]);
    return newCust;
  };

  const updateCustomer = (id: string, data: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const updateLoyaltyProgram = (prog: Partial<LoyaltyProgram>) => {
    setLoyaltyProgram(prev => ({ ...prev, ...prog }));
  };

  const addMilestone = (m: Omit<LoyaltyMilestone, 'id' | 'business_id' | 'program_id'>) => {
    const newM: LoyaltyMilestone = {
      id: 'ms-' + Date.now(),
      business_id: currentBizId,
      program_id: loyaltyProgram.id,
      ...m,
    };
    setMilestones(prev => [...prev, newM]);
  };

  const updateMilestone = (id: string, updated: Partial<LoyaltyMilestone>) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  const recordVisit = (customerId: string, purchaseAmount: number, notes?: string, branchId?: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
      return { success: false, message: 'Customer record not found.' };
    }

    if (loyaltyProgram.min_purchase_amount > 0 && purchaseAmount < loyaltyProgram.min_purchase_amount) {
      return {
        success: false,
        message: `Minimum purchase amount for visit eligibility is ${activeBusiness?.currency || '₹'}${loyaltyProgram.min_purchase_amount}.`
      };
    }

    if (customer.last_visit_at && loyaltyProgram.cooldown_hours > 0) {
      const lastVisitTime = new Date(customer.last_visit_at).getTime();
      const nowTime = new Date().getTime();
      const hoursDiff = (nowTime - lastVisitTime) / (1000 * 60 * 60);

      if (hoursDiff < loyaltyProgram.cooldown_hours) {
        const remainingMins = Math.ceil((loyaltyProgram.cooldown_hours - hoursDiff) * 60);
        return {
          success: false,
          message: `Visit cooldown active. Please wait ${remainingMins} minutes before recording another visit for this customer.`
        };
      }
    }

    const nowIso = new Date().toISOString();
    const newVisitCount = customer.total_visits + 1;
    let nextStamps = customer.current_stamps + 1;
    let nextCompletedCards = customer.completed_cards;

    if (nextStamps >= loyaltyProgram.stamps_per_card) {
      nextStamps = 0;
      nextCompletedCards += 1;
    }

    const newVisit: Visit = {
      id: 'v-' + Date.now(),
      business_id: currentBizId,
      branch_id: branchId || activeBusiness?.branches[0]?.id,
      branch_name: activeBusiness?.branches[0]?.name || 'Main Branch',
      customer_id: customerId,
      customer_name: customer.name,
      purchase_amount: purchaseAmount,
      status: 'approved',
      notes,
      scanned_at: nowIso,
    };

    setVisits(prev => [newVisit, ...prev]);

    updateCustomer(customerId, {
      total_visits: newVisitCount,
      current_stamps: nextStamps,
      completed_cards: nextCompletedCards,
      last_visit_at: nowIso,
      last_branch_id: branchId,
    });

    const milestoneHit = currentMilestones.find(m => m.visit_number === newVisitCount);
    let newReward: Reward | undefined = undefined;

    if (milestoneHit) {
      const code = `${milestoneHit.reward_type.toUpperCase().slice(0, 4)}-${newVisitCount}-${customer.name.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + milestoneHit.expiry_days);

      newReward = {
        id: 'rew-' + Date.now(),
        business_id: currentBizId,
        customer_id: customerId,
        milestone_id: milestoneHit.id,
        title: milestoneHit.title,
        reward_type: milestoneHit.reward_type,
        reward_value: milestoneHit.reward_value,
        description: milestoneHit.reward_description,
        redemption_code: code,
        status: 'available',
        is_scratch_card: milestoneHit.is_scratch_card || loyaltyProgram.enable_scratch_cards,
        is_scratched: false,
        unlocked_at: nowIso,
        expires_at: expiryDate.toISOString(),
      };

      setRewards(prev => [newReward!, ...prev]);

      const newNotif: NotificationItem = {
        id: 'notif-' + Date.now(),
        business_id: currentBizId,
        customer_id: customerId,
        title: '🎉 Reward Unlocked!',
        message: `${customer.name} unlocked ${milestoneHit.title} on visit #${newVisitCount}! Code: ${code}`,
        type: 'reward_unlocked',
        is_read: false,
        created_at: nowIso,
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    setAuditLogs(prev => [{
      id: 'audit-' + Date.now(),
      business_id: currentBizId,
      actor_name: 'Staff / System',
      action: 'VISIT_APPROVED',
      details: { customer: customer.name, visit_number: newVisitCount, amount: purchaseAmount },
      created_at: nowIso,
    }, ...prev]);

    return {
      success: true,
      message: `Visit #${newVisitCount} recorded! Stamp collected (${nextStamps}/10).${newReward ? ` 🎉 Reward '${newReward.title}' unlocked!` : ''}`,
      newReward,
    };
  };

  const addTask = (t: Omit<CustomerTask, 'id' | 'business_id'>) => {
    const newTask: CustomerTask = {
      id: 'task-' + Date.now(),
      business_id: currentBizId,
      ...t,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updated: Partial<CustomerTask>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const submitTask = (taskId: string, customerId: string, proofUrl?: string, proofNotes?: string) => {
    const task = tasks.find(t => t.id === taskId);
    const customer = customers.find(c => c.id === customerId);
    if (!task || !customer) return;

    const newSub: TaskSubmission = {
      id: 'sub-' + Date.now(),
      business_id: currentBizId,
      task_id: taskId,
      task_title: task.title,
      customer_id: customerId,
      customer_name: customer.name,
      status: task.verification_method === 'instant_code' ? 'approved' : 'pending',
      proof_url: proofUrl,
      proof_notes: proofNotes,
      created_at: new Date().toISOString(),
    };

    setSubmissions(prev => [newSub, ...prev]);

    if (task.verification_method === 'instant_code') {
      approveTaskSubmission(newSub.id, 'Auto-approved via Instant Verification');
    }
  };

  const approveTaskSubmission = (submissionId: string, adminNotes?: string) => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub || sub.status === 'approved') return;

    const task = tasks.find(t => t.id === sub.task_id);
    const customer = customers.find(c => c.id === sub.customer_id);

    setSubmissions(prev => prev.map(s => s.id === submissionId ? {
      ...s,
      status: 'approved',
      admin_notes: adminNotes || 'Approved by owner',
      reviewed_at: new Date().toISOString()
    } : s));

    if (task && customer) {
      const code = `TASK-${task.task_type.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newReward: Reward = {
        id: 'rew-' + Date.now(),
        business_id: currentBizId,
        customer_id: customer.id,
        task_submission_id: submissionId,
        title: `Task Reward: ${task.title}`,
        reward_type: 'percent_discount',
        reward_value: task.reward_points_or_discount,
        description: task.reward_description,
        redemption_code: code,
        status: 'available',
        is_scratch_card: true,
        is_scratched: false,
        unlocked_at: new Date().toISOString(),
      };

      setRewards(prev => [newReward, ...prev]);
    }
  };

  const rejectTaskSubmission = (submissionId: string, adminNotes?: string) => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? {
      ...s,
      status: 'rejected',
      admin_notes: adminNotes || 'Proof rejected',
      reviewed_at: new Date().toISOString()
    } : s));
  };

  const redeemReward = (redemptionCode: string, notes?: string) => {
    const codeClean = redemptionCode.trim().toUpperCase();
    const reward = currentRewards.find(r => r.redemption_code.toUpperCase() === codeClean);

    if (!reward) {
      return { success: false, message: 'Invalid redemption code. Code not found.' };
    }

    if (reward.status === 'redeemed') {
      return { success: false, message: `Reward '${reward.title}' was ALREADY redeemed on ${new Date(reward.redeemed_at!).toLocaleDateString()}.` };
    }

    if (reward.status === 'expired' || (reward.expires_at && new Date(reward.expires_at) < new Date())) {
      return { success: false, message: `Reward '${reward.title}' has EXPIRED and cannot be redeemed.` };
    }

    if (reward.status !== 'available') {
      return { success: false, message: `Reward status is '${reward.status}'. Cannot redeem.` };
    }

    const nowIso = new Date().toISOString();

    setRewards(prev => prev.map(r => r.id === reward.id ? {
      ...r,
      status: 'redeemed',
      redeemed_at: nowIso,
    } : r));

    setAuditLogs(prev => [{
      id: 'audit-' + Date.now(),
      business_id: currentBizId,
      actor_name: 'Staff',
      action: 'REWARD_REDEEMED',
      details: { code: codeClean, reward_title: reward.title, notes },
      created_at: nowIso,
    }, ...prev]);

    return {
      success: true,
      message: `Reward '${reward.title}' (${reward.reward_type === 'percent_discount' ? `${reward.reward_value}% Off` : reward.description || 'perk'}) successfully REDEEMED!`,
      reward,
    };
  };

  const scratchReward = (rewardId: string) => {
    setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, is_scratched: true } : r));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  return (
    <BusinessContext.Provider value={{
      categories: currentCategories,
      items: currentItems,
      customers: currentCustomers,
      loyaltyProgram,
      milestones: currentMilestones,
      visits: currentVisits,
      tasks: currentTasks,
      submissions: currentSubmissions,
      rewards: currentRewards,
      notifications: currentNotifications,
      auditLogs: currentAuditLogs,
      
      addCategory,
      addItem,
      updateItem,
      deleteItem,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      updateLoyaltyProgram,
      addMilestone,
      updateMilestone,
      deleteMilestone,
      recordVisit,
      addTask,
      updateTask,
      submitTask,
      approveTaskSubmission,
      rejectTaskSubmission,
      redeemReward,
      scratchReward,
      markNotificationRead,
    }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
