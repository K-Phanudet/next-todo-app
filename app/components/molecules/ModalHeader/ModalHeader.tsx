import React from 'react';
import { Button, Icon , Heading } from '@/app/components';


interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  dataTestId?:string
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose, dataTestId }) => {
  return (
    <div data-testid={dataTestId} className="flex justify-between items-center mb-4">
      <Heading className="text-lg font-semibold" data-testid="modal-header-title">{title}</Heading>
      <Button onClick={onClose} data-testid="modal-header-close-btn" className="text-gray-500 hover:text-gray-700">
        <Icon className="h-6 w-6" data-testid="modal-header-close-icon">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </Icon>
      </Button>
    </div>
  );
};