import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat' | 'bordered' | 'dark';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-slate-200/80 shadow-sm text-slate-900',
    flat: 'bg-slate-50 border border-slate-200 text-slate-900',
    bordered: 'bg-transparent border border-slate-300 text-slate-900',
    dark: 'bg-[#1A1A1A] border border-slate-800 text-slate-100 shadow-md',
  };

  return (
    <div
      className={twMerge(clsx('rounded-2xl p-5 transition-all', variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
};
