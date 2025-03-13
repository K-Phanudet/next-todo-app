import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { AuthForm } from './AuthForm';

describe('AuthForm Component Tests', () => {
  const mockUsernameRef = React.createRef<HTMLInputElement>();
  const mockPasswordRef = React.createRef<HTMLInputElement>();

  it('should render the login', () => {
    render(<AuthForm isLogin onSubmit={() => {}} usernameRef={mockUsernameRef} passwordRef={mockPasswordRef} />);
    expect(screen.getByTestId('auth-form-title')).toBeInTheDocument();
    expect(screen.getByTestId('auth-form-primary-cta')).toBeInTheDocument();
    expect(within(screen.getByTestId('auth-form-primary-cta')).getByText('Login')).toBeInTheDocument();
    expect(screen.getByTestId('auth-form-custom-text-btn')).toBeInTheDocument();
    expect(within(screen.getByTestId('auth-form-custom-text-btn')).getByText('Register')).toBeInTheDocument();
  });

  it('should render the register form when isLogin is false', () => {
    render(<AuthForm isLogin={false} onSubmit={() => {}} usernameRef={mockUsernameRef} passwordRef={mockPasswordRef} />);
    expect(screen.getByTestId('auth-form-title')).toBeInTheDocument();
    expect(screen.getByTestId('auth-form-primary-cta')).toBeInTheDocument();
    expect(within(screen.getByTestId('auth-form-primary-cta')).getByText('Register')).toBeInTheDocument();
    expect(screen.getByTestId('auth-form-custom-text-btn')).toBeInTheDocument();
    expect(within(screen.getByTestId('auth-form-custom-text-btn')).getByText('Login')).toBeInTheDocument();
  });

  it('should call onSubmit when the form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<AuthForm onSubmit={handleSubmit} usernameRef={mockUsernameRef} passwordRef={mockPasswordRef} />);
    fireEvent.submit(screen.getByTestId('auth-form'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should display an error message when errorMessage is provided', () => {
    render(<AuthForm onSubmit={() => {}} usernameRef={mockUsernameRef} passwordRef={mockPasswordRef} errorMessage="Test Error" />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should render username and password input fields', () => {
    render(<AuthForm onSubmit={() => {}} usernameRef={mockUsernameRef} passwordRef={mockPasswordRef} />);
    expect(screen.getByTestId('input-username')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
  });

  it('should render the correct link based on isLogin prop', () => {
    render(<AuthForm isLogin={true} onSubmit={() => {}} usernameRef={mockUsernameRef} passwordRef={mockPasswordRef} />);
    expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();

    render(<AuthForm isLogin={false} onSubmit={() => {}} usernameRef={mockUsernameRef} passwordRef={mockPasswordRef} />);
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
  });

});