import { POST } from './route';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('Logout API Route Tests', () => {
  let mockJson: jest.Mock;
  let mockSetCookie: jest.Mock;
  let mockResponse: { cookies: { set: jest.Mock } };

  beforeEach(() => {
    mockJson = jest.fn();
    mockSetCookie = jest.fn();

    mockResponse = {
      cookies: {
        set: mockSetCookie,
      },
    };

    (NextResponse.json as jest.Mock).mockReturnValue(mockResponse);

    mockJson.mockClear();
    mockSetCookie.mockClear();
  });

  it('should return a JSON response with a success message', async () => {
    await POST();

    expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Logged out successfully' });
  });

  it('should set the accessToken cookie to expire', async () => {
    await POST();

    expect(mockSetCookie).toHaveBeenCalledWith('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });
  });
});