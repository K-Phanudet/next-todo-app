import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { config } from '@/app/configurations/config';

interface Params {
  params: Promise<{
    id: string;
  }>;
}


export async function PATCH(request: Request, { params }: Params): Promise<NextResponse> {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          isSuccess: false,
          error: {
            message: 'Unauthorized, token missing',
            status: 401,
          },
        },
        { status: 401 }
      );
    }

    const data = await request.json()
    const response = await fetch(`${config.baseAPI}/todo/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error data", errorData);
      return NextResponse.json({ error: `Backend API error: ${errorData.statusCode} ${errorData.message}` }, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Failed to update todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }


}


export async function DELETE(
  request: Request,
  { params }: Params
): Promise<NextResponse> {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          isSuccess: false,
          error: {
            message: 'Unauthorized, token missing',
            status: 401,
          },
        },
        { status: 401 }
      );
    }

    const response = await fetch(`${config.baseAPI}/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error data", errorData);
      return NextResponse.json({ error: `Backend API error: ${errorData.statusCode} ${errorData.message}` }, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Failed to delete todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }


}