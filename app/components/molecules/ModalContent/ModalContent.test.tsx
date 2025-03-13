import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModalContent } from './ModalContent';

describe('ModalContent Component Tests', () => {
  it('should render the children within the div', () => {
    const testContent = 'This is modal content.';
    render(<ModalContent>{testContent}</ModalContent>);
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('should render complex children', () => {
    render(
      <ModalContent>
        <div>
          <p>Paragraph inside modal</p>
          <button>Click me</button>
        </div>
      </ModalContent>
    );
    expect(screen.getByText('Paragraph inside modal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
});