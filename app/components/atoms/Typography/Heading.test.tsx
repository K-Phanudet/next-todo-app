import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading Component Tests', () => {
  it('should render the heading with children', () => {
    render(<Heading>This is a heading.</Heading>);
    expect(screen.getByText('This is a heading.')).toBeInTheDocument();
  });

  it('should spread other props to the h6 element', () => {
    render(<Heading data-testid="test-heading" className="test-class">This is a heading.</Heading>);
    const heading = screen.getByTestId('test-heading');
    expect(heading).toHaveClass('test-class');
  });

  it('should render with correct default attributes', () => {
    render(<Heading>This is a heading.</Heading>);
    const heading = screen.getByText('This is a heading.');
    expect(heading).toBeInTheDocument();
  });
});