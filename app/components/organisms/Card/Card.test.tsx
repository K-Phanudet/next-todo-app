import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component Tests', () => {
  const mockContentProps = {
    title: 'Test Title',
    description: 'Test Description',
  };

  const mockActionsProps = {
    buttons: [{ buttonText: 'Test Button' }],
  };

  it('should render CardContent and CardActions components', () => {
    render(<Card contentProps={mockContentProps} actionsProps={mockActionsProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render CardImage when imageProps are provided', () => {
    const mockImageProps = {
      src: 'test.jpg',
      alt: 'Test Image',
    };
    render(<Card imageProps={mockImageProps} contentProps={mockContentProps} actionsProps={mockActionsProps} />);
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  it('should not render CardImage when imageProps are not provided', () => {
    render(<Card contentProps={mockContentProps} actionsProps={mockActionsProps} />);
    expect(screen.queryByAltText('Test Image')).toBeNull();
  });

  it('should apply className prop', () => {
    render(<Card dataTestId="card-test" contentProps={mockContentProps} actionsProps={mockActionsProps} className="test-card-class" />);
    expect(screen.getByTestId('card-test')).toHaveClass('test-card-class');
  });
});