import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Component Tests', () => {
  const onCloseMock = jest.fn();
  const testChildren = <p>Test Modal Content</p>;

  it('should not render when isOpen is false', () => {
    const { container } = render(<Modal isOpen={false} onClose={onCloseMock} children={testChildren} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={onCloseMock} children={testChildren} />);
    expect(screen.getByText('Test Modal Content')).toBeInTheDocument();
  });

  it('should render Overlay, ModalHeader, and ModalContent components', () => {
    render(<Modal isOpen={true} onClose={onCloseMock} children={testChildren} />);
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument(); 
    expect(screen.getByTestId('modal-header')).toBeInTheDocument(); 
    expect(screen.getByTestId('modal-content')).toBeInTheDocument(); 
  });

  it('should call onClose when Overlay is clicked', () => {
    render(<Modal isOpen={true} onClose={onCloseMock} children={testChildren} />);
    fireEvent.click(screen.getByTestId('modal-header-close-btn'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });


  it('should render with custom title', () => {
    render(<Modal isOpen={true} onClose={onCloseMock} children={testChildren} title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});