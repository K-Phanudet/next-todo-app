import { POST } from './route';
import { NextResponse } from 'next/server';
import { config } from '@/app/configurations/config';


jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('Login API Route Tests', () => {
  let mockRequest: Request;
  let mockJson: jest.Mock;
  let mockSetCookie: jest.Mock;
  let mockResponse: { cookies: { set: jest.Mock } };

  beforeEach(() => {
    mockJson = jest.fn();
    mockSetCookie = jest.fn();
    global.fetch = jest.fn();
    mockResponse = {
      cookies: {
        set: mockSetCookie,
      },
    };

    (NextResponse.json as jest.Mock).mockReturnValue(mockResponse);

    mockJson.mockClear();
    mockSetCookie.mockClear();
    (global.fetch as jest.Mock).mockClear();

    mockRequest = {
      json: jest.fn(),
    } as any;
  });

  it('should handle successful login', async () => {
    (mockRequest.json as jest.Mock).mockResolvedValue({ username: 'testuser', password: 'password123' });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ username: 'testuser', access_token: 'test-access-token' }),
    });

    await POST(mockRequest);

    expect(global.fetch).toHaveBeenCalledWith(`${config.baseAPI}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'password123' }),
    });
    expect(NextResponse.json).toHaveBeenCalledWith({
      accessToken: 'test-access-token',
      username: 'testuser',
      isSuccess: true,
    });
    expect(mockSetCookie).toHaveBeenCalledWith('accessToken', 'test-access-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  });

  it('should handle failed login', async () => {
    (mockRequest.json as jest.Mock).mockResolvedValue({ username: 'testuser', password: 'wrongpassword' });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({ message: 'Invalid credentials' }),
    });

    await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Invalid credentials' }, { status: 401 });
    expect(mockSetCookie).not.toHaveBeenCalled();
  });

  it('should handle internal server error', async () => {
    (mockRequest.json as jest.Mock).mockRejectedValue(new Error('Internal server error'));

    await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith({ isSuccess: false }, { status: 500 });
    expect(mockSetCookie).not.toHaveBeenCalled();
  });
});