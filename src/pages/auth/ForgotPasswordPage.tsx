import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 font-bold text-2xl text-slate-100 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <RefreshCw className="w-6 h-6" />
          </div>
          <span className="bg-gradient-to-r from-slate-100 to-teal-400 bg-clip-text text-transparent">
            Revisit
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-100">Reset Your Password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 bg-slate-900 border-slate-800 shadow-2xl space-y-6">
          {sent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Recovery Email Sent</h3>
              <p className="text-xs text-slate-400">If an account exists for {email}, password recovery instructions have been sent.</p>
              <Link to="/login" className="inline-block text-xs font-semibold text-teal-400 hover:underline pt-2">
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Business Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
              />
              <Button variant="teal" size="md" className="w-full" type="submit">
                Send Reset Link
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
