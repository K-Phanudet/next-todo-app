import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon Component Tests', () => {
  it('should render the icon with children', () => {
    render(
      <Icon data-testid="test-icon">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </Icon>
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon').querySelector('path')).toBeInTheDocument();
  });

  it('should spread other props to the svg element', () => {
    render(
      <Icon data-testid="test-icon" className="test-class">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </Icon>
    );

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('test-class');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(icon).toHaveAttribute('fill', 'none');
    expect(icon).toHaveAttribute('stroke', 'currentColor');
  });

  it('should render with correct default attributes', () => {
    render(
      <Icon data-testid='test-icon'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </Icon>
    );

    const icon = screen.getByTestId('test-icon')
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(icon).toHaveAttribute('fill', 'none');
    expect(icon).toHaveAttribute('stroke', 'currentColor');
  });
});