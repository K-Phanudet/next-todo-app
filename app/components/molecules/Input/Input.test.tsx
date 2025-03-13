import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component Tests', () => {
  it('should render an input element with default props', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render a textarea element when as="textarea"', () => {
    render(<Input as="textarea" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });

  it('should render a label when label prop is provided', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('text-label-input')).toBeInTheDocument();
  });

  it('should display an error message when errorMessage prop is provided', () => {
    render(<Input errorMessage="Test Error" />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });


  it('should spread other props to the input/textarea element', () => {
    const handleChange = jest.fn();
    render(<Input data-testid="test-input" onChange={handleChange} value="test value" />);
    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test value');
  });

  it('should not apply red border when no error', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).not.toHaveClass('border-red-500');
  });
});