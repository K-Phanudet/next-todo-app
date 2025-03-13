import React, { ReactNode } from 'react';

interface ModalContentProps {
  children: ReactNode;
  dataTestId?: string
}

export const ModalContent: React.FC<ModalContentProps> = ({ children, dataTestId }) => {
  return <div data-testid={dataTestId}>{children}</div>;
};