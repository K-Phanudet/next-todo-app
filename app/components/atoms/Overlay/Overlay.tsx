import React from 'react';

interface OverlayProps {
  onClick?: () => void;
  dataTestid?: string
}

export const Overlay: React.FC<OverlayProps> = ({ onClick,dataTestid }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-gray-800 bg-opacity-40 opacity-50"
      onClick={onClick}
      data-testid={dataTestid}
    />
  );
};