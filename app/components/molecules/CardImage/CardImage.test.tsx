import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardImage } from './CardImage';

describe('CardImage Component Tests', () => {
  it('should render the image with src and alt', () => {
    render(
      <CardImage
        src="test.jpg"
        alt="Test Image"
      />
    );
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  it('should apply imageClassName and containerClassName', () => {
    render(
      <CardImage
        src="test.jpg"
        alt="Test Image"
        imageClassName="test-image-class"
        containerClassName="test-container-class"
        dataTestId='card-img-test'
      />
    );
    expect(screen.getByTestId('card-img-test-img')).toHaveClass('test-image-class');
    expect(screen.getByTestId('card-img-test')).toHaveClass('test-container-class');
  });
});