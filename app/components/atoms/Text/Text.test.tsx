import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text Component Tests', () => {
  it('should render the text with children', () => {
    render(<Text>This is some text</Text>);
    expect(screen.getByText('This is some text')).toBeInTheDocument();
  });

  it('should spread other props to the span element', () => {
    render(<Text data-testid="test-text" className="test-class">This is some text</Text>);
    const text = screen.getByTestId('test-text');
    expect(text).toHaveClass('test-class');
  });

  it('should render with correct default attributes', () => {
    render(<Text>This is some text</Text>);
    const text = screen.getByText('This is some text');
    expect(text).toBeInTheDocument();
  });
});