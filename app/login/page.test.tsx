import React from 'react';
import { render, screen, fireEvent, waitFor, queryByAttribute } from '@testing-library/react';
import LoginPage from './page';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';


jest.mock('../hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage Component Tests', () => {
  let mockLogin: jest.Mock;
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockLogin = jest.fn();
    mockRouterPush = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    mockLogin.mockClear();
    mockRouterPush.mockClear();
  });

  describe('GIVEN the login page is rendered', () => {
    describe('WHEN the user interacts with the page', () => {
      it('THEN should display the username and password input fields and the login button', () => {
        render(<LoginPage />);
        expect(screen.getByTestId('input-username')).toBeInTheDocument();
        expect(screen.getByTestId('input-password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      });
    });
  });

  describe('GIVEN the user enters valid credentials and clicks the login button', () => {
    describe('WHEN the login API call is successful', () => {
      it('THEN should call the login function with the credentials and redirect to the todos page', async () => {
        mockLogin.mockResolvedValue(undefined);

        render(<LoginPage />);
        const usernameInput = screen.getByTestId('input-username')
        const passwordInput = screen.getByTestId('input-password')
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => expect(mockLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' }));
        expect(mockRouterPush).toHaveBeenCalledWith('/todos');
      });
    });
  });

  describe('GIVEN the user enters invalid credentials and clicks the login button', () => {
    describe('WHEN the login API call fails with an error', () => {
      it('THEN should display the error message', async () => {
        mockLogin.mockRejectedValue(new Error('Invalid credentials'));

        render(<LoginPage />);
        const usernameInput = screen.getByTestId('input-username')
        const passwordInput = screen.getByTestId('input-password')
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        await waitFor(() => expect(screen.getByText('Invalid credentials')).toBeInTheDocument());
      });
    });
  });
});