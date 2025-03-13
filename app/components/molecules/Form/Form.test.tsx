import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form Component Tests', () => {
  it('should render the form with children', () => {
    render(
      <Form>
        <input type="text" data-testid="test-input" />
      </Form>
    );
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('should spread other props to the form element', () => {
    const handleSubmit = jest.fn();
    render(
      <Form data-testid="test-form" className="test-class" onSubmit={handleSubmit}>
        <input type="text" />
      </Form>
    );
    const form = screen.getByTestId('test-form');
    expect(form).toHaveClass('test-class');

    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should render with correct default attributes', () => {
    render(
      <Form data-testid="form-test">
        <input type="text" />
      </Form>
    );
    const form = screen.getByTestId('form-test');
    expect(form).toBeInTheDocument();
  });
});