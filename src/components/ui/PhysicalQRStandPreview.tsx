import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, Download, Sparkles, QrCode } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Business } from '../../types';

interface PhysicalQRStandPreviewProps {
  business: Business;
}

export const PhysicalQRStandPreview: React.FC<PhysicalQRStandPreviewProps> = ({ business }) => {
  const qrUrl = `https://druto.in/c/${business.slug}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-teal-400" /> Free Physical QR Code Acrylic Stand
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Display this QR stand at your counter. Customers scan to collect digital stamps on every visit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
            Print Poster
          </Button>
        </div>
      </div>

      {/* ACRYLIC STAND VISUAL MOCKUP */}
      <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex justify-center">
        {/* PHYSICAL ACRYLIC STAND BOARD */}
        <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl text-center space-y-4 relative overflow-hidden group">
          {/* GLASS ACRYLIC REFLECTION EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

          {/* BRAND LOGO HEADER */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 font-extrabold text-lg mb-2">
              {business.name.slice(0, 2).toUpperCase()}
            </div>
            <h4 className="font-extrabold text-slate-100 text-sm">{business.name}</h4>
            <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">Official Loyalty Partner</span>
          </div>

          {/* QR CODE CONTAINER */}
          <div className="bg-white p-4 rounded-2xl border-4 border-slate-800 shadow-xl inline-block mx-auto">
            <QRCodeSVG value={qrUrl} size={150} level="H" />
          </div>

          {/* SCAN INSTRUCTIONS */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-200">SCAN TO EARN STAMPS & REWARDS</p>
            <p className="text-[10px] text-slate-400">No App Download Needed • Tap & Scan</p>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-1.5 text-[10px] text-teal-400 font-mono">
            <Sparkles className="w-3 h-3" /> Powered by Druto Loyalty
          </div>
        </div>
      </div>
    </Card>
  );
};
