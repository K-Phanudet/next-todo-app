import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from './page';
import { register } from '../lib/api/user';
import { useRouter } from 'next/navigation';


jest.mock('../lib/api/user');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('RegisterPage Component Tests', () => {
  let mockRegister: jest.Mock;
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRegister = jest.fn();
    mockRouterPush = jest.fn();

    (register as jest.Mock).mockImplementation(mockRegister);
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    mockRegister.mockClear();
    mockRouterPush.mockClear();
  });

  describe('GIVEN the register page is rendered', () => {
    describe('WHEN the user interacts with the page', () => {
      it('THEN should display the username and password input fields and the register button', () => {
        render(<RegisterPage />);
        expect(screen.getByTestId('input-username')).toBeInTheDocument();
        expect(screen.getByTestId('input-password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
      });
    });
  });

  describe('GIVEN the user enters valid credentials and clicks the register button', () => {
    describe('WHEN the registration API call is successful', () => {
      it('THEN should call the register function with the credentials and redirect to the login page', async () => {
        mockRegister.mockResolvedValue(undefined);

        render(<RegisterPage />);
        const usernameInput = screen.getByTestId('input-username');
        const passwordInput = screen.getByTestId('input-password');
        const registerButton = screen.getByRole('button', { name: 'Register' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(registerButton);

        await waitFor(() => expect(mockRegister).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' }));
        expect(mockRouterPush).toHaveBeenCalledWith('/login');
      });
    });
  });

  describe('GIVEN the user enters invalid credentials and clicks the register button', () => {
    describe('WHEN the registration API call fails with an error', () => {
      it('THEN should display the error message', async () => {
        mockRegister.mockRejectedValue(new Error('Username already exists'));

        render(<RegisterPage />);
        const usernameInput = screen.getByTestId('input-username');
        const passwordInput = screen.getByTestId('input-password');
        const registerButton = screen.getByRole('button', { name: 'Register' });

        fireEvent.change(usernameInput, { target: { value: 'existinguser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(registerButton);

        await waitFor(() => expect(screen.getByText('Username already exists')).toBeInTheDocument());
      });
    });
  });
});