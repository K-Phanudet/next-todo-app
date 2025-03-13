import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalHeader } from './ModalHeader';

describe('ModalHeader Component Tests', () => {
  it('should render the title and close button', () => {
    render(<ModalHeader title="Test Modal" onClose={() => {}} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<ModalHeader title="Test Modal" onClose={onCloseMock} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should render the close Icon', () => {
    render(<ModalHeader title="Test Modal" onClose={() => {}} />);
    expect(screen.getByTestId('modal-header-close-icon')).toBeInTheDocument();
  });
});