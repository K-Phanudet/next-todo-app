import { PATCH, DELETE } from './route';
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

describe('Todo API Route Tests (PATCH and DELETE)', () => {
  let mockRequest: Request;
  let mockJson: jest.Mock;
  let mockCookies: { get: jest.Mock };
  let mockParams: { params: Promise<{ id: string }> };

  beforeEach(() => {
    global.fetch = jest.fn();
    mockJson = jest.fn();
    mockCookies = { get: jest.fn() };
    mockParams = { params: Promise.resolve({ id: '1' }) }; 

    (cookies as jest.Mock).mockReturnValue(mockCookies);
    (NextResponse.json as jest.Mock).mockReturnValue({});

    mockJson.mockClear();
    (global.fetch as jest.Mock).mockClear();

    mockRequest = {
      json: jest.fn(),
    } as any;
  });

  describe('PATCH', () => {
    it('should handle successful PATCH request', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (mockRequest.json as jest.Mock).mockResolvedValue({ title: 'Updated Todo' });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'Todo updated' }),
      });

      await PATCH(mockRequest, mockParams);

      expect(global.fetch).toHaveBeenCalledWith(`${config.baseAPI}/todo/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-access-token',
        },
        body: JSON.stringify({ title: 'Updated Todo' }),
      });
      expect(NextResponse.json).toHaveBeenCalled();
    });

    it('should handle unauthorized request (no token) for PATCH', async () => {
      mockCookies.get.mockReturnValue(undefined);

      await PATCH(mockRequest, mockParams);

      expect(NextResponse.json).toHaveBeenCalledWith(
        {
          isSuccess: false,
          error: { message: 'Unauthorized, token missing', status: 401 },
        },
        { status: 401 }
      );
    });

    it('should handle external API error for PATCH', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (mockRequest.json as jest.Mock).mockResolvedValue({ title: 'Updated Todo' });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({
          statusCode: 500,
          message: 'External API error',
        }),
      });

      await PATCH(mockRequest, mockParams);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Backend API error: 500 External API error' },
        { status: 500 }
      );
    });

    it('should handle internal server error for PATCH', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (mockRequest.json as jest.Mock).mockRejectedValue(new Error('Internal server error'));

      await PATCH(mockRequest, mockParams);

      expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Failed to update todo' }, { status: 500 });
    });
  });

  describe('DELETE', () => {
    it('should handle successful DELETE request', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'Todo deleted' }),
      });

      await DELETE(mockRequest, mockParams);

      expect(global.fetch).toHaveBeenCalledWith(`${config.baseAPI}/todo/1`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-access-token',
        },
      });
      expect(NextResponse.json).toHaveBeenCalled();
    });

    it('should handle unauthorized request (no token) for DELETE', async () => {
      mockCookies.get.mockReturnValue(undefined);

      await DELETE(mockRequest, mockParams);

      expect(NextResponse.json).toHaveBeenCalledWith(
        {
          isSuccess: false,
          error: { message: 'Unauthorized, token missing', status: 401 },
        },
        { status: 401 }
      );
    });

    it('should handle external API error for DELETE', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({
          statusCode: 500,
          message: 'External API error',
        }),
      });

      await DELETE(mockRequest, mockParams);

      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: 'Backend API error: 500 External API error' },
        { status: 500 }
      );
    });

    it('should handle internal server error for DELETE', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-access-token' });
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Internal server error'));

      await DELETE(mockRequest, mockParams);

      expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Failed to delete todo' }, { status: 500 });
    });
  });
});