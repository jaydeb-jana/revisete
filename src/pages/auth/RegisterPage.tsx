import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RefreshCw, Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const RegisterPage: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('janajaydeb36@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(name || 'Merchant Owner', email, password);
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleDemoRegister = () => {
    register(name || 'Merchant Owner', email, password).catch(() => {});
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-2.5 font-serif font-extrabold text-3xl text-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#900A12]/20 border border-[#900A12]/40 flex items-center justify-center text-[#FB7185]">
            <RefreshCw className="w-6 h-6" />
          </div>
          <span className="bg-gradient-to-r from-slate-100 to-rose-400 bg-clip-text text-transparent">
            Druto
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold font-serif text-slate-100">Create your business account</h2>
        <p className="text-xs text-slate-400">Start 3-Day Free Trial • No credit card required</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-[#1A1A1A] border-slate-800 shadow-2xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name / Owner Name"
              placeholder="e.g. Ajay Deb"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Business Email"
              type="email"
              placeholder="owner@mybusiness.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button
              variant="druto"
              size="lg"
              className="w-full"
              type="submit"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start 3-Day Free Trial
            </Button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={handleDemoRegister}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-teal-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" /> Direct Trial Registration (Bypass Confirm)
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-rose-400 hover:text-rose-300 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
