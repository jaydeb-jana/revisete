import { describe, it, expect } from 'vitest';
import { INITIAL_BUSINESSES, INITIAL_CUSTOMERS, INITIAL_MILESTONES } from '../lib/mockData';

describe('Druto Customer Retention Engine', () => {
  it('should possess active seed business with category', () => {
    expect(INITIAL_BUSINESSES.length).toBeGreaterThanOrEqual(1);
    const categories = INITIAL_BUSINESSES.map(b => b.category);
    expect(categories).toContain('cafe');
  });

  it('should initialize CRM customers with unique membership numbers', () => {
    expect(INITIAL_CUSTOMERS.length).toBeGreaterThan(0);
    const membershipNums = INITIAL_CUSTOMERS.map(c => c.membership_number);
    const uniqueNums = new Set(membershipNums);
    expect(uniqueNums.size).toEqual(membershipNums.length);
  });

  it('should have milestone tiers defined for visit increments', () => {
    const visits = INITIAL_MILESTONES.map(m => m.visit_number);
    expect(visits).toContain(1);
    expect(visits).toContain(3);
    expect(visits).toContain(5);
  });
});
