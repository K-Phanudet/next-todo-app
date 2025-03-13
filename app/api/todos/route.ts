import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { config } from "@/app/configurations/config"

interface Todo {
  createdBy: string,
  description: string,
  id: string,
  title: string,
  updatedAt: Date
  createdAt: Date,
}

interface TodoListResponse {
  isSuccess: boolean,
  data?: Todo[]
  error?: {
    message?: string;
    status?: number;
  }
}

interface TodoDataResponse {
  description: string,
  id: string,
  title: string,
  created_by: {
    username: string
  },
  created_at: string,
  updated_at: string
}

interface TodoResponse {
  isSuccess: boolean,
  data: TodoDataResponse[]
}

interface TodoCreateResponse {
  isSuccess: boolean,
  data?: Todo
  error?: {
    message?: string;
    status?: number;
  }
}

export async function GET(): Promise<NextResponse<TodoListResponse>> {
  try {
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

    const response = await fetch(`${config.baseAPI}/todo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          error: {
            message: 'External API error, failed to fetch data',
            status: response.status,
          },
        },
        { status: response.status }
      );
    }
    const { data, isSuccess }: TodoResponse = await response.json()
    const parsedData = data.map((todo): Todo => {
      return {
        createdBy: todo.created_by?.username,
        description: todo.description,
        id: todo.id,
        title: todo.title,
        createdAt: new Date(todo.created_at),
        updatedAt: new Date(todo.updated_at)
      }
    })

    return NextResponse.json({ data: parsedData, isSuccess });
  } catch (error) {
    console.error('Failed to fetch:', error);
    return NextResponse.json({ isSuccess: false }, { status: 500 });
  }


}

export async function POST(request: Request): Promise<NextResponse<TodoCreateResponse>> {
  try {
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
    const response = await fetch(`${config.baseAPI}/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          error: {
            message: 'External API error, failed to create todo',
            status: response.status,
          },
        },
        { status: response.status }
      );
    }

    const { data: createdTodoData, isSuccess }: { data: TodoDataResponse, isSuccess: boolean } = await response.json()
    const createdTodo = {
      createdBy: createdTodoData.created_by?.username,
      description: createdTodoData.description,
      id: createdTodoData.id,
      title: createdTodoData.title,
      createdAt: new Date(createdTodoData.created_at),
      updatedAt: new Date(createdTodoData.updated_at)
    }
    return NextResponse.json({
      data: createdTodo,
      isSuccess
    });
  }
  catch (error) {
    console.error('Failed to create todo:', error);
    return NextResponse.json({
      isSuccess: false, error: {
        message: 'External API error, failed to create todo',
      },
    }, { status: 500 });
  }
}