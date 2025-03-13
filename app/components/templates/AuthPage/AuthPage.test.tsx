import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthPage } from './AuthPage';

describe('AuthPage Component Tests', () => {
  const mockUsernameRef = React.createRef<HTMLInputElement>();
  const mockPasswordRef = React.createRef<HTMLInputElement>();
  const mockOnSubmit = jest.fn();

  it('should render the AuthForm component', () => {
    render(
      <AuthPage
        onSubmit={mockOnSubmit}
        usernameRef={mockUsernameRef}
        passwordRef={mockPasswordRef}
      />
    );
    expect(screen.getByTestId('auth-form')).toBeInTheDocument();
  });

  it('should pass props to AuthForm', () => {
    render(
      <AuthPage
        isLogin={false}
        onSubmit={mockOnSubmit}
        usernameRef={mockUsernameRef}
        passwordRef={mockPasswordRef}
        errorMessage="Test Error Message"
      />
    );
    expect(screen.getByTestId("auth-form-title")).toBeInTheDocument();
    expect(screen.getByText('Test Error Message')).toBeInTheDocument();
  });

});