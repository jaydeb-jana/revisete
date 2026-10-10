import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation Required',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="space-y-5 text-slate-900 font-sans">
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="p-2 bg-rose-100 rounded-xl text-[#800A12] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-slate-700 leading-relaxed mt-0.5">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-2.5 pt-2">
          <Button variant="secondary" size="md" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'druto'}
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
