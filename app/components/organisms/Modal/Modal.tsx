import React, { ReactNode } from 'react';
import { Overlay, ModalHeader, ModalContent }  from '@/app/components';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title = "Modal" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Overlay dataTestid="modal-overlay" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative z-50">
        <ModalHeader title={title} onClose={onClose} dataTestId="modal-header"/>
        <ModalContent dataTestId="modal-content">{children}</ModalContent>
      </div>
    </div>
  );
};

