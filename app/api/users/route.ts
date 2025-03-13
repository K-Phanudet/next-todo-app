import { NextResponse } from 'next/server';
import { config } from '@/app/configurations/config';
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data = await request.json()
    const response = await fetch(`${config.baseAPI}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error data", errorData);
      return NextResponse.json({ error: `Backend API error: ${errorData.statusCode} ${ errorData.message}` }, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}