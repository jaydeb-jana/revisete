import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'teal' | 'druto';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'druto',
  size = 'md',
  className,
}) => {
  const variants = {
    druto: 'bg-rose-100 text-[#900A12] border border-rose-200 font-bold',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold',
    warning: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold',
    danger: 'bg-rose-100 text-[#900A12] border border-rose-200 font-bold',
    info: 'bg-sky-50 text-sky-700 border border-sky-200 font-semibold',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200 font-medium',
    teal: 'bg-rose-100 text-[#900A12] border border-rose-200 font-bold',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded-full',
    md: 'px-2.5 py-1 text-xs rounded-full',
  };

  return (
    <span className={twMerge(clsx('inline-flex items-center gap-1 leading-none', variants[variant], sizes[size], className))}>
      {children}
    </span>
  );
};
