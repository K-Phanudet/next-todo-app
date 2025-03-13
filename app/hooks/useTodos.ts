import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { addTodo, updateTodo, deleteTodo, setTodos } from '../slices/todoSlice';
import { createTodo, updateTodo as updateTodoHandler, deleteTodo as deleteTodoHandler, fetchTodos} from '../lib/api/todo';

export const useTodos = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);

  useEffect(() => {
    const loadTodos = async () => {
      const { data = [] } = await fetchTodos();
      dispatch(setTodos(data));
    };
    loadTodos();
  }, [dispatch]);

  const handleAddTodo = async (todo: { title: string; description: string }) => {
    const newTodo = await createTodo(todo);
    dispatch(addTodo(newTodo));
  };

  const handleUpdateTodo = async (todo: { id: string; title?: string; description?: string }) => {
    await updateTodoHandler(todo);
    dispatch(updateTodo(todo));
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodoHandler(id);
    dispatch(deleteTodo(id));
  };

  return { todos, handleAddTodo, handleUpdateTodo, handleDeleteTodo };
};
