import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { login, logout, getCookie } from '@/app/lib/api/auth';
import { useRouter } from 'next/navigation';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/app/lib/api/auth', () => ({
  login: jest.fn(),
  logout: jest.fn(),
  getCookie: jest.fn(),
}));

describe('useAuth Hook Tests', () => {
  let mockRouterPush: jest.Mock;
  let mockLogin: jest.Mock;
  let mockLogout: jest.Mock;
  let mockGetCookie: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    mockLogin = login as jest.Mock;
    mockLogout = logout as jest.Mock;
    mockGetCookie = getCookie as jest.Mock;

    mockLogin.mockClear();
    mockLogout.mockClear();
    mockGetCookie.mockClear();
  });


  it('should return login, logout, and accessToken properties', () => {
    mockGetCookie.mockReturnValue('test-access-token');

    const { result } = renderHook(() => useAuth());

    expect(result.current.login).toBeDefined();
    expect(result.current.logout).toBeDefined();
    expect(result.current.accessToken).toBe('test-access-token');
  });

  describe('handleLogin function', () => {
    it('should call the login API function with credentials', async () => {
      const credentials = { username: 'testuser', password: 'password123' };
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login(credentials);
      });

      expect(mockLogin).toHaveBeenCalledWith(credentials);
    });
  });

  describe('handleLogout function', () => {
    it('should call the logout API function and redirect to the home page', () => {
      const { result } = renderHook(() => useAuth());

      act(() => {
        result.current.logout();
      });

      expect(mockLogout).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });

  describe('accessToken property', () => {
    it('should return the value from getCookie', () => {
      mockGetCookie.mockReturnValue('test-access-token');

      const { result } = renderHook(() => useAuth());

      expect(result.current.accessToken).toBe('test-access-token');
      expect(mockGetCookie).toHaveBeenCalledWith('accessToken');
    });

    it('should return null if getCookie returns null', () => {
      mockGetCookie.mockReturnValue(null);

      const { result } = renderHook(() => useAuth());

      expect(result.current.accessToken).toBeNull();
    });
  });
});