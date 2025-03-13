import { POST } from './route';
import { NextResponse } from 'next/server';
import { config } from '@/app/configurations/config';

global.fetch = jest.fn();
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('User Registration API Route Tests', () => {
  let mockRequest: Request;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();

    (NextResponse.json as jest.Mock).mockReturnValue({});

    mockJson.mockClear();
    (global.fetch as jest.Mock).mockClear();

    mockRequest = {
      json: jest.fn(),
    } as any;
  });

  it('should handle successful registration', async () => {
    (mockRequest.json as jest.Mock).mockResolvedValue({ username: 'testuser', password: 'password123' });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
    });

    await POST(mockRequest);

    expect(global.fetch).toHaveBeenCalledWith(`${config.baseAPI}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'password123' }),
    });
    expect(NextResponse.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });

  it('should handle failed registration (backend API error)', async () => {
    (mockRequest.json as jest.Mock).mockResolvedValue({ username: 'existinguser', password: 'password123' });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ statusCode: 400, message: 'Username already exists' }),
    });

    await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Backend API error: 400 Username already exists' }, { status: 400 });
  });

  it('should handle proxy error (internal server error)', async () => {
    (mockRequest.json as jest.Mock).mockRejectedValue(new Error('Internal server error'));

    await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Proxy error' }, { status: 500 });
  });
});