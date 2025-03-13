import { login, getCookie, isAuthenticated, logout } from '../auth';
import Cookies from 'js-cookie';

jest.mock('js-cookie');


describe('Authentication Function Tests', () => {
  describe('login function', () => {
    const fetchSpy = jest.fn()

    beforeEach(()=>{
        global.fetch = fetchSpy
    })

    afterEach(()=>{
      fetchSpy.mockRestore();
      (Cookies.get as jest.Mock).mockClear();
    })


    describe('GIVEN valid credentials', () => {
      describe('WHEN login is successful', () => {
        it('THEN should return successful login response', async () => {
          fetchSpy.mockResolvedValueOnce({
            ok: true,
            json: ()=>({ isSuccess: true, username: 'testuser' })
          })

          const response = await login({ username: 'testuser', password: 'password123' });
          expect(response).toEqual({ isSuccess: true, username: 'testuser' });
        });
      });

      describe('WHEN login fails with', () => {
        it('THEN should throw an error with the correct message and status', async () => {
          fetchSpy.mockResolvedValueOnce({
            ok: false,
            json: ()=>({ isSuccess: true, message: 'login failed',error: 'AUTH_FAILED'}),
            status: 401 
          })

          await expect(login({ username: 'testuser', password: 'wrongpassword' })).rejects.toEqual({
            message: "An unexpected error occurred. Please try again.",
            status: 401,
          });
        });
      });
    });
  });

  describe('getCookie function', () => {
    describe('GIVEN a cookie exists', () => {
      describe('WHEN called', () => {
        it('THEN should return the cookie value', () => {
          (Cookies.get as jest.Mock).mockReturnValueOnce('test-value');
          expect(getCookie('test-cookie')).toBe('test-value');
        });
      });
    });

    describe('GIVEN a cookie does not exist', () => {
      describe('WHEN called', () => {
        it('THEN should return null', () => {
          (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);
          expect(getCookie('nonexistent-cookie')).toBeNull();
        });
      });
    });
  });


  describe('isAuthenticated function', () => {
    describe('GIVEN an accessToken cookie exists', () => {
      describe('WHEN called', () => {
        it('THEN should return true', () => {
          (Cookies.get as jest.Mock).mockReturnValueOnce('mock-access-token');
          expect(isAuthenticated()).toBe(true);
        });
      });
    });

    describe('GIVEN an accessToken cookie does not exist', () => {
      describe('WHEN called', () => {
        it('THEN should return false', () => {
          (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);
          expect(isAuthenticated()).toBe(false);
        });
      });
    });
  });

  describe('logout function', () => {
    const fetchSpy = jest.fn()

    beforeEach(()=>{
        global.fetch = fetchSpy
    })

    afterEach(()=>{
      fetchSpy.mockRestore();
    })

    describe('WHEN called', () => {
      it('THEN should make a POST request to logout', async () => {
        fetchSpy.mockResolvedValueOnce({
          status: 200,
          ok: true
        })
        await logout();
        expect(fetchSpy).toHaveBeenCalledWith('/api/auth/logout', { method: 'POST' });
      });
    });
  });
});