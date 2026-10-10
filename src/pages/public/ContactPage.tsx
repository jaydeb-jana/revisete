import React, { useState } from 'react';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <Badge variant="teal">Contact Support</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
              Get In Touch With Revisit
            </h1>
            <p className="text-slate-400 text-sm">
              We respond to all onboarding, technical, and platform customization inquiries within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6 md:col-span-1">
              <Card className="p-5 bg-slate-900 border-slate-800 space-y-3">
                <div className="flex items-center gap-3 text-teal-400">
                  <Mail className="w-5 h-5" />
                  <span className="font-bold text-slate-200">Email Us</span>
                </div>
                <p className="text-xs text-slate-400">support@revisit.saas</p>
              </Card>

              <Card className="p-5 bg-slate-900 border-slate-800 space-y-3">
                <div className="flex items-center gap-3 text-teal-400">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-slate-200">Phone Support</span>
                </div>
                <p className="text-xs text-slate-400">+91 80 4567 8900 (Mon-Sat 9am-8pm)</p>
              </Card>

              <Card className="p-5 bg-slate-900 border-slate-800 space-y-3">
                <div className="flex items-center gap-3 text-teal-400">
                  <MapPin className="w-5 h-5" />
                  <span className="font-bold text-slate-200">Headquarters</span>
                </div>
                <p className="text-xs text-slate-400">MG Road Innovation Hub, Indiranagar, Bengaluru, KA 560038</p>
              </Card>
            </div>

            <Card className="p-8 bg-slate-900 border-slate-800 md:col-span-2">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">Message Received!</h3>
                  <p className="text-sm text-slate-400">Thank you for reaching out. Our customer success team will get back to you shortly.</p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      placeholder="e.g. Rahul Sharma"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="rahul@example.com"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <Input
                    label="Business Name"
                    placeholder="e.g. Spice Route Cafe"
                    value={form.business}
                    onChange={e => setForm({ ...form, business: e.target.value })}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Message</label>
                    <textarea
                      rows={4}
                      className="block w-full rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="How can we help your business grow customer retention?"
                      required
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <Button variant="primary" size="md" type="submit" leftIcon={<Send className="w-4 h-4" />}>
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
