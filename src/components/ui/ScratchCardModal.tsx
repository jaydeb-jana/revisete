import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Gift, CheckCircle2, X } from 'lucide-react';
import { Button } from './Button';
import { Reward } from '../../types';

interface ScratchCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: Reward;
  onScratchComplete?: () => void;
}

export const ScratchCardModal: React.FC<ScratchCardModalProps> = ({
  isOpen,
  onClose,
  reward,
  onScratchComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(reward.is_scratched || false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    if (!isOpen || isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill canvas with gold scratch coat gradient
    const width = canvas.width;
    const height = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D97706'); // Amber
    grad.addColorStop(0.5, '#F59E0B'); // Bright Gold
    grad.addColorStop(1, '#B45309'); // Dark Gold

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Overlay text on scratch layer
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE TO REVEAL ✨', width / 2, height / 2);
  }, [isOpen, isScratched]);

  if (!isOpen) return null;

  const handleScratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scratchX = x - rect.left;
    const scratchY = y - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(scratchX, scratchY, 24, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratched area percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparentPixels++;
    }

    const percent = transparentPixels / (canvas.width * canvas.height);
    if (percent > 0.45 && !isScratched) {
      setIsScratched(true);
      if (onScratchComplete) onScratchComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-amber-500/40 p-6 text-center shadow-2xl z-10 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Druto Digital Scratch Card
          </span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PRIZE CARD CONTAINER */}
        <div className="relative w-full h-48 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-950 to-slate-900 border border-amber-500/30 p-5 flex flex-col items-center justify-center space-y-2 overflow-hidden shadow-inner">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Gift className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-extrabold text-slate-100">{reward.title}</h3>
          <p className="text-xs text-amber-300 font-semibold">{reward.description}</p>
          <p className="text-[11px] font-mono text-teal-400 font-bold bg-slate-950 px-3 py-1 rounded-full border border-teal-500/30">
            Voucher Code: {reward.redemption_code}
          </p>

          {/* SCRATCH OVERLAY CANVAS */}
          {!isScratched && (
            <canvas
              ref={canvasRef}
              width={300}
              height={192}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none rounded-2xl z-20"
              onMouseDown={() => setIsScratching(true)}
              onMouseUp={() => setIsScratching(false)}
              onMouseMove={(e) => isScratching && handleScratch(e.clientX, e.clientY)}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                handleScratch(touch.clientX, touch.clientY);
              }}
            />
          )}
        </div>

        {isScratched ? (
          <div className="space-y-3">
            <p className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Congratulations! Reward Scratched & Unlocked!
            </p>
            <Button variant="teal" size="md" className="w-full" onClick={onClose}>
              Claim Voucher to Pass
            </Button>
          </div>
        ) : (
          <p className="text-xs text-slate-400 animate-pulse">
            👆 Swipe with your finger or mouse across the card to scratch & reveal!
          </p>
        )}
      </div>
    </div>
  );
};
