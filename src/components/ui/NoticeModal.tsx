import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  title = 'Notification',
  message,
  buttonText = 'OK',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="space-y-5 text-slate-900 font-sans">
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="p-2 bg-emerald-100 rounded-xl text-emerald-800 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-emerald-900 leading-relaxed mt-0.5">
            {message}
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="druto" size="md" onClick={onClose}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
