import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardContent } from './CardContent';

describe('CardContent Component Tests', () => {
  it('should render the title and description', () => {
    render(
      <CardContent
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should apply titleClassName and descriptionClassName', () => {
    render(
      <CardContent
        title="Test Title"
        description="Test Description"
        titleClassName="test-title-class"
        descriptionClassName="test-description-class"
      />
    );
    expect(screen.getByText('Test Title')).toHaveClass('test-title-class');
    expect(screen.getByText('Test Description')).toHaveClass('test-description-class');
  });

  it('should apply containerClassName', () => {
    render(
      <CardContent
        title="Test Title"
        description="Test Description"
        containerClassName="test-container-class"
        dataTestId="card-content"
      />
    );
    expect(screen.getByTestId('card-content')).toHaveClass('test-container-class');
  });
});