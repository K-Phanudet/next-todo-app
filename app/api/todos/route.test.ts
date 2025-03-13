import { GET, POST } from './route';
import { NextResponse } from 'next/server';
import { config } from '@/app/configurations/config';
import { cookies } from 'next/headers';


jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('Todo API Route Tests', () => {
  let mockRequest: Request;
  let mockJson: jest.Mock;
  let mockCookies: { get: jest.Mock };

  beforeEach(() => {
    global.fetch = jest.fn();
    mockJson = jest.fn();
    mockCookies = { get: jest.fn() };

    (cookies as jest.Mock).mockReturnValue(mockCookies);
    (NextResponse.json as jest.Mock).mockReturnValue({});

    mockJson.mockClear();
    (global.fetch as jest.Mock).mockClear();

    mockRequest = {
      json: jest.fn(),
    } as any;
  });

  describe('GET', () => {
    it('should handle successful GET request', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: [
            {
              id: '1',
              title: 'Todo 1',
              description: 'Description 1',
              created_by: { username: 'user1' },
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
          isSuccess: true,
        }),
      });

      await GET();

      expect(global.fetch).toHaveBeenCalledWith(`${config.baseAPI}/todo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-access-token',
        },
      });
      expect(NextResponse.json).toHaveBeenCalled();
    });

    it('should handle unauthorized request (no token)', async () => {
      mockCookies.get.mockReturnValue(undefined);

      await GET();

      expect(NextResponse.json).toHaveBeenCalledWith(
        {
          isSuccess: false,
          error: { message: 'Unauthorized, token missing', status: 401 },
        },
        { status: 401 }
      );
    });

    it('should handle external API error', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({ message: 'External API error' }),
      });

      await GET();

      expect(NextResponse.json).toHaveBeenCalledWith(
        {
          isSuccess: false,
          error: { message: 'External API error, failed to fetch data', status: 500 },
        },
        { status: 500 }
      );
    });

    it('should handle internal server error', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Internal server error'));

      await GET();

      expect(NextResponse.json).toHaveBeenCalledWith({ isSuccess: false }, { status: 500 });
    });
  });

  describe('POST', () => {
    it('should handle successful POST request', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (mockRequest.json as jest.Mock).mockResolvedValue({ title: 'New Todo', description: 'New Description' });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: {
            id: '2',
            title: 'New Todo',
            description: 'New Description',
            created_by: { username: 'user2' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          isSuccess: true,
        }),
      });

      await POST(mockRequest);

      expect(global.fetch).toHaveBeenCalledWith(`${config.baseAPI}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-access-token',
        },
        body: JSON.stringify({ title: 'New Todo', description: 'New Description' }),
      });
      expect(NextResponse.json).toHaveBeenCalled();
    });

    it('should handle unauthorized request (no token) for POST', async () => {
      mockCookies.get.mockReturnValue(undefined);

      await POST(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        {
          isSuccess: false,
          error: { message: 'Unauthorized, token missing', status: 401 },
        },
        { status: 401 }
      );
    });

    it('should handle external API error for POST', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (mockRequest.json as jest.Mock).mockResolvedValue({ title: 'New Todo', description: 'New Description' });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({ message: 'External API error' }),
      });

      await POST(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        {
          isSuccess: false,
          error: { message: 'External API error, failed to create todo', status: 500 },
        },
        { status: 500 }
      );
    });

    it('should handle internal server error for POST', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (mockRequest.json as jest.Mock).mockResolvedValue({ title: 'New Todo', description: 'New Description' });
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Internal server error'));

      await POST(mockRequest);

      expect(NextResponse.json).toHaveBeenCalledWith(
        {
          isSuccess: false,
          error: { message: 'External API error, failed to create todo' },
        },
        { status: 500 }
      );
    });
  });
});