import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string,
  description: string,
  title: string,
  updatedAt?: Date
  createdAt?: Date,
  createdBy?: string,
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

interface TodoUpdatePayload {
  id: string,
  title?: string,
  description?: string
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<TodoUpdatePayload>) => {
      const { title, description } = action.payload
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        if(title){
          state.todos[index].title = title
        }
        if(description){
          state.todos[index].description = description
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});


export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
