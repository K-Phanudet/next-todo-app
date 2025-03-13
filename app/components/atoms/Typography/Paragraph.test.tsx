import React from 'react';
import { render, screen } from '@testing-library/react';
import { Paragraph } from './Paragraph';

describe('Paragraph Component Tests', () => {
  it('should render the paragraph with children', () => {
    render(<Paragraph>This is a paragraph.</Paragraph>);
    expect(screen.getByText('This is a paragraph.')).toBeInTheDocument();
  });

  it('should spread other props to the p element', () => {
    render(<Paragraph data-testid="test-paragraph" className="test-class">This is a paragraph.</Paragraph>);
    const paragraph = screen.getByTestId('test-paragraph');
    expect(paragraph).toHaveClass('test-class');
  });

  it('should render with correct default attributes', () => {
    render(<Paragraph>This is a paragraph.</Paragraph>);
    const paragraph = screen.getByText('This is a paragraph.');
    expect(paragraph).toBeInTheDocument();
  });
});