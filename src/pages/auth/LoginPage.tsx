import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RefreshCw, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('janajaydeb36@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    }
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
        <h2 className="text-2xl font-extrabold font-serif text-slate-100">Sign in to your account</h2>
        <p className="text-xs text-slate-400">Access your Druto merchant loyalty console</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-[#1A1A1A] border-slate-800 shadow-2xl space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5 shadow-lg">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <p className="font-bold text-rose-300">Authentication Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Business Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[11px]">Demo pass: password123</span>
              <Link to="/forgot-password" className="text-rose-400 hover:text-rose-300 font-semibold">
                Forgot password?
              </Link>
            </div>

            <Button
              variant="druto"
              size="lg"
              className="w-full font-bold shadow-lg shadow-rose-950/60"
              type="submit"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Console
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Don't have a business account?{' '}
              <Link to="/register" className="text-rose-400 hover:text-rose-300 font-semibold">
                Start 3-Day Free Trial
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
