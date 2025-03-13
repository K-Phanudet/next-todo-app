
export interface Todo {
    createdAt: Date,
    createdBy: string,
    description: string,
    id: string,
    title: string,
    updatedAt: Date
}

export interface TodoListResponse {
    isSuccess: boolean,
    data?: Todo[]
    error?: {
        message: string;
        status: number;
    }
}

export interface TodoUpdatePayload {
    description?: string,
    id: string,
    title?: string,
}

export interface CreateTodoPayload {
    description: string,
    title: string,
}

interface TodoCreateAPIResponse {
    isSuccess: boolean,
    data: Todo
    error?: {
        message?: string;
        status?: number;
    }
}

export async function fetchTodos(): Promise<TodoListResponse> {
    const res = await fetch('/api/todos', {
        method: 'GET'
    })
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch todo list');
    }
    return res.json()
}

export async function updateTodo(todo: TodoUpdatePayload): Promise<void> {
    await fetch(`/api/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
};

export async function createTodo(newTodo: CreateTodoPayload): Promise<Todo> {
    const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
    });
    const createdTodo: TodoCreateAPIResponse = await res.json()
    return createdTodo.data
};


export async function deleteTodo(id: string) {
    await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    });
};