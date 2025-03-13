import React from 'react';
import { render, screen } from '@testing-library/react';
import { Image } from './Image';

describe('Image Component Tests', () => {
  it('should render the image with src and alt attributes', () => {
    render(<Image src="test.jpg" alt="Test Image" />);
    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
  });

  it('should spread other props to the img element', () => {
    render(<Image src="test.jpg" alt="Test Image" data-testid="test-image" className="test-class" />);
    const image = screen.getByTestId('test-image');
    expect(image).toHaveClass('test-class');
    expect(image).toHaveAttribute('src', 'test.jpg');
    expect(image).toHaveAttribute('alt', 'Test Image');
  });

  it('should render with correct default attributes', () => {
    render(<Image src="test.jpg" alt="Test Image" />);
    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('src', 'test.jpg');
    expect(image).toHaveAttribute('alt', 'Test Image');
  });
});