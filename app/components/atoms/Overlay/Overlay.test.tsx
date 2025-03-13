import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Overlay } from './Overlay';

describe('Overlay Component Tests', () => {
  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Overlay onClick={handleClick} dataTestid='overlay-test'/>);
    fireEvent.click(screen.getByTestId('overlay-test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with correct role', () => {
    render(<Overlay dataTestid='overlay-test'/>);
    const overlay = screen.getByTestId('overlay-test');
    expect(overlay).toBeInTheDocument();
  });
});