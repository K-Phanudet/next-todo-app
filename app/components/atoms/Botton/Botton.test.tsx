import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Botton';

describe('Button Component Tests', () => {
  it('should render the button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should apply the provided className', () => {
    render(<Button className="test-class">Click Me</Button>);
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply the cursor-pointer class by default', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveClass('cursor-pointer');
  });

  it('should spread other props to the button element', () => {
    render(<Button data-testid="test-button" disabled>Click Me</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toBeDisabled();
  });
});