import { NextResponse } from 'next/server';
import { config } from '@/app/configurations/config';
interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
    isSuccess: boolean;
    username?: string;
    accessToken?: string;
}

export async function POST(request: Request): Promise<NextResponse<LoginResponse>> {
  try {
    const data: Credentials = await request.json();
    const response = await fetch(`${config.baseAPI}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status })
    }
    const { username, access_token } = await response.json();

    const nextResponse = NextResponse.json({
        accessToken: access_token,
        username,
        isSuccess: true
    });
    nextResponse.cookies.set('accessToken', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return nextResponse
   
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ isSuccess: false }, { status: 500 });
  }
}
